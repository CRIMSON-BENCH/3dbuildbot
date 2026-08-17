import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    const { id } = await params;
    const o = await db.orders.findById(id);
    if (!o || (o.teamId !== u.teamId && !u.isAdmin)) return NextResponse.json({ ok: false }, { status: 404 });
    return NextResponse.json({ ok: true, order: o });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
