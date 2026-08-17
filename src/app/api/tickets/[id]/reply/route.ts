import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

const schema = z.object({ body: z.string().min(1), status: z.enum(["open", "waiting-customer", "resolved"]).optional() });

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const u = await requireUser();
    const { id } = await params;
    const t = await db.tickets.findById(id);
    if (!t) return NextResponse.json({ ok: false }, { status: 404 });
    if (t.teamId !== u.teamId && !u.isAdmin) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const b = schema.parse(await req.json());
    const updated = await db.tickets.reply(id, u.email, b.body, b.status);
    return NextResponse.json({ ok: true, ticket: updated });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
