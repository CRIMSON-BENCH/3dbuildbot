// Cron endpoint — nightly job to email drip on abandoned quotes.
// Trigger from a cron scheduler (Vercel Cron, GitHub Actions, or external).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail, templates } from "@/lib/email";
import { formatUSD } from "@/lib/quote-engine";

const CRON_TOKEN = process.env.CRON_TOKEN || "dev-cron";

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (token !== CRON_TOKEN) return NextResponse.json({ ok: false }, { status: 401 });

  const all = await db.all();
  const now = Date.now();
  const cutoff24 = now - 24 * 60 * 60 * 1000;
  const cutoff72 = now - 72 * 60 * 60 * 1000;

  const abandonedQuotes = all.quotes.filter((q) =>
    q.status === "pending" && q.createdAt < cutoff24 && q.createdAt > cutoff72 && q.expiresAt > now
  );

  let sent = 0;
  for (const q of abandonedQuotes) {
    const u = all.users.find((x) => x.id === q.ownerId);
    if (!u) continue;
    const t = templates.abandonedQuote(u.name.split(" ")[0], q.id, formatUSD(q.totalPriceCents));
    const res = await sendEmail({ to: u.email, subject: t.subject, html: t.html });
    if (res.ok) sent++;
  }
  return NextResponse.json({ ok: true, processed: abandonedQuotes.length, sent });
}
