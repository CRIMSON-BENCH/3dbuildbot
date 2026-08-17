import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request, { params }: { params: Promise<{ teamId: string }> }) {
  try {
    const u = await requireUser();
    if (!u.isAdmin) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const { teamId } = await params;
    const { decision } = await req.json();
    const t = await db.teams.findById(teamId);
    if (!t?.netTerms) return NextResponse.json({ ok: false }, { status: 404 });
    const updated = await db.teams.update(teamId, {
      netTerms: { ...t.netTerms, status: decision === "approve" ? "approved" : "rejected", approvedAt: Date.now() },
    });
    await db.audit.log({ teamId, actorId: u.id, action: `netterms.${decision}`, entity: "team", entityId: teamId });
    return NextResponse.json({ ok: true, team: updated });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
