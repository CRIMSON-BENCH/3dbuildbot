// Public REST API: create an order from an existing quote (that was previously created via /api/v1/quotes).
// For the demo the quote id passed can be a client-cached one; we compute a synthetic order & fire webhooks.
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import crypto from "crypto";
import { orderId } from "@/lib/ids";
import { checkRate } from "@/lib/rate-limit";
import { fireWebhooks } from "@/lib/webhooks";

async function auth(req: Request) {
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  if (!bearer) return null;
  const hash = crypto.createHash("sha256").update(bearer).digest("hex");
  return db.apiKeys.findByHash(hash);
}

const schema = z.object({
  quote_id: z.string(),
  po_number: z.string().optional(),
  ship_address: z.object({
    name: z.string(), line1: z.string(), line2: z.string().optional(),
    city: z.string(), state: z.string(), zip: z.string(), country: z.string(),
  }).optional(),
  cost_center: z.string().optional(),
  itar_flagged: z.boolean().optional(),
});

export async function POST(req: Request) {
  const key = await auth(req);
  if (!key) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const rate = checkRate(key.id, "business");
  if (!rate.ok) return NextResponse.json({ error: "rate_limited", retry_after: rate.retryAfterSec }, { status: 429 });
  try {
    const body = schema.parse(await req.json());
    const q = await db.quotes.findById(body.quote_id);
    if (!q || q.teamId !== key.teamId) return NextResponse.json({ error: "quote_not_found" }, { status: 404 });
    const id = orderId();
    const now = Date.now();
    const order = await db.orders.create({
      id,
      quoteId: q.id,
      ownerId: key.ownerId,
      teamId: key.teamId,
      status: "queued",
      totalPaidCents: q.totalPriceCents, // API orders are billed on account (assumes NET terms)
      currency: q.currency,
      poNumber: body.po_number,
      shipAddress: body.ship_address,
      itarFlagged: body.itar_flagged,
      timeline: [{ at: now, status: "quoted", note: "Created via public API" }, { at: now, status: "queued", note: "Routed to production" }],
      createdAt: now,
      updatedAt: now,
    });
    await db.quotes.update(q.id, { status: "ordered", poNumber: body.po_number });
    await db.audit.log({ teamId: key.teamId, actorId: key.ownerId, action: "order.create.api", entity: "order", entityId: id });
    await db.apiUsage.record({ keyId: key.id, teamId: key.teamId, endpoint: "POST /api/v1/orders/create", statusCode: 200 });
    await fireWebhooks(key.teamId, "order.created", { order_id: id, quote_id: q.id, total_cents: order.totalPaidCents, status: order.status });
    return NextResponse.json({
      id: order.id,
      quote_id: q.id,
      status: order.status,
      total_cents: order.totalPaidCents,
      currency: order.currency,
      created_at: order.createdAt,
      po_number: order.poNumber,
    });
  } catch (e) {
    return NextResponse.json({ error: "invalid_request", detail: (e as Error).message }, { status: 400 });
  }
}
