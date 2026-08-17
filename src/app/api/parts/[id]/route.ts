import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    const { id } = await params;
    const p = await db.parts.findById(id);
    if (!p || p.teamId !== u.teamId) return NextResponse.json({ ok: false }, { status: 404 });
    return NextResponse.json({ ok: true, part: p });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    const { id } = await params;
    const p = await db.parts.findById(id);
    if (!p || p.teamId !== u.teamId) return NextResponse.json({ ok: false }, { status: 404 });
    const patch = await req.json();
    const updated = await db.parts.update(id, patch);
    return NextResponse.json({ ok: true, part: updated });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    const { id } = await params;
    const p = await db.parts.findById(id);
    if (!p || p.teamId !== u.teamId) return NextResponse.json({ ok: false }, { status: 404 });
    await db.parts.delete(id);
    await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "part.delete", entity: "part", entityId: id });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
