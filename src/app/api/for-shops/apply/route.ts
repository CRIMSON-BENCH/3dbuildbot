import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ipFromRequest, checkIpRate } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = ipFromRequest(req);
  const rl = checkIpRate(ip, "compute");
  if (!rl.ok) return NextResponse.json({ ok: false, error: rl.reason }, { status: 429 });
  try {
    const body = await req.json();
    const summary = Object.entries(body).map(([k, v]) => `${k}: ${v}`).join(" · ");
    await db.audit.log({
      teamId: "public",
      actorId: `shop-applicant:${body.email ?? "anon"}`,
      action: "shop.apply",
      entity: "shop-application",
      detail: summary.slice(0, 900),
      ip,
    });
    // Forward via email when RESEND_API_KEY is set
    const { sendEmail } = await import("@/lib/email");
    await sendEmail({
      to: "partners@3dbuildbot.com",
      subject: `New partner-shop application — ${body.companyName ?? "unnamed"}`,
      html: `<pre style="font:12px/1.5 monospace">${summary.replace(/</g, "&lt;")}</pre>`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
