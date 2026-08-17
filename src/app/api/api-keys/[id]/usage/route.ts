import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    const { id } = await params;
    const keys = await db.apiKeys.listByTeam(u.teamId);
    if (!keys.some((k) => k.id === id)) return NextResponse.json({ ok: false }, { status: 404 });
    const stats = await db.apiUsage.statsByKey(id);
    return NextResponse.json({ ok: true, stats });
  } catch { return NextResponse.json({ ok: false }, { status: 401 }); }
}
