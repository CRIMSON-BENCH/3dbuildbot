// One-click reorder: clone a past order's quote as a new pending quote for
// the same team. Returns the new quote id so the client can redirect to
// checkout. Highest-margin traffic there is.
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { quoteId } from "@/lib/ids";
import { quote as computeQuote } from "@/lib/quote-engine";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const u = await requireUser();
    const order = await db.orders.findById(id);
    if (!order || order.teamId !== u.teamId) return NextResponse.json({ error: "not found" }, { status: 404 });
    const orig = await db.quotes.findById(order.quoteId);
    if (!orig) return NextResponse.json({ error: "quote not found" }, { status: 404 });
    const part = await db.parts.findById(orig.partId);
    if (!part) return NextResponse.json({ error: "part gone" }, { status: 410 });

    // Loyalty discount kicks in for repeat customers on reorder path too.
    const teamOrders = await db.orders.listByTeam(u.teamId);
    const paidCount = teamOrders.filter((o) => o.status !== "quoted" && o.status !== "cancelled").length;
    const loyaltyDiscountPct = paidCount >= 3 ? Math.min(15, 5 + (paidCount - 3) * 2) : 0;

    const priced = computeQuote({
      volumeCm3: part.volumeCm3,
      bboxMm: part.bboxMm,
      triangleCount: part.triangleCount,
      processSlug: orig.process,
      materialSlug: orig.material,
      quantity: orig.quantity,
      finish: orig.finish,
      expedite: orig.expedite,
      loyaltyDiscountPct,
    });

    const newQ = await db.quotes.create({
      id: quoteId(),
      ownerId: u.id,
      teamId: u.teamId,
      partId: orig.partId,
      process: orig.process,
      material: orig.material,
      finish: orig.finish,
      expedite: orig.expedite,
      quantity: orig.quantity,
      unitPriceCents: priced.unitPriceCents,
      totalPriceCents: priced.totalPriceCents,
      currency: "USD",
      leadTimeDays: priced.leadTimeDays,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
      status: "pending",
      createdAt: Date.now(),
      dfmSummary: orig.dfmSummary,
      dfmIssues: orig.dfmIssues,
      costDrivers: priced.costDrivers,
      parentQuoteId: orig.id,
    });
    return NextResponse.json({ ok: true, quoteId: newQ.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "reorder failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
