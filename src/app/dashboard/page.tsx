import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { StatCard, Badge } from "@/components/Card";
import { formatUSD } from "@/lib/quote-engine";

export const dynamic = "force-dynamic";

export default async function DashboardHome() {
  const u = (await getCurrentUser())!;
  const [orders, quotes, parts] = await Promise.all([
    db.orders.listByTeam(u.teamId),
    db.quotes.listByTeam(u.teamId),
    db.parts.listByTeam(u.teamId),
  ]);
  const totalSpend = orders.reduce((a, o) => a + o.totalPaidCents, 0);
  const active = orders.filter((o) => !["shipped", "delivered", "cancelled"].includes(o.status)).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Welcome back, {u.name.split(" ")[0]}.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard value={String(quotes.length)} label="Quotes saved" />
        <StatCard value={String(active)} label="Active orders" sublabel={`of ${orders.length} lifetime`} />
        <StatCard value={String(parts.length)} label="Parts in vault" />
        <StatCard value={formatUSD(totalSpend)} label="Lifetime spend" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Recent quotes" href="/dashboard/quotes">
          {quotes.length === 0 ? (
            <Empty text="No quotes yet." cta="Get instant quote" ctaHref="/quote" />
          ) : (
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {quotes.slice(0, 5).map((q) => (
                <li key={q.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-mono text-slate-900 dark:text-slate-100">{q.id}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{q.process.toUpperCase()} · {q.material} · qty {q.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold tabular-nums">{formatUSD(q.totalPriceCents)}</div>
                    <Badge tone={q.status === "ordered" ? "brand" : q.status === "expired" ? "slate" : "green"}>{q.status}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Active orders" href="/dashboard/orders">
          {active === 0 ? (
            <Empty text="No active orders." cta="Browse quotes" ctaHref="/dashboard/quotes" />
          ) : (
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {orders.filter((o) => !["shipped", "delivered", "cancelled"].includes(o.status)).slice(0, 5).map((o) => (
                <li key={o.id} className="py-3 flex items-center justify-between">
                  <div>
                    <Link href={`/dashboard/orders/${o.id}`} className="text-sm font-mono text-brand-600 dark:text-brand-400 hover:underline">{o.id}</Link>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Updated {new Date(o.updatedAt).toLocaleString()}</div>
                  </div>
                  <Badge tone="amber">{o.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>

      <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/60 dark:bg-brand-950/20 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-brand-900 dark:text-brand-100">Bring more parts online</div>
            <div className="text-xs text-brand-700 dark:text-brand-300 mt-0.5">Free tier includes unlimited quotes and a 5-part vault. Upgrade to Pro for 50 GB storage, auto-DFM reports, and priority chat.</div>
          </div>
          <Link href="/dashboard/billing" className="shrink-0 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Upgrade</Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
        <Link href={href} className="text-xs text-brand-600 dark:text-brand-400 hover:underline">View all →</Link>
      </div>
      {children}
    </div>
  );
}

function Empty({ text, cta, ctaHref }: { text: string; cta: string; ctaHref: string }) {
  return (
    <div className="py-6 text-center">
      <div className="text-sm text-slate-500 dark:text-slate-400">{text}</div>
      <Link href={ctaHref} className="inline-block mt-3 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium">{cta}</Link>
    </div>
  );
}
