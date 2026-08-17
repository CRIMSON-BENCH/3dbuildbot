"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function RefundForm({ orders }: { orders: { id: string; totalPaidCents: number; teamId: string }[] }) {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [dollars, setDollars] = useState(0);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const selected = orders.find((o) => o.id === orderId);
  async function issue() {
    setBusy(true); setErr(null);
    const res = await fetch("/api/admin/refunds", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ orderId, cents: Math.round(dollars * 100), reason }) });
    const data = await res.json();
    setBusy(false);
    if (!data.ok) setErr(data.error);
    else { setDollars(0); setReason(""); router.refresh(); }
  }
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <h2 className="text-sm font-semibold mb-3">Issue refund</h2>
      <div className="grid sm:grid-cols-4 gap-3">
        <select value={orderId} onChange={(e) => setOrderId(e.target.value)} className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
          <option value="">Choose order…</option>
          {orders.map((o) => <option key={o.id} value={o.id}>{o.id} · ${(o.totalPaidCents / 100).toFixed(2)}</option>)}
        </select>
        <input type="number" step={0.01} min={0} placeholder="Amount USD" value={dollars} onChange={(e) => setDollars(Number(e.target.value))} className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-right font-mono" />
        <input placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm sm:col-span-1" />
        <button onClick={issue} disabled={busy || !orderId || dollars <= 0 || !reason} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium disabled:opacity-60">{busy ? "…" : "Issue refund"}</button>
      </div>
      {selected && <div className="mt-2 text-xs text-slate-500">Max refundable: ${(selected.totalPaidCents / 100).toFixed(2)}</div>}
      {err && <div className="mt-2 text-xs text-red-600">{err}</div>}
    </div>
  );
}
