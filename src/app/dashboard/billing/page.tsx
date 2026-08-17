import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { PriceCard } from "@/components/Card";
import { formatUSD } from "@/lib/quote-engine";
import { isStripeConfigured } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function BillingPage() {
  const u = (await getCurrentUser())!;
  const orders = await db.orders.listByTeam(u.teamId);
  const totalSpend = orders.reduce((a, o) => a + o.totalPaidCents, 0);
  const stripeOk = isStripeConfigured();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Current plan · {u.plan}. Lifetime spend {formatUSD(totalSpend)}.</p>
      </div>
      {!stripeOk && (
        <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 text-sm text-amber-800 dark:text-amber-200">
          Stripe not yet configured. Orders run in demo mode (mock payment). Add <code className="px-1 py-0.5 rounded bg-white/60 dark:bg-slate-900/60 text-xs">STRIPE_SECRET_KEY</code> to <code>.env.local</code> to switch to real Stripe Checkout.
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <PriceCard tier="Free" price="$0" cadence="mo" features={["Unlimited quotes", "5 parts in vault", "Community support"]} cta="Current plan" href="#" />
        <PriceCard tier="Maker" price="$19" cadence="mo" features={["50 parts in vault", "AI DFM auto-reports", "Priority chat"]} cta="Upgrade" href="/api/stripe/portal" />
        <PriceCard highlight tier="Pro" price="$49" cadence="mo" features={["500 parts in vault", "Version diffs", "Locked-price 90 days", "Team seat included"]} cta="Upgrade" href="/api/stripe/portal" />
        <PriceCard tier="Business" price="$499" cadence="mo" features={["API access", "PunchOut light", "NET-30 terms", "SSO"]} cta="Contact sales" href="/contact" />
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h2 className="text-sm font-semibold mb-3">Invoice history</h2>
        {orders.length === 0 ? (
          <div className="text-xs text-slate-500">No invoices yet.</div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {orders.map((o) => (
              <li key={o.id} className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs">{o.id}</div>
                  <div className="text-xs text-slate-500">{new Date(o.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="text-sm tabular-nums font-semibold">{formatUSD(o.totalPaidCents)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
