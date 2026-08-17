import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { guard } from "@/lib/abuse-guard";
import { sendEmail } from "@/lib/email";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(1),
  topic: z.enum(["sales", "support", "enterprise", "press", "partnership", "other"]).optional(),
});

const INBOX_ROUTES: Record<string, string> = {
  sales: "sales@3dbuildbot.com",
  support: "support@3dbuildbot.com",
  enterprise: "enterprise@3dbuildbot.com",
  press: "press@3dbuildbot.com",
  partnership: "partners@3dbuildbot.com",
  other: "hello@3dbuildbot.com",
};

export async function POST(req: Request) {
  const blocked = guard(req, "spam");
  if (blocked) return blocked;
  try {
    const body = schema.parse(await req.json());
    const inbox = INBOX_ROUTES[body.topic ?? "other"] ?? INBOX_ROUTES.other;
    await db.audit.log({ teamId: "public", actorId: "anon", action: "contact.submit", entity: "contact", detail: `${body.email} · ${body.company ?? "—"} · ${body.topic ?? "other"}` });
    // Forward via Resend when RESEND_API_KEY set. Silent no-op otherwise (dev/preview).
    await sendEmail({
      to: inbox,
      subject: `[Contact] ${body.topic ?? "other"} — ${body.name}`,
      html: `<h2>New contact submission</h2>
        <p><b>From:</b> ${body.name} &lt;${body.email}&gt;</p>
        <p><b>Company:</b> ${body.company ?? "—"}</p>
        <p><b>Topic:</b> ${body.topic ?? "other"}</p>
        <hr />
        <p>${body.message.replace(/\n/g, "<br />")}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
