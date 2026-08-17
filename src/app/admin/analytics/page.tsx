import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Container, StatCard } from "@/components/Card";
import { formatUSD } from "@/lib/quote-engine";

export const dynamic = "force-dynamic";

export default async function AdminAnalytics() {
  const u = await getCurrentUser();
  if (!u?.isAdmin) redirect("/dashboard");
  const all = await db.all();

  const now = Date.now();
  const d30 = now - 30 * 24 * 60 * 60 * 1000;
  const d7 = now - 7 * 24 * 60 * 60 * 1000;

  const users30 = all.users.filter((u) => u.createdAt >= d30);
  const quotes30 = all.quotes.filter((q) => q.createdAt >= d30);
  const orders30 = all.orders.filter((o) => o.createdAt >= d30);
  const revenue30 = orders30.reduce((a, o) => a + o.totalPaidCents, 0);

  const quotesToOrders = quotes30.length > 0 ? orders30.length / quotes30.length : 0;
  const usersToQuotes = users30.length > 0 ? new Set(quotes30.map((q) => q.ownerId)).size / users30.length : 0;

  // Process breakdown
  const byProc: Record<string, { count: number; cents: number }> = {};
  for (const o of all.orders) {
    const q = all.quotes.find((x) => x.id === o.quoteId);
    if (!q) continue;
    (byProc[q.process] ||= { count: 0, cents: 0 });
    byProc[q.process].count++;
    byProc[q.process].cents += o.totalPaidCents;
  }

  // Signups per day (last 30d)
  const days: Record<string, number> = {};
  for (const u of users30) {
    const k = new Date(u.createdAt).toISOString().slice(0, 10);
    days[k] = (days[k] || 0) + 1;
  }
  const dayEntries = Object.entries(days).sort();

  return (
    <Container className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400">Admin · Analytics</div>
          <h1 className="text-2xl font-semibold tracking-tight">Funnel &amp; revenue</h1>
        </div>
        <Link href="/admin" className="text-sm text-slate-500">← Admin home</Link>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        <StatCard value={String(users30.length)} label="Signups · last 30d" />
        <StatCard value={String(quotes30.length)} label="Quotes · last 30d" />
        <StatCard value={String(orders30.length)} label="Orders · last 30d" />
        <StatCard value={formatUSD(revenue30)} label="Revenue · last 30d" />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <StatCard value={`${Math.round(usersToQuotes * 100)}%`} label="Signup → quote conversion" sublabel={`${new Set(quotes30.map((q) => q.ownerId)).size} of ${users30.length}`} />
        <StatCard value={`${Math.round(quotesToOrders * 100)}%`} label="Quote → order conversion" sublabel={`${orders30.length} of ${quotes30.length}`} />
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h2 className="text-sm font-semibold mb-3">Revenue by process (all-time)</h2>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {Object.entries(byProc).sort((a, b) => b[1].cents - a[1].cents).map(([proc, s]) => (
              <tr key={proc}>
                <td className="py-2 font-mono uppercase text-xs">{proc}</td>
                <td className="py-2 text-right">{s.count} orders</td>
                <td className="py-2 text-right font-mono">{formatUSD(s.cents)}</td>
              </tr>
            ))}
            {Object.keys(byProc).length === 0 && <tr><td colSpan={3} className="py-6 text-center text-sm text-slate-500">No orders yet.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h2 className="text-sm font-semibold mb-3">Signups per day (last 30d)</h2>
        {dayEntries.length === 0 ? <div className="text-xs text-slate-500">No signups yet.</div> : (
          <div className="flex items-end gap-1 h-24">
            {dayEntries.map(([d, n]) => {
              const max = Math.max(...dayEntries.map(([, v]) => v));
              const pct = max > 0 ? (n / max) * 100 : 0;
              return <div key={d} title={`${d} · ${n}`} style={{ height: `${pct}%` }} className="flex-1 min-w-[6px] bg-brand-500 rounded-t" />;
            })}
          </div>
        )}
      </div>
    </Container>
  );
}
