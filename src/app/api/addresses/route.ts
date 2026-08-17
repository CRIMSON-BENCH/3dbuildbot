import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";

const schema = z.object({
  label: z.string(), name: z.string(), line1: z.string(), line2: z.string().optional(),
  city: z.string(), state: z.string(), zip: z.string(), country: z.string(), isDefault: z.boolean().optional(),
});

export async function GET() {
  try {
    const u = await requireUser();
    const t = await db.teams.findById(u.teamId);
    return NextResponse.json({ ok: true, addresses: t?.addresses ?? [] });
  } catch { return NextResponse.json({ ok: false }, { status: 401 }); }
}

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    const b = schema.parse(await req.json());
    const t = await db.teams.findById(u.teamId);
    const existing = t?.addresses ?? [];
    const cleaned = b.isDefault ? existing.map((a) => ({ ...a, isDefault: false })) : existing;
    const next = [...cleaned, { ...b, id: `addr_${nanoid(8)}` }];
    await db.teams.update(u.teamId, { addresses: next });
    return NextResponse.json({ ok: true, addresses: next });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const u = await requireUser();
  const { id } = await req.json();
  const t = await db.teams.findById(u.teamId);
  const next = (t?.addresses ?? []).filter((a) => a.id !== id);
  await db.teams.update(u.teamId, { addresses: next });
  return NextResponse.json({ ok: true });
}
