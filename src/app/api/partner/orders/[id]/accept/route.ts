import { NextResponse } from "next/server";
import { getPartner } from "@/lib/partner-auth";
import { db } from "@/lib/db";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const p = await getPartner();
  if (!p) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await params;
  const o = await db.orders.findById(id);
  if (!o || o.routing?.partnerId !== p.id) return NextResponse.json({ ok: false, error: "not_assigned" }, { status: 403 });
  await db.orders.update(id, { routing: { ...o.routing!, acceptedAt: Date.now() } });
  await db.orders.appendTimeline(id, "in-production", `Accepted by partner ${p.name}`, p.name);
  await db.audit.log({ teamId: o.teamId, actorId: `partner:${p.id}`, action: "partner.accept", entity: "order", entityId: id });
  return NextResponse.json({ ok: true });
}
