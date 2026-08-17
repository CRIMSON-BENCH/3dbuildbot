import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({ name: z.string().min(1), email: z.string().email(), title: z.string().optional() });

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = schema.parse(await req.json());
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const nda = await db.ndas.sign(id, { ...body, ip });
    if (!nda) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    await db.audit.log({ teamId: nda.teamId, actorId: `signer:${body.email}`, action: "nda.sign", entity: "nda", entityId: nda.id, detail: `${body.name} · ${body.email}` });
    return NextResponse.json({ ok: true, nda });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
