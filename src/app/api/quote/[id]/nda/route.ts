import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { newId } from "@/lib/ids";
import { ndaTemplate } from "@/lib/nda-text";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    const { id } = await params;
    const q = await db.quotes.findById(id);
    if (!q || q.teamId !== u.teamId) return NextResponse.json({ ok: false }, { status: 404 });
    const nda = await db.ndas.create({
      id: newId("nda"),
      quoteId: id,
      teamId: u.teamId,
      text: ndaTemplate(u.name, id),
      createdAt: Date.now(),
    });
    await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "nda.create", entity: "nda", entityId: nda.id });
    return NextResponse.json({ ok: true, nda, signUrl: `/nda/${nda.id}` });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
