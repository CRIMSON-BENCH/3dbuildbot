import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Badge, StatCard } from "@/components/Card";
import { UsPersonsForm } from "@/components/UsPersonsForm";

export const dynamic = "force-dynamic";

export default async function ItarDashboard() {
  const u = (await getCurrentUser())!;
  const team = (await db.teams.findById(u.teamId))!;
  const orders = await db.orders.listByTeam(u.teamId);
  const itarOrders = orders.filter((o) => o.itarFlagged);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">ITAR workspace</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Segregated defense projects · US-persons verification · per-project audit log · watermarked previews.</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <StatCard value={team.itarEnabled ? "enabled" : "off"} label="Team ITAR mode" sublabel={team.itarEnabled ? "Enabled in team settings" : "Off · turn on in /dashboard/team"} />
        <StatCard value={u.usPersonsVerified ? "verified" : "required"} label="Your US-persons status" sublabel={u.usPersonsVerified && u.usPersonsVerifiedAt ? `Verified ${new Date(u.usPersonsVerifiedAt).toLocaleDateString()}` : "Attest below"} />
        <StatCard value={String(itarOrders.length)} label="ITAR-flagged orders" />
      </div>

      {!u.usPersonsVerified && (
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-5">
          <div className="text-sm font-semibold text-red-900 dark:text-red-200 mb-2">Complete US-persons attestation to unlock ITAR-flagged work</div>
          <p className="text-xs text-red-700 dark:text-red-300 mb-3">Per 22 CFR § 120.15, only US persons may access ITAR-controlled defense articles. Complete this attestation once; it applies to all future ITAR-flagged projects on your account.</p>
          <UsPersonsForm />
        </div>
      )}

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">ITAR-flagged orders</h2>
          <Link href="/quote" className="text-xs text-brand-600 dark:text-brand-400 hover:underline">Flag a new project ITAR at quote time →</Link>
        </div>
        {itarOrders.length === 0 ? (
          <div className="text-xs text-slate-500">No ITAR-flagged orders yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-xs font-mono uppercase tracking-widest text-slate-500">
              <tr><th className="text-left py-2">Order</th><th className="text-left py-2">Status</th><th className="text-right py-2">Updated</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {itarOrders.map((o) => (
                <tr key={o.id}>
                  <td className="py-3"><Link href={`/dashboard/orders/${o.id}`} className="font-mono text-xs text-brand-600 dark:text-brand-400">{o.id}</Link></td>
                  <td className="py-3"><Badge tone="red">{o.status}</Badge></td>
                  <td className="py-3 text-xs text-slate-500 text-right">{new Date(o.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h2 className="text-sm font-semibold mb-3">Per-project audit log export</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Export the full audit trail (accesses, quotes, orders, approvals, signatures) as CSV for your compliance archive.</p>
        <a href="/api/team/audit.csv" className="inline-block px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium">Download audit.csv</a>
      </div>
    </div>
  );
}
