import { NextResponse } from "next/server";
import { z } from "zod";
import { getPartner } from "@/lib/partner-auth";
import { db } from "@/lib/db";
import { fireWebhooks } from "@/lib/webhooks";

const schema = z.object({ trackingCarrier: z.string(), trackingNumber: z.string(), photoUrls: z.array(z.string()).optional() });

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const p = await getPartner();
  if (!p) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await params;
  const o = await db.orders.findById(id);
  if (!o || o.routing?.partnerId !== p.id) return NextResponse.json({ ok: false, error: "not_assigned" }, { status: 403 });
  const b = schema.parse(await req.json());
  await db.orders.update(id, {
    trackingCarrier: b.trackingCarrier,
    trackingNumber: b.trackingNumber,
    routing: { ...o.routing!, qcPhotos: b.photoUrls ?? o.routing?.qcPhotos },
  });
  await db.orders.appendTimeline(id, "shipped", `Shipped by ${p.name} · ${b.trackingCarrier} ${b.trackingNumber}`, p.name);
  await db.audit.log({ teamId: o.teamId, actorId: `partner:${p.id}`, action: "partner.ship", entity: "order", entityId: id });
  await fireWebhooks(o.teamId, "order.shipped", { order_id: id, carrier: b.trackingCarrier, tracking: b.trackingNumber });
  return NextResponse.json({ ok: true });
}
