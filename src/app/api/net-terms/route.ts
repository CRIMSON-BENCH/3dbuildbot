import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({ limitCents: z.number().int().min(50000), days: z.union([z.literal(30), z.literal(60)]) });

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    if (u.role !== "owner" && u.role !== "admin") return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const body = schema.parse(await req.json());
    const t = await db.teams.update(u.teamId, {
      netTerms: { status: "pending", requestedAt: Date.now(), limitCents: body.limitCents, days: body.days },
    });
    await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "netterms.apply", entity: "team", entityId: u.teamId, detail: `NET-${body.days} · $${body.limitCents / 100}` });
    return NextResponse.json({ ok: true, team: t });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
