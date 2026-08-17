import { NextResponse } from "next/server";
import { verifyWebhook } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature") || "";
  const raw = await req.text();
  const event = await verifyWebhook(raw, signature);
  if (!event) return NextResponse.json({ ok: false }, { status: 400 });

  const ev = event as { type: string; data: { object: Record<string, unknown> } };
  const obj = ev.data.object;

  if (ev.type === "checkout.session.completed") {
    const meta = (obj.metadata as Record<string, string>) ?? {};
    const orderId = meta.orderId;
    const quoteId = meta.quoteId;
    if (orderId) {
      const paid = typeof obj.amount_total === "number" ? obj.amount_total : 0;
      const paymentIntentId = typeof obj.payment_intent === "string" ? obj.payment_intent : undefined;
      await db.orders.update(orderId, { totalPaidCents: paid, stripePaymentIntentId: paymentIntentId });
      await db.orders.appendTimeline(orderId, "paid", "Payment received", "stripe");
      await db.orders.appendTimeline(orderId, "queued", "Routed to production line", "system");
      if (quoteId) await db.quotes.update(quoteId, { status: "ordered" });
    }
  }
  return NextResponse.json({ ok: true });
}
