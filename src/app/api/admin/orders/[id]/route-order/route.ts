import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({ to: z.enum(["internal", "partner"]), partnerId: z.string().optional() });

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    if (!u.isAdmin) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const { id } = await params;
    const body = schema.parse(await req.json());
    const updated = await db.orders.update(id, {
      routing: { to: body.to, partnerId: body.partnerId, assignedAt: Date.now() },
    });
    await db.audit.log({ teamId: updated!.teamId, actorId: u.id, action: "order.route", entity: "order", entityId: id, detail: `→ ${body.to}${body.partnerId ? ":" + body.partnerId : ""}` });
    return NextResponse.json({ ok: true, order: updated });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
