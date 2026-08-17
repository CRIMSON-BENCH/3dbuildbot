import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/Card";
import { formatUSD } from "@/lib/quote-engine";
import { ClientOrderButton } from "@/components/ClientOrderButton";

export const dynamic = "force-dynamic";

export default async function QuotesPage() {
  const u = (await getCurrentUser())!;
  const quotes = await db.quotes.listByTeam(u.teamId);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Quotes</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">All quotes locked-price for 30 days.</p>
        </div>
        <Link href="/quote" className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">New quote</Link>
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        {quotes.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">No quotes yet — upload a CAD file to get one.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
              <tr>
                <th className="text-left px-4 py-3">Quote ID</th>
                <th className="text-left px-4 py-3">Process / Material</th>
                <th className="text-right px-4 py-3">Qty</th>
                <th className="text-right px-4 py-3">Unit</th>
                <th className="text-right px-4 py-3">Total</th>
                <th className="text-left px-4 py-3">Expires</th>
                <th className="text-left px-4 py-3">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/60">
                  <td className="px-4 py-3 font-mono text-xs text-slate-900 dark:text-slate-100">{q.id}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{q.process.toUpperCase()} · {q.material}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{q.quantity}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatUSD(q.unitPriceCents)}</td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold">{formatUSD(q.totalPriceCents)}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{new Date(q.expiresAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3"><Badge tone={q.status === "ordered" ? "brand" : q.status === "expired" ? "slate" : "green"}>{q.status}</Badge></td>
                  <td className="px-4 py-3">{q.status === "pending" && <ClientOrderButton quoteId={q.id} />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
