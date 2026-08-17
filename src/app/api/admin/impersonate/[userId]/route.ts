import { NextResponse } from "next/server";
import { requireUser, setSessionCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(_req: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const admin = await requireUser();
    if (!admin.isAdmin) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const { userId } = await params;
    const target = await db.users.findById(userId);
    if (!target) return NextResponse.json({ ok: false }, { status: 404 });
    // Stash original admin id in a companion cookie so they can revert
    const jar = await cookies();
    jar.set("3dbb_impersonated_by", admin.id, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 });
    await setSessionCookie({ sub: target.id, email: target.email, teamId: target.teamId, isAdmin: false });
    await db.audit.log({ teamId: target.teamId, actorId: admin.id, action: "admin.impersonate.begin", entity: "user", entityId: target.id });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE() {
  const jar = await cookies();
  const originalId = jar.get("3dbb_impersonated_by")?.value;
  if (!originalId) return NextResponse.json({ ok: false, error: "not_impersonating" }, { status: 400 });
  const original = await db.users.findById(originalId);
  if (!original) return NextResponse.json({ ok: false }, { status: 404 });
  jar.delete("3dbb_impersonated_by");
  await setSessionCookie({ sub: original.id, email: original.email, teamId: original.teamId, isAdmin: original.isAdmin });
  await db.audit.log({ teamId: original.teamId, actorId: original.id, action: "admin.impersonate.end", entity: "user" });
  return NextResponse.json({ ok: true });
}
