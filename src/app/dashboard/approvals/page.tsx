import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatUSD } from "@/lib/quote-engine";
import { Badge } from "@/components/Card";
import { ApprovalButtons } from "@/components/ApprovalButtons";

export const dynamic = "force-dynamic";

export default async function ApprovalsPage() {
  const u = (await getCurrentUser())!;
  const canApprove = u.role === "owner" || u.role === "admin" || u.role === "approver";
  const team = await db.teams.findById(u.teamId);
  const threshold = team?.approvalThresholdCents ?? 0;
  const quotes = await db.quotes.listByTeam(u.teamId);
  const needing = quotes.filter((q) => q.status === "pending" && (threshold ? q.totalPriceCents >= threshold : false));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Quote approvals</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Threshold: {threshold ? formatUSD(threshold) : "None (no approval gating)"} · You are {canApprove ? "an approver" : "not an approver — read only"}.</p>
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        {needing.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500">No quotes need approval right now.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
              <tr><th className="text-left px-4 py-2">Quote</th><th className="text-left px-4 py-2">Process / Material</th><th className="text-right px-4 py-2">Total</th><th className="text-right px-4 py-2">Created</th><th></th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {needing.map((q) => (
                <tr key={q.id}>
                  <td className="px-4 py-3 font-mono text-xs">{q.id}</td>
                  <td className="px-4 py-3 text-sm">{q.process.toUpperCase()} · {q.material}</td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold">{formatUSD(q.totalPriceCents)}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 text-right">{new Date(q.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">{canApprove ? <ApprovalButtons quoteId={q.id} /> : <Badge tone="amber">awaiting</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-500">
        Adjust the approval threshold on <Link href="/dashboard/team" className="text-brand-600 underline">team settings</Link>.
      </div>
    </div>
  );
}
