"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "./Card";

export function PartnerJobRow({ orderId, status, totalCents, itar, mode }: { orderId: string; status: string; totalCents: number; itar: boolean; mode: "assigned" | "active" }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [carrier, setCarrier] = useState("UPS");
  const [tracking, setTracking] = useState("");
  const [showShip, setShowShip] = useState(false);

  async function accept() {
    setBusy(true);
    await fetch(`/api/partner/orders/${orderId}/accept`, { method: "POST" });
    setBusy(false); router.refresh();
  }
  async function ship() {
    setBusy(true);
    await fetch(`/api/partner/orders/${orderId}/ship`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ trackingCarrier: carrier, trackingNumber: tracking }) });
    setBusy(false); setShowShip(false); router.refresh();
  }

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="font-mono">{orderId}</span>
          {itar && <Badge tone="red">ITAR</Badge>}
          <Badge tone={status === "shipped" ? "brand" : "amber"}>{status}</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="tabular-nums font-mono">${(totalCents / 100).toFixed(2)}</div>
          {mode === "assigned" && <button disabled={busy} onClick={accept} className="text-xs font-medium px-3 py-1.5 rounded bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white">{busy ? "…" : "Accept"}</button>}
          {mode === "active" && <button onClick={() => setShowShip((s) => !s)} className="text-xs font-medium px-3 py-1.5 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900">Mark shipped</button>}
        </div>
      </div>
      {showShip && (
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <select value={carrier} onChange={(e) => setCarrier(e.target.value)} className="rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-2 py-1 text-xs">
            <option>UPS</option><option>FedEx</option><option>DHL</option><option>USPS</option>
          </select>
          <input placeholder="Tracking #" value={tracking} onChange={(e) => setTracking(e.target.value)} className="rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-2 py-1 text-xs font-mono" />
          <button disabled={busy || !tracking} onClick={ship} className="text-xs font-medium px-3 py-1.5 rounded bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white">Ship</button>
        </div>
      )}
    </div>
  );
}
