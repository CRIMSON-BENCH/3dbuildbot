// Stripe integration — works in test mode when STRIPE_SECRET_KEY is set.
// Without keys, checkout falls back to a demo "order paid" simulation so the flow is complete end-to-end.

const KEY = process.env.STRIPE_SECRET_KEY;

let stripe: unknown = null;
async function getStripe() {
  if (!KEY) return null;
  if (!stripe) {
    const mod = (await import("stripe")).default;
    stripe = new mod(KEY, { apiVersion: "2025-01-27.acacia" as unknown as undefined });
  }
  return stripe as {
    checkout: { sessions: { create: (opts: unknown) => Promise<{ id: string; url: string | null }> } };
    webhooks: { constructEvent: (b: unknown, s: string | Buffer, sec: string) => unknown };
    billingPortal: { sessions: { create: (opts: unknown) => Promise<{ url: string }> } };
    customers: { create: (opts: unknown) => Promise<{ id: string }> };
  };
}

export interface CheckoutLine { name: string; description?: string; amountCents: number; quantity: number; }

export async function createCheckoutSession(input: {
  lines: CheckoutLine[];
  customerEmail: string;
  metadata: Record<string, string>;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ id: string; url: string; demo: boolean }> {
  const s = await getStripe();
  if (!s) {
    const id = `cs_demo_${Math.random().toString(36).slice(2, 12)}`;
    const url = `${input.successUrl}${input.successUrl.includes("?") ? "&" : "?"}session_id=${id}&demo=1`;
    return { id, url, demo: true };
  }
  const session = await s.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: input.customerEmail,
    line_items: input.lines.map((l) => ({
      price_data: { currency: "usd", product_data: { name: l.name, description: l.description }, unit_amount: l.amountCents },
      quantity: l.quantity,
    })),
    metadata: input.metadata,
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
  });
  return { id: session.id, url: session.url ?? input.cancelUrl, demo: false };
}

export async function createBillingPortalSession(customerId: string, returnUrl: string): Promise<string | null> {
  const s = await getStripe();
  if (!s) return null;
  const p = await s.billingPortal.sessions.create({ customer: customerId, return_url: returnUrl });
  return p.url;
}

export async function verifyWebhook(rawBody: string | Buffer, signature: string): Promise<unknown | null> {
  const s = await getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!s || !secret) return null;
  try {
    return s.webhooks.constructEvent(rawBody, signature, secret);
  } catch {
    return null;
  }
}

export const isStripeConfigured = () => !!KEY;
