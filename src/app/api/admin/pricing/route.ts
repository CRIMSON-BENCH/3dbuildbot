import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const list = await db.pricingOverrides.list();
  return NextResponse.json({ ok: true, overrides: list });
}

const schema = z.object({ key: z.string(), value: z.number() });

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    if (!u.isAdmin) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const b = schema.parse(await req.json());
    const o = await db.pricingOverrides.upsert({ key: b.key, value: b.value, updatedAt: Date.now(), updatedById: u.id });
    await db.audit.log({ teamId: "public", actorId: u.id, action: "pricing.override", entity: "pricing", entityId: b.key, detail: String(b.value) });
    return NextResponse.json({ ok: true, override: o });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const u = await requireUser();
    if (!u.isAdmin) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    const { key } = await req.json();
    await db.pricingOverrides.delete(key);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
