import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { guard } from "@/lib/abuse-guard";

const schema = z.object({ code: z.string(), subtotalCents: z.number().int().min(0) });

export async function POST(req: Request) {
  // Promo-code brute-force guard: 3/min per IP, 15/hr.
  const blocked = guard(req, "spam");
  if (blocked) return blocked;
  try {
    const body = schema.parse(await req.json());
    const promo = await db.promos.findByCode(body.code);
    if (!promo) return NextResponse.json({ ok: false, error: "code_not_found" }, { status: 404 });
    if (promo.expiresAt && promo.expiresAt < Date.now()) return NextResponse.json({ ok: false, error: "expired" }, { status: 400 });
    if (promo.usesLimit && promo.usesCount >= promo.usesLimit) return NextResponse.json({ ok: false, error: "limit_reached" }, { status: 400 });
    if (promo.minSpendCents && body.subtotalCents < promo.minSpendCents) return NextResponse.json({ ok: false, error: `min_spend_${promo.minSpendCents}` }, { status: 400 });
    if (promo.firstOrderOnly) {
      const u = await getCurrentUser();
      if (u) {
        const orders = await db.orders.listByTeam(u.teamId);
        if (orders.length > 0) return NextResponse.json({ ok: false, error: "first_order_only" }, { status: 400 });
      }
    }
    const discountCents = promo.percentOff
      ? Math.round(body.subtotalCents * (promo.percentOff / 100))
      : (promo.amountOffCents ?? 0);
    return NextResponse.json({ ok: true, code: promo.code, discountCents, description: promo.percentOff ? `${promo.percentOff}% off` : `$${(promo.amountOffCents ?? 0) / 100} off` });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
