// Captures demand for processes we don't quote instantly (SLA, SLS, MJF,
// CNC, DMLS, sheet metal, etc.). Sends the entry to hello@ inbox via Resend
// and stores a compact record so patterns are visible in admin later.
import { NextResponse } from "next/server";
import { z } from "zod";
import { guard } from "@/lib/abuse-guard";
import { sendEmail } from "@/lib/email";

const schema = z.object({
  email: z.string().email(),
  process: z.string().min(1).max(50),
  material: z.string().min(1).max(100),
  quantity: z.number().int().min(1).max(100000),
  notes: z.string().max(1000).optional(),
});

export async function POST(req: Request) {
  const blocked = guard(req, "spam");
  if (blocked) return blocked;
  try {
    const body = schema.parse(await req.json());
    const html = `
      <div style="font-family:sans-serif;max-width:560px;">
        <h3>New hand-quote waitlist entry</h3>
        <ul>
          <li><strong>Email:</strong> ${body.email}</li>
          <li><strong>Process:</strong> ${body.process}</li>
          <li><strong>Material:</strong> ${body.material}</li>
          <li><strong>Quantity:</strong> ${body.quantity}</li>
        </ul>
        ${body.notes ? `<p><strong>Notes:</strong> ${body.notes}</p>` : ""}
      </div>
    `;
    await sendEmail({ to: "hello@3dbuildbot.com", subject: `Waitlist: ${body.process} × ${body.material}`, html });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "invalid";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
