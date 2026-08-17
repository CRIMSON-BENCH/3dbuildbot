// Partner uploads QC photos for an in-production order. Stored as base64 data URLs on the order.routing.qcPhotos array.
// A production system would push to Vercel Blob / S3; keeping it inline for demo self-containment.
import { NextResponse } from "next/server";
import { z } from "zod";
import { getPartner } from "@/lib/partner-auth";
import { db } from "@/lib/db";

const schema = z.object({ photoDataUrls: z.array(z.string()).min(1).max(6) });

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const p = await getPartner();
  if (!p) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await params;
  const o = await db.orders.findById(id);
  if (!o || o.routing?.partnerId !== p.id) return NextResponse.json({ ok: false, error: "not_assigned" }, { status: 403 });
  const b = schema.parse(await req.json());
  const merged = [...(o.routing?.qcPhotos ?? []), ...b.photoDataUrls].slice(-12); // cap 12
  await db.orders.update(id, { routing: { ...o.routing!, qcPhotos: merged } });
  await db.orders.appendTimeline(id, o.status, `Partner uploaded ${b.photoDataUrls.length} QC photo(s)`, p.name);
  return NextResponse.json({ ok: true, count: merged.length });
}
