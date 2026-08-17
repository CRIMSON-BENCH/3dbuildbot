import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { quoteId as newQuoteId } from "@/lib/ids";

// Create a new quote as a revision of an existing one.
// Body may override any of: process, material, finish, expedite, quantity.
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    const { id } = await params;
    const parent = await db.quotes.findById(id);
    if (!parent || parent.teamId !== u.teamId) return NextResponse.json({ ok: false }, { status: 404 });
    const patch = await req.json();
    // Re-compute price with overrides using the same engine
    const { quote: compute } = await import("@/lib/quote-engine");
    const part = parent.partId ? await db.parts.findById(parent.partId) : null;
    if (!part) return NextResponse.json({ ok: false, error: "no_part" }, { status: 400 });
    const priced = compute({
      volumeCm3: part.volumeCm3,
      bboxMm: part.bboxMm,
      triangleCount: part.triangleCount,
      processSlug: patch.process ?? parent.process,
      materialSlug: patch.material ?? parent.material,
      quantity: patch.quantity ?? parent.quantity,
      finish: patch.finish ?? parent.finish,
      expedite: patch.expedite ?? parent.expedite,
    });
    const rev = await db.quotes.create({
      ...parent,
      id: newQuoteId(),
      parentQuoteId: parent.id,
      process: patch.process ?? parent.process,
      material: patch.material ?? parent.material,
      finish: patch.finish ?? parent.finish,
      expedite: patch.expedite ?? parent.expedite,
      quantity: patch.quantity ?? parent.quantity,
      unitPriceCents: priced.unitPriceCents,
      totalPriceCents: priced.totalPriceCents,
      leadTimeDays: priced.leadTimeDays,
      costDrivers: priced.costDrivers,
      status: "pending",
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    });
    await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "quote.revise", entity: "quote", entityId: rev.id, detail: `parent=${parent.id}` });
    return NextResponse.json({ ok: true, quote: rev });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
