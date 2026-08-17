// Newsletter signup endpoint. Spam-throttled + stored in db.newsletter.
// Add RESEND_API_KEY + a Resend audience to forward to a real ESP later.
import { NextResponse } from "next/server";
import { z } from "zod";
import { guard } from "@/lib/abuse-guard";
import { db } from "@/lib/db";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const blocked = guard(req, "spam");
  if (blocked) return blocked;
  try {
    const body = schema.parse(await req.json());
    await db.audit.log({ teamId: "public", actorId: "anon", action: "newsletter.subscribe", entity: "newsletter", detail: body.email });
    // TODO: forward to Resend audience when RESEND_API_KEY + RESEND_NEWSLETTER_AUDIENCE_ID set
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
