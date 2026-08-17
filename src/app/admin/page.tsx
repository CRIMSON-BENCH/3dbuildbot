import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Container, StatCard, Badge } from "@/components/Card";
import { formatUSD } from "@/lib/quote-engine";
import { AdvanceOrderButton } from "@/components/AdvanceOrderButton";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const u = await getCurrentUser();
  if (!u) redirect("/login");
  if (!u.isAdmin) redirect("/dashboard");
  const orders = await db.orders.listAll();
  const users = await db.users.list();
  const totalRev = orders.reduce((a, o) => a + o.totalPaidCents, 0);
  const activeOrders = orders.filter((o) => !["shipped", "delivered", "cancelled"].includes(o.status));

  return (
    <Container className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400">Admin Console</div>
          <h1 className="text-2xl font-semibold tracking-tight">Operations overview</h1>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/pricing" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">Pricing rules</Link>
          <Link href="/dashboard" className="text-sm text-slate-500">Exit admin</Link>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard value={String(orders.length)} label="Orders lifetime" />
        <StatCard value={String(activeOrders.length)} label="Active orders" />
        <StatCard value={String(users.length)} label="Users" />
        <StatCard value={formatUSD(totalRev)} label="Revenue booked" />
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Active production queue</h2>
          <span className="text-xs text-slate-500">Click advance to progress each order</span>
        </div>
        {activeOrders.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500">No active orders.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
              <tr>
                <th className="text-left px-4 py-2">Order</th>
                <th className="text-left px-4 py-2">Team</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-right px-4 py-2">Value</th>
                <th className="text-left px-4 py-2">Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {activeOrders.map((o) => (
                <tr key={o.id}>
                  <td className="px-4 py-3 font-mono text-xs"><Link href={`/dashboard/orders/${o.id}`} className="text-brand-600 dark:text-brand-400">{o.id}</Link>{o.itarFlagged && <span className="ml-2 text-[10px] font-mono text-red-600">ITAR</span>}</td>
                  <td className="px-4 py-3 font-mono text-xs">{o.teamId.slice(-6)}</td>
                  <td className="px-4 py-3"><Badge tone={o.status === "shipped" ? "brand" : "amber"}>{o.status}</Badge></td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatUSD(o.totalPaidCents)}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{new Date(o.updatedAt).toLocaleString()}</td>
                  <td className="px-4 py-3"><AdvanceOrderButton orderId={o.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
}
