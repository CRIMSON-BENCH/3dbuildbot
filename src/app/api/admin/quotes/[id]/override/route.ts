import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({ unitPriceCents: z.number().int().min(0), reason: z.string().optional(), leadTimeDays: z.string().optional() });

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    if (!u.isAdmin) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const { id } = await params;
    const body = schema.parse(await req.json());
    const q = await db.quotes.findById(id);
    if (!q) return NextResponse.json({ ok: false }, { status: 404 });
    const total = body.unitPriceCents * q.quantity;
    const updated = await db.quotes.update(id, { unitPriceCents: body.unitPriceCents, totalPriceCents: total, leadTimeDays: body.leadTimeDays ?? q.leadTimeDays });
    await db.audit.log({ teamId: q.teamId, actorId: u.id, action: "quote.override", entity: "quote", entityId: id, detail: `${body.unitPriceCents}¢ · ${body.reason ?? ""}` });
    return NextResponse.json({ ok: true, quote: updated });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
