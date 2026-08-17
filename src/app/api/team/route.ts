import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const u = await requireUser();
    const t = await db.teams.findById(u.teamId);
    return NextResponse.json({ ok: true, team: t });
  } catch { return NextResponse.json({ ok: false }, { status: 401 }); }
}

const schema = z.object({
  name: z.string().optional(),
  approvalThresholdCents: z.number().int().min(0).optional(),
  costCenters: z.array(z.string()).optional(),
  itarEnabled: z.boolean().optional(),
  billingEmail: z.string().email().optional(),
});

export async function PATCH(req: Request) {
  try {
    const u = await requireUser();
    if (u.role !== "owner" && u.role !== "admin") return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const body = schema.parse(await req.json());
    const t = await db.teams.update(u.teamId, body);
    await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "team.update", entity: "team", entityId: u.teamId });
    return NextResponse.json({ ok: true, team: t });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
