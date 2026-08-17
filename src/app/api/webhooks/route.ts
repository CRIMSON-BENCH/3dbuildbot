import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { newId } from "@/lib/ids";
import { nanoid } from "nanoid";

export async function GET() {
  try {
    const u = await requireUser();
    const hooks = await db.webhooks.listByTeam(u.teamId);
    return NextResponse.json({ ok: true, webhooks: hooks });
  } catch { return NextResponse.json({ ok: false }, { status: 401 }); }
}

const EVENTS = ["quote.created", "order.created", "order.status_changed", "order.shipped", "*"] as const;
const schema = z.object({ url: z.string().url(), events: z.array(z.enum(EVENTS)).min(1) });

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    const body = schema.parse(await req.json());
    const secret = `whsec_${nanoid(28)}`;
    const w = await db.webhooks.create({
      id: newId("wh"),
      teamId: u.teamId,
      url: body.url,
      events: body.events,
      secret,
      createdAt: Date.now(),
    });
    await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "webhook.create", entity: "webhook", entityId: w.id });
    return NextResponse.json({ ok: true, webhook: w, secret });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
