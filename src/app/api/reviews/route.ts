import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { newId } from "@/lib/ids";

export async function GET() {
  const reviews = await db.reviews.listPublished();
  return NextResponse.json({ ok: true, reviews });
}

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1),
  body: z.string().min(1),
  orderId: z.string().optional(),
  process: z.string().optional(),
  material: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    const body = schema.parse(await req.json());
    let verified = false;
    if (body.orderId) {
      const o = await db.orders.findById(body.orderId);
      if (o && o.teamId === u.teamId) verified = true;
    }
    const r = await db.reviews.create({
      id: newId("rev"),
      teamId: u.teamId,
      orderId: body.orderId,
      rating: body.rating as 1 | 2 | 3 | 4 | 5,
      title: body.title,
      body: body.body,
      authorName: u.name,
      authorRole: u.role,
      verifiedOrder: verified,
      process: body.process,
      material: body.material,
      createdAt: Date.now(),
      publishedAt: verified ? Date.now() : undefined, // auto-publish verified reviews
    });
    return NextResponse.json({ ok: true, review: r });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
