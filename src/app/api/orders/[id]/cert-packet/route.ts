// Sell a documentation packet as an add-on to any order. Simple Stripe
// checkout that adds a $79 line item; on payment, the existing compliance-
// pack endpoint generates the PDF and emails it.
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { createCheckoutSession } from "@/lib/stripe";

const schema = z.object({ level: z.enum(["basic", "aerospace", "medical"]).default("basic") });

const PACKET_PRICES = {
  basic: { cents: 7900, name: "Documentation packet (CoC + material cert)" },
  aerospace: { cents: 24900, name: "Aerospace packet (CoC + CMTR + FAI + CMM report)" },
  medical: { cents: 19900, name: "Medical device packet (CoC + biocompat + traceability)" },
};

const BASE = "https://www.3dbuildbot.com";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const u = await requireUser();
    const { level } = schema.parse(await req.json().catch(() => ({})));
    const order = await db.orders.findById(id);
    if (!order || order.teamId !== u.teamId) return NextResponse.json({ error: "not found" }, { status: 404 });
    const packet = PACKET_PRICES[level];

    const session = await createCheckoutSession({
      lines: [{
        name: packet.name,
        description: `For order ${order.id}`,
        amountCents: packet.cents,
        quantity: 1,
      }],
      customerEmail: u.email,
      metadata: { userId: u.id, teamId: u.teamId, orderId: order.id, addonType: `cert-packet-${level}` },
      successUrl: `${BASE}/dashboard/orders/${order.id}?packet=ok`,
      cancelUrl: `${BASE}/dashboard/orders/${order.id}`,
    });
    return NextResponse.json({ ok: true, url: session.url });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "cert packet failed" }, { status: 400 });
  }
}
