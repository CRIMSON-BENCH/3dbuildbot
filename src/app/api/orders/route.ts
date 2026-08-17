import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { orderId } from "@/lib/ids";
import { createCheckoutSession } from "@/lib/stripe";

export async function GET() {
  try {
    const u = await requireUser();
    const orders = await db.orders.listByTeam(u.teamId);
    return NextResponse.json({ ok: true, orders });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}

const schema = z.object({
  quoteId: z.string(),
  poNumber: z.string().optional(),
  shipAddress: z.object({
    name: z.string(), line1: z.string(), line2: z.string().optional(),
    city: z.string(), state: z.string(), zip: z.string(), country: z.string(),
  }).optional(),
  itarFlagged: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    const body = schema.parse(await req.json());
    const q = await db.quotes.findById(body.quoteId);
    if (!q || q.teamId !== u.teamId) return NextResponse.json({ ok: false, error: "quote_not_found" }, { status: 404 });
    if (q.status === "ordered") return NextResponse.json({ ok: false, error: "already_ordered" }, { status: 400 });

    const now = Date.now();
    const id = orderId();
    const origin = new URL(req.url).origin;
    const checkout = await createCheckoutSession({
      lines: [{
        name: `${q.process.toUpperCase()} · ${q.material} · qty ${q.quantity}`,
        description: `Quote ${q.id} · Ships in ${q.leadTimeDays}`,
        amountCents: q.unitPriceCents,
        quantity: q.quantity,
      }],
      customerEmail: u.email,
      metadata: { orderId: id, quoteId: q.id, teamId: u.teamId, ownerId: u.id },
      successUrl: `${origin}/order/${id}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/dashboard/quotes`,
    });

    const order = await db.orders.create({
      id,
      quoteId: q.id,
      ownerId: u.id,
      teamId: u.teamId,
      status: "quoted",
      totalPaidCents: 0,
      currency: q.currency,
      poNumber: body.poNumber,
      stripeSessionId: checkout.id,
      shipAddress: body.shipAddress,
      itarFlagged: body.itarFlagged,
      timeline: [{ at: now, status: "quoted", note: "Order created, checkout session opened" }],
      createdAt: now,
      updatedAt: now,
    });

    // Demo mode: no real Stripe. Mark as paid and progress the order timeline.
    if (checkout.demo) {
      await db.orders.appendTimeline(id, "paid", "Demo checkout — mock payment received", "system");
      await db.orders.appendTimeline(id, "queued", "Routed to production line", "system");
      await db.orders.update(id, { totalPaidCents: q.totalPriceCents, stripePaymentIntentId: `pi_demo_${id}` });
      await db.quotes.update(q.id, { status: "ordered" });
    }

    await db.audit.log({ teamId: u.teamId, actorId: u.id, action: "order.create", entity: "order", entityId: id });
    const { fireWebhooks } = await import("@/lib/webhooks");
    await fireWebhooks(u.teamId, "order.created", { order_id: id, quote_id: q.id, total_cents: q.totalPriceCents });
    return NextResponse.json({ ok: true, order, checkoutUrl: checkout.url, demo: checkout.demo });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "order_failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
