// Newsletter signup endpoint. Spam-throttled + stored in db.newsletter.
// Add RESEND_API_KEY + a Resend audience to forward to a real ESP later.
import { NextResponse } from "next/server";
import { z } from "zod";
import { guard } from "@/lib/abuse-guard";
import { db } from "@/lib/db";
import { addToNewsletter } from "@/lib/email";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const blocked = guard(req, "spam");
  if (blocked) return blocked;
  try {
    const body = schema.parse(await req.json());
    await db.audit.log({ teamId: "public", actorId: "anon", action: "newsletter.subscribe", entity: "newsletter", detail: body.email });
    await addToNewsletter(body.email); // silently no-ops if RESEND not configured
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
