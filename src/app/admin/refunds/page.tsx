import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Container } from "@/components/Card";
import { formatUSD } from "@/lib/quote-engine";
import { RefundForm } from "@/components/RefundForm";

export const dynamic = "force-dynamic";

export default async function AdminRefunds() {
  const u = await getCurrentUser();
  if (!u?.isAdmin) redirect("/dashboard");
  const refunds = await db.refunds.list();
  const orders = await db.orders.listAll();
  return (
    <Container className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400">Admin</div>
          <h1 className="text-2xl font-semibold tracking-tight">Refunds &amp; credits</h1>
        </div>
        <Link href="/admin" className="text-sm text-slate-500">← Admin home</Link>
      </div>
      <RefundForm orders={orders.map((o) => ({ id: o.id, totalPaidCents: o.totalPaidCents, teamId: o.teamId }))} />
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
            <tr><th className="text-left px-4 py-2">Order</th><th className="text-right px-4 py-2">Amount</th><th className="text-left px-4 py-2">Reason</th><th className="text-right px-4 py-2">Issued</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {refunds.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3 font-mono text-xs">{r.orderId}</td>
                <td className="px-4 py-3 text-right tabular-nums font-mono">{formatUSD(r.cents)}</td>
                <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{r.reason}</td>
                <td className="px-4 py-3 text-xs text-slate-500 text-right">{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {refunds.length === 0 && <tr><td colSpan={4} className="py-6 text-center text-sm text-slate-500">No refunds issued.</td></tr>}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
