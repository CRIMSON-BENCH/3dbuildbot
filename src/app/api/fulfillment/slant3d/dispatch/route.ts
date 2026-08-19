// Admin-triggerable endpoint to dispatch a paid FDM order to Slant 3D.
// Once wired to the Stripe webhook (or admin dashboard), this will run
// automatically for eligible orders.
//
// POST /api/fulfillment/slant3d/dispatch
//   { orderId, fileUrl }
//
// Requires: SLANT3D_API_KEY set. Admin auth (checked via getCurrentUser role).

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { slant3d, slant3dFilamentFor, isSlant3dEligibleProcess } from "@/lib/fulfillment/slant3d";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "admin only" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as { orderId?: string; fileUrl?: string };
  const { orderId, fileUrl } = body;
  if (!orderId || !fileUrl) {
    return NextResponse.json({ error: "orderId and fileUrl are required" }, { status: 400 });
  }

  const order = await db.orders.findById(orderId);
  if (!order) return NextResponse.json({ error: "order not found" }, { status: 404 });

  const quote = await db.quotes.findById(order.quoteId);
  if (!quote) return NextResponse.json({ error: "linked quote not found" }, { status: 404 });

  if (!isSlant3dEligibleProcess(quote.process)) {
    return NextResponse.json(
      { error: `Slant 3D only handles FDM; this order is ${quote.process}` },
      { status: 400 }
    );
  }

  const filament = slant3dFilamentFor(quote.material);
  if (!filament) {
    return NextResponse.json(
      { error: `Slant 3D doesn't support material ${quote.material}` },
      { status: 400 }
    );
  }

  if (!order.shipAddress) {
    return NextResponse.json({ error: "order has no shipping address" }, { status: 400 });
  }

  if (!slant3d.isEnabled()) {
    return NextResponse.json({ error: "SLANT3D_API_KEY not configured" }, { status: 500 });
  }

  try {
    const result = await slant3d.placeOrder({
      fileUrl,
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
      order.id,
      "in-production",
      `Dispatched to Slant 3D (${result.orderId})`,
      "system"
    );

    return NextResponse.json({ ok: true, slantOrderId: result.orderId, status: result.status });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
