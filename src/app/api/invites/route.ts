import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { newId } from "@/lib/ids";
import { nanoid } from "nanoid";

export async function GET() {
  try {
    const u = await requireUser();
    const invites = await db.invites.listByTeam(u.teamId);
    return NextResponse.json({ ok: true, invites });
  } catch { return NextResponse.json({ ok: false }, { status: 401 }); }
}

const schema = z.object({ email: z.string().email(), role: z.enum(["viewer", "quoter", "approver", "admin"]) });

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    const body = schema.parse(await req.json());
    if (u.role !== "owner" && u.role !== "admin") return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const token = `inv_${nanoid(24)}`;
    const invite = await db.invites.create({
      id: newId("inv"),
      teamId: u.teamId,
      email: body.email.toLowerCase(),
      role: body.role,
      invitedById: u.id,
      token,
      createdAt: Date.now(),
      expiresAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
    });
    await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "invite.create", entity: "invite", entityId: invite.id, detail: `→ ${body.email} · ${body.role}` });
    // TODO: send via Resend when RESEND_API_KEY set
    return NextResponse.json({ ok: true, invite, acceptUrl: `/invites/${token}` });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
