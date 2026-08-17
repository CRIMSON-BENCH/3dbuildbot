import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { newId } from "@/lib/ids";
import { fireWebhooks } from "@/lib/webhooks";

const schema = z.object({ orderId: z.string(), cents: z.number().int().min(1), reason: z.string() });

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    if (!u.isAdmin) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const b = schema.parse(await req.json());
    const o = await db.orders.findById(b.orderId);
    if (!o) return NextResponse.json({ ok: false }, { status: 404 });
    if (b.cents > o.totalPaidCents) return NextResponse.json({ ok: false, error: "refund_exceeds_paid" }, { status: 400 });
    const r = await db.refunds.create({
      id: newId("rfd"), orderId: b.orderId, teamId: o.teamId, cents: b.cents, reason: b.reason, issuedById: u.id, createdAt: Date.now(),
    });
    await db.orders.update(o.id, { totalPaidCents: o.totalPaidCents - b.cents });
    await db.orders.appendTimeline(o.id, o.status, `Refund $${(b.cents / 100).toFixed(2)} — ${b.reason}`, u.email);
    await db.audit.log({ teamId: o.teamId, actorId: u.id, action: "refund.issue", entity: "order", entityId: o.id, detail: `$${(b.cents / 100).toFixed(2)}` });
    await fireWebhooks(o.teamId, "order.status_changed", { order_id: o.id, refund_cents: b.cents, reason: b.reason });
    return NextResponse.json({ ok: true, refund: r });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
