import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { signup, login, getCurrentUser } from "@/lib/auth";

const schema = z.object({ name: z.string().min(1).optional(), password: z.string().min(8).optional() });

export async function POST(req: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await params;
    const inv = await db.invites.findByToken(token);
    if (!inv || inv.acceptedAt || inv.expiresAt < Date.now()) return NextResponse.json({ ok: false, error: "invalid_or_expired" }, { status: 400 });
    const body = schema.parse(await req.json().catch(() => ({})));

    // If already signed in with a matching email, add to team
    let user = await getCurrentUser();
    if (!user) {
      if (!body.name || !body.password) return NextResponse.json({ ok: false, error: "need_name_and_password" }, { status: 400 });
      const existing = await db.users.findByEmail(inv.email);
      if (existing) {
        user = await login(inv.email, body.password);
      } else {
        const s = await signup({ email: inv.email, password: body.password, name: body.name });
        user = s.user;
      }
    }
    if (user.email.toLowerCase() !== inv.email.toLowerCase()) {
      return NextResponse.json({ ok: false, error: "email_mismatch" }, { status: 400 });
    }

    // Move user to invited team + set role
    await db.users.update(user.id, { teamId: inv.teamId, role: inv.role });
    const team = await db.teams.findById(inv.teamId);
    if (team && !team.memberIds.includes(user.id)) {
      await db.teams.update(team.id, { memberIds: [...team.memberIds, user.id] });
    }
    await db.invites.accept(token);
    await db.audit.log({ teamId: inv.teamId, actorId: user.id, action: "invite.accept", entity: "invite", entityId: inv.id });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
