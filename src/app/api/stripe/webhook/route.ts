import { NextResponse } from "next/server";
import { verifyWebhook } from "@/lib/stripe";
import { db } from "@/lib/db";
import { slant3d, slant3dFilamentFor, isSlant3dEligibleProcess } from "@/lib/fulfillment/slant3d";

// Auto-dispatch a paid FDM order to Slant 3D if we have the file URL + address
// + API key. Any missing piece → logs a timeline note asking for manual
// dispatch and returns. Never throws — the webhook must always 200 for Stripe.
async function tryAutoDispatch(orderId: string) {
  try {
    const order = await db.orders.findById(orderId);
    if (!order) return;
    const quote = await db.quotes.findById(order.quoteId);
    if (!quote) return;

    if (!isSlant3dEligibleProcess(quote.process)) {
      await db.orders.appendTimeline(
        orderId,
        "queued",
        `${quote.process.toUpperCase()} order — needs manual fulfillment routing`,
        "system"
      );
      return;
    }

    const filament = slant3dFilamentFor(quote.material);
    if (!filament) {
      await db.orders.appendTimeline(
        orderId,
        "queued",
        `Material ${quote.material} not supported by Slant 3D — needs manual routing`,
        "system"
      );
      return;
    }

    const part = await db.parts.findById(quote.partId);
    if (!part?.fileUrl) {
      await db.orders.appendTimeline(
        orderId,
        "queued",
        "No CAD file URL on part — customer must re-upload or admin dispatches manually",
        "system"
      );
      return;
    }

    if (!order.shipAddress) {
      await db.orders.appendTimeline(orderId, "queued", "Missing shipping address — manual follow-up", "system");
      return;
    }

    if (!slant3d.isEnabled()) {
      await db.orders.appendTimeline(orderId, "queued", "SLANT3D_API_KEY not set — manual dispatch", "system");
      return;
    }

    const result = await slant3d.placeOrder({
      fileUrl: part.fileUrl,
      filament,
      quantity: quote.quantity,
      address: {
        name: order.shipAddress.name,
        addressLine1: order.shipAddress.line1,
        addressLine2: order.shipAddress.line2,
        city: order.shipAddress.city,
        state: order.shipAddress.state,
        zip: order.shipAddress.zip,
        country: order.shipAddress.country || "US",
      },
      orderNumber: order.id,
    });
    await db.orders.appendTimeline(
      orderId,
      "in-production",
      `Auto-dispatched to Slant 3D (${result.orderId})`,
      "system"
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    await db.orders.appendTimeline(orderId, "queued", `Auto-dispatch failed: ${msg}`, "system");
  }
}

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
      if (quoteId) await db.quotes.update(quoteId, { status: "ordered" });
      await tryAutoDispatch(orderId);
    }
  }
  return NextResponse.json({ ok: true });
}
