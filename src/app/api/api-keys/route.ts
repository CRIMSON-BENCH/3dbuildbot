import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiKeyPlain, newId } from "@/lib/ids";
import crypto from "crypto";

export async function GET() {
  try {
    const u = await requireUser();
    const keys = await db.apiKeys.listByTeam(u.teamId);
    return NextResponse.json({ ok: true, keys });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}

const schema = z.object({ name: z.string().min(1) });

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    const body = schema.parse(await req.json());
    const plain = apiKeyPlain();
    const hash = crypto.createHash("sha256").update(plain).digest("hex");
    const key = await db.apiKeys.create({
      id: newId("key"),
      ownerId: u.id,
      teamId: u.teamId,
      prefix: "sk_live_",
      last4: plain.slice(-4),
      hash,
      name: body.name,
      scopes: ["quotes:write", "orders:read"],
      createdAt: Date.now(),
    });
    await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "apikey.create", entity: "apikey", entityId: key.id });
    return NextResponse.json({ ok: true, key, plaintext: plain });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
