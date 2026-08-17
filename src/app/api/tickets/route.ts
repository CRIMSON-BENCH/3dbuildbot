import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { newId } from "@/lib/ids";

export async function GET() {
  try {
    const u = await requireUser();
    const list = u.isAdmin ? await db.tickets.list() : await db.tickets.listByTeam(u.teamId);
    return NextResponse.json({ ok: true, tickets: list });
  } catch { return NextResponse.json({ ok: false }, { status: 401 }); }
}

const schema = z.object({ subject: z.string().min(1), body: z.string().min(1), orderId: z.string().optional() });

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    const b = schema.parse(await req.json());
    const t = await db.tickets.create({
      id: newId("tkt"),
      teamId: u.teamId,
      subject: b.subject,
      status: "open",
      messages: [{ at: Date.now(), from: u.email, body: b.body }],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      orderId: b.orderId,
    });
    await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "ticket.create", entity: "ticket", entityId: t.id });
    return NextResponse.json({ ok: true, ticket: t });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
