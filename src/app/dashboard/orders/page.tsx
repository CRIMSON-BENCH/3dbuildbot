import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/Card";
import { formatUSD } from "@/lib/quote-engine";
import { ReorderButton } from "@/components/ReorderButton";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const u = (await getCurrentUser())!;
  const orders = await db.orders.listByTeam(u.teamId);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <Link href="/quote" className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">New order</Link>
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        {orders.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">No orders yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
              <tr>
                <th className="text-left px-4 py-3">Order</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Paid</th>
                <th className="text-left px-4 py-3">Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/60">
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/orders/${o.id}`} className="font-mono text-xs text-brand-600 dark:text-brand-400 hover:underline">{o.id}</Link>
                    {o.itarFlagged && <span className="ml-2 text-[10px] font-mono uppercase text-red-600">ITAR</span>}
                  </td>
                  <td className="px-4 py-3"><Badge tone={o.status === "shipped" || o.status === "delivered" ? "brand" : o.status === "cancelled" ? "red" : "amber"}>{o.status}</Badge></td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatUSD(o.totalPaidCents)}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{new Date(o.updatedAt).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <ReorderButton orderId={o.id} />
                      <Link href={`/dashboard/orders/${o.id}`} className="text-xs text-brand-600 dark:text-brand-400">Details →</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
