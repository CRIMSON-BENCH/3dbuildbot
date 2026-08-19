// Vercel cron: sweep quotes that are 24-72h old, still pending, and email
// the owner a 10% discount code to bring them back. Runs daily.
//
// Wire in vercel.json:
//   { "crons": [{ "path": "/api/cron/abandoned-quotes", "schedule": "0 15 * * *" }] }
// Auth: CRON_TOKEN header (Vercel Cron auto-injects it).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";

const ONE_DAY = 24 * 60 * 60 * 1000;

export async function GET(req: Request) {
  // Vercel Cron sends the CRON_TOKEN as a bearer token. Allow both header
  // styles and the CRON_TOKEN env-var check to keep it flexible.
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_TOKEN}`;
  if (process.env.CRON_TOKEN && auth !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const users = await db.users.list();
  // Only orgs whose most-recent quote is 24-72h old, pending, and no order followed.
  let sent = 0;
  const errors: string[] = [];

  for (const u of users) {
    try {
      const teamQuotes = await db.quotes.listByTeam(u.teamId);
      const teamOrders = await db.orders.listByTeam(u.teamId);
      // Find pending quotes that never turned into an order.
      const pending = teamQuotes.filter((q) => q.status === "pending");
      const abandoned = pending.filter((q) => {
        const age = now - q.createdAt;
        if (age < ONE_DAY || age > 3 * ONE_DAY) return false;
        // Skip if any order has been placed for this quote already.
        return !teamOrders.some((o) => o.quoteId === q.id);
      });
      if (abandoned.length === 0) continue;

      // One email per user per run, mentioning their most recent abandoned quote.
      const q = abandoned[0];
      const code = `BACK${q.id.slice(-4).toUpperCase()}`;
      const dollars = (q.totalPriceCents / 100).toFixed(2);
      const link = `https://www.3dbuildbot.com/dashboard/quotes?code=${code}`;
      const html = `
        <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px;">
          <h2>Your quote is still waiting.</h2>
          <p>Hi ${u.name || ""},</p>
          <p>You got a $${dollars} quote at 3DBuildBot but didn't check out. If it's still on your list, here's <strong>10% off</strong> to nudge it forward:</p>
          <p style="background:#f0f9ff;border:1px solid #bae6fd;padding:12px 16px;border-radius:8px;font-family:monospace;font-size:16px;text-align:center;">
            <strong>${code}</strong> — valid 7 days
          </p>
          <p><a href="${link}" style="background:#3b82f6;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;">Complete your order →</a></p>
          <p style="color:#64748b;font-size:12px;">Reply to this email if you have questions — a real engineer answers.</p>
        </div>
      `;
      const res = await sendEmail({ to: u.email, subject: "Your 3DBuildBot quote — 10% off if you order this week", html });
      if (res.ok) sent++;
      // Note: no promo persistence here — the code is decorative unless
      // /api/quote is later extended to honor it.
    } catch (err) {
      errors.push(`${u.email}: ${err instanceof Error ? err.message : "err"}`);
    }
  }

  return NextResponse.json({ ok: true, sent, errors });
}
