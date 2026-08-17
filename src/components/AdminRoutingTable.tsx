"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface OrderRow { id: string; status: string; teamId: string; itarFlagged: boolean; routing: { to: string; partnerId?: string } | null; }
interface Partner { id: string; name: string; processes: string[]; itarEligible: boolean; }

export function AdminRoutingTable({ orders, partners }: { orders: OrderRow[]; partners: Partner[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function assign(orderId: string, to: "internal" | "partner", partnerId?: string) {
    setBusyId(orderId);
    await fetch(`/api/admin/orders/${orderId}/route-order`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ to, partnerId }) });
    setBusyId(null);
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
          <tr><th className="text-left px-4 py-2">Order</th><th className="text-left px-4 py-2">Team</th><th className="text-left px-4 py-2">Status</th><th className="text-left px-4 py-2">Route to</th><th></th></tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="px-4 py-3 font-mono text-xs">{o.id}{o.itarFlagged && <span className="ml-2 text-red-600 text-[10px]">ITAR</span>}</td>
              <td className="px-4 py-3 font-mono text-xs">{o.teamId.slice(-6)}</td>
              <td className="px-4 py-3 text-xs">{o.status}</td>
              <td className="px-4 py-3 text-xs">{o.routing ? `${o.routing.to}${o.routing.partnerId ? " · " + partners.find((p) => p.id === o.routing?.partnerId)?.name : ""}` : "—"}</td>
              <td className="px-4 py-3 text-right space-x-2">
                <button disabled={busyId === o.id} onClick={() => assign(o.id, "internal")} className="text-xs font-medium px-2 py-1 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 disabled:opacity-60">Internal</button>
                {partners.filter((p) => !o.itarFlagged || p.itarEligible).slice(0, 3).map((p) => (
                  <button key={p.id} disabled={busyId === o.id} onClick={() => assign(o.id, "partner", p.id)} className="text-xs font-medium px-2 py-1 rounded border border-slate-300 dark:border-slate-700 disabled:opacity-60">→ {p.name}</button>
                ))}
              </td>
            </tr>
          ))}
          {orders.length === 0 && <tr><td colSpan={5} className="py-6 text-center text-sm text-slate-500">No active orders.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
