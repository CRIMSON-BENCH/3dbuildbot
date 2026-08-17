import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { guard } from "@/lib/abuse-guard";

const schema = z.object({ name: z.string(), email: z.string().email(), company: z.string().optional(), message: z.string().min(1) });

export async function POST(req: Request) {
  const blocked = guard(req, "spam");
  if (blocked) return blocked;
  try {
    const body = schema.parse(await req.json());
    await db.audit.log({ teamId: "public", actorId: "anon", action: "contact.submit", entity: "contact", detail: `${body.email} · ${body.company ?? "—"}` });
    // TODO: forward via Resend when RESEND_API_KEY is set.
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
