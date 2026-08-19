// Kicks off a Stripe subscription checkout for the Teams tier.
// Env vars: STRIPE_PRICE_TEAMS_MONTHLY, STRIPE_PRICE_TEAMS_ANNUAL.
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { createSubscriptionCheckout } from "@/lib/stripe";

const schema = z.object({ plan: z.enum(["teams-monthly", "teams-annual"]) });
const BASE = "https://www.3dbuildbot.com";

export async function POST(req: Request) {
  try {
    const u = await requireUser();
    const { plan } = schema.parse(await req.json());
    const priceId = plan === "teams-monthly"
      ? process.env.STRIPE_PRICE_TEAMS_MONTHLY
      : process.env.STRIPE_PRICE_TEAMS_ANNUAL;
    if (!priceId) {
      return NextResponse.json({ error: `Set STRIPE_PRICE_${plan.toUpperCase().replace("-", "_")} in Vercel env` }, { status: 500 });
    }
    const { url } = await createSubscriptionCheckout({
      priceId,
      customerEmail: u.email,
      metadata: { userId: u.id, teamId: u.teamId, plan },
      successUrl: `${BASE}/dashboard/billing?ok=1`,
      cancelUrl: `${BASE}/pricing`,
    });
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "checkout failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
