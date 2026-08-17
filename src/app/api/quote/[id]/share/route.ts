import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    const { id } = await params;
    const q = await db.quotes.findById(id);
    if (!q || q.teamId !== u.teamId) return NextResponse.json({ ok: false }, { status: 404 });
    const token = q.shareToken || `shr_${nanoid(16)}`;
    await db.quotes.update(id, { shareToken: token });
    return NextResponse.json({ ok: true, token });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
