// Admin-only: manually advance an order to the next status. Used from the admin console for the demo.
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db, type OrderStatus } from "@/lib/db";

const STATUSES: OrderStatus[] = ["quoted", "paid", "queued", "in-production", "post-processing", "qc", "shipped", "delivered"];

const schema = z.object({ status: z.enum(STATUSES as [OrderStatus, ...OrderStatus[]]).optional(), note: z.string().optional() });

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    if (!u.isAdmin) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const { id } = await params;
    const body = schema.parse(await req.json().catch(() => ({})));
    const o = await db.orders.findById(id);
    if (!o) return NextResponse.json({ ok: false }, { status: 404 });
    const idx = STATUSES.indexOf(o.status);
    const next = body.status ?? STATUSES[Math.min(idx + 1, STATUSES.length - 1)];
    const updated = await db.orders.appendTimeline(id, next, body.note ?? `Advanced by ${u.email}`, u.email);
    await db.audit.log({ teamId: o.teamId, actorId: u.id, action: "order.advance", entity: "order", entityId: id, detail: `→ ${next}` });
    return NextResponse.json({ ok: true, order: updated });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
