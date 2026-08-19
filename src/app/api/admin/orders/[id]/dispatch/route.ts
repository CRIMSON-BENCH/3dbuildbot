// Admin one-click retry for auto-dispatch. Re-runs the same check the Stripe
// webhook does: FDM + supported material + fileUrl + shipAddress + API key.
// Useful when the payment webhook's initial dispatch failed and admin has
// since fixed the missing piece.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { slant3d, slant3dFilamentFor, isSlant3dEligibleProcess } from "@/lib/fulfillment/slant3d";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return NextResponse.json({ error: "admin only" }, { status: 403 });
  const { id } = await params;

  const order = await db.orders.findById(id);
  if (!order) return NextResponse.json({ error: "not found" }, { status: 404 });
  const quote = await db.quotes.findById(order.quoteId);
  if (!quote) return NextResponse.json({ error: "quote not found" }, { status: 404 });

  if (!isSlant3dEligibleProcess(quote.process)) return NextResponse.json({ error: `${quote.process} not on Slant` }, { status: 400 });
  const filament = slant3dFilamentFor(quote.material);
  if (!filament) return NextResponse.json({ error: `material ${quote.material} not supported` }, { status: 400 });

  const part = await db.parts.findById(quote.partId);
  if (!part?.fileUrl) return NextResponse.json({ error: "part has no fileUrl — customer needs to upload" }, { status: 400 });
  if (!order.shipAddress) return NextResponse.json({ error: "no shipping address" }, { status: 400 });
  if (!slant3d.isEnabled()) return NextResponse.json({ error: "SLANT3D_API_KEY not set" }, { status: 500 });

  try {
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
    await db.orders.update(order.id, { slantOrderId: result.orderId, slantStatus: result.status });
    await db.orders.appendTimeline(order.id, "in-production", `Admin re-dispatched to Slant 3D (${result.orderId})`, user.email);
    return NextResponse.json({ ok: true, slantOrderId: result.orderId });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "dispatch failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
