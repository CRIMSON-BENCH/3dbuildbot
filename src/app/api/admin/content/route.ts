import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const list = await db.content.list();
  return NextResponse.json({ ok: true, docs: list });
}

const schema = z.object({
  slug: z.string().min(1),
  kind: z.enum(["guide", "case-study", "blog"]),
  title: z.string().min(1),
  description: z.string(),
  body: z.string(),
  published: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    if (!u.isAdmin) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const b = schema.parse(await req.json());
    const doc = await db.content.upsert({ ...b, updatedAt: Date.now(), updatedById: u.id });
    await db.audit.log({ teamId: "public", actorId: u.id, action: "content.upsert", entity: "content", entityId: b.slug });
    return NextResponse.json({ ok: true, doc });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
