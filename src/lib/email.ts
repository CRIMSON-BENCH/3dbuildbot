// Resend email wrapper with local-logging fallback.
const KEY = process.env.RESEND_API_KEY;

export async function sendEmail(input: { to: string; subject: string; html: string; from?: string }): Promise<{ ok: boolean; id?: string; simulated?: boolean }> {
  if (!KEY) {
    console.log("[email:simulated]", { to: input.to, subject: input.subject });
    return { ok: true, simulated: true };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${KEY}` },
      body: JSON.stringify({
        from: input.from || "3DBuildBot <hello@3dbuildbot.com>",
        to: [input.to],
        subject: input.subject,
        html: input.html,
      }),
    });
    const data = await res.json();
    return { ok: res.ok, id: data.id };
  } catch (e) {
    console.warn("[email:error]", (e as Error).message);
    return { ok: false };
  }
}

const disclaimer = `<p style="font-size:11px;color:#64748b;margin-top:24px;border-top:1px solid #e2e8f0;padding-top:12px">3DBuildBot Industries. This email was sent because you have an active account or quote. Reply to unsubscribe or manage preferences at https://www.3dbuildbot.com/dashboard/settings.</p>`;

export const templates = {
  abandonedQuote(name: string, quoteId: string, total: string) {
    return {
      subject: `Your locked-price quote ${quoteId} is still waiting`,
      html: `<div style="font:14px/1.5 -apple-system,Segoe UI,sans-serif;color:#0f172a;max-width:520px;margin:auto;padding:24px">
        <h2 style="margin:0 0 12px">Hi ${name},</h2>
        <p>Your quote <strong>${quoteId}</strong> for <strong>${total}</strong> is locked-price for 30 days. Ready to place the order?</p>
        <p><a href="https://www.3dbuildbot.com/dashboard/quotes" style="background:#2563eb;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;display:inline-block">Order now →</a></p>
        <p style="color:#475569">Questions? Just reply — a manufacturing engineer will answer within 4 business hours.</p>
        ${disclaimer}
      </div>`,
    };
  },
  orderShipped(name: string, orderId: string, tracking?: string) {
    return {
      subject: `Order ${orderId} shipped`,
      html: `<div style="font:14px/1.5 -apple-system,Segoe UI,sans-serif;color:#0f172a;max-width:520px;margin:auto;padding:24px">
        <h2>Your order shipped</h2>
        <p>Hi ${name}, order <strong>${orderId}</strong> is on its way.</p>
        ${tracking ? `<p>Tracking: <strong>${tracking}</strong></p>` : ""}
        <p><a href="https://www.3dbuildbot.com/dashboard/orders/${orderId}" style="background:#2563eb;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;display:inline-block">Track order →</a></p>
        ${disclaimer}
      </div>`,
    };
  },
  referralEarned(name: string, credit: string) {
    return {
      subject: `You earned ${credit} in credit`,
      html: `<div style="font:14px/1.5 -apple-system,Segoe UI,sans-serif;color:#0f172a;max-width:520px;margin:auto;padding:24px">
        <h2>Nice work, ${name}</h2>
        <p>A referral of yours placed their first order. You've earned <strong>${credit}</strong> in credit, applied automatically to your next quote.</p>
        <p><a href="https://www.3dbuildbot.com/dashboard/referrals" style="background:#2563eb;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;display:inline-block">See referral status →</a></p>
        ${disclaimer}
      </div>`,
    };
  },
};

export const isEmailConfigured = () => !!KEY;
