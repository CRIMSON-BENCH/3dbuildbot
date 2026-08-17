import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    const { id } = await params;
    if (u.role !== "owner" && u.role !== "admin" && u.role !== "approver") return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const q = await db.quotes.findById(id);
    if (!q || q.teamId !== u.teamId) return NextResponse.json({ ok: false }, { status: 404 });
    const updated = await db.quotes.update(id, { status: "approved", approvedBy: u.id, approvedAt: Date.now() });
    await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "quote.approve", entity: "quote", entityId: id });
    return NextResponse.json({ ok: true, quote: updated });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
