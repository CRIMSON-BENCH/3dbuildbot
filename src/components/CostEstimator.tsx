"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { quote as computeQuote, formatUSD } from "@/lib/quote-engine";
import { MATERIALS } from "@/data/materials";

const PROCESSES = [
  { key: "fdm", name: "FDM" }, { key: "sls", name: "SLS" }, { key: "sla", name: "SLA" }, { key: "mjf", name: "MJF" }, { key: "cnc-machining", name: "5-Axis CNC" },
];

export function CostEstimator() {
  const [process, setProcess] = useState("sls");
  const [material, setMaterial] = useState("pa12-nylon");
  const [x, setX] = useState(50);
  const [y, setY] = useState(30);
  const [z, setZ] = useState(20);
  const [density, setDensity] = useState(0.35); // effective fill 0..1

  const materials = MATERIALS.filter((m) => {
    const code = process === "fdm" ? "FDM" : process === "sls" ? "SLS" : process === "sla" ? "SLA" : process === "mjf" ? "MJF" : "CNC-5";
    return m.processes.includes(code as never);
  });

  const volumeCm3 = (x * y * z * density) / 1000;

  const results = useMemo(() =>
    [1, 5, 25, 100].map((qty) => ({
      qty,
      q: computeQuote({ volumeCm3, bboxMm: { x, y, z }, processSlug: process, materialSlug: material, quantity: qty }),
    })),
  [process, material, x, y, z, density, volumeCm3]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 grid sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <div className="text-xs font-medium mb-1">Process</div>
            <div className="grid grid-cols-5 gap-1">
              {PROCESSES.map((p) => (
                <button key={p.key} onClick={() => setProcess(p.key)} className={`p-2 rounded-lg text-xs font-medium ${process === p.key ? "bg-brand-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>{p.name}</button>
              ))}
            </div>
          </div>
          <label className="block">
            <span className="text-xs font-medium">Material</span>
            <select value={material} onChange={(e) => setMaterial(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
              {materials.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}
            </select>
          </label>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <label className="block"><span className="text-xs font-medium">X (mm)</span><input type="number" value={x} onChange={(e) => setX(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-right font-mono" /></label>
            <label className="block"><span className="text-xs font-medium">Y (mm)</span><input type="number" value={y} onChange={(e) => setY(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-right font-mono" /></label>
            <label className="block"><span className="text-xs font-medium">Z (mm)</span><input type="number" value={z} onChange={(e) => setZ(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-right font-mono" /></label>
          </div>
          <label className="block">
            <span className="text-xs font-medium">Effective fill (0 = shell only, 1 = solid brick)</span>
            <input type="range" min={0.05} max={1} step={0.01} value={density} onChange={(e) => setDensity(Number(e.target.value))} className="mt-1 w-full" />
            <div className="text-[11px] font-mono text-slate-500">Density {density.toFixed(2)} · effective volume {volumeCm3.toFixed(1)} cm³</div>
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
            <tr><th className="text-left px-4 py-2">Qty</th><th className="text-right px-4 py-2">Unit</th><th className="text-right px-4 py-2">Total</th><th className="text-left px-4 py-2">Lead time</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {results.map((r) => (
              <tr key={r.qty}>
                <td className="px-4 py-3 font-mono">×{r.qty}</td>
                <td className="px-4 py-3 text-right tabular-nums font-mono">{r.q.compatible ? formatUSD(r.q.unitPriceCents) : "—"}</td>
                <td className="px-4 py-3 text-right tabular-nums font-semibold">{r.q.compatible ? formatUSD(r.q.totalPriceCents) : "incompatible"}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{r.q.leadTimeDays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-slate-500 dark:text-slate-500">
        Estimate accuracy: ±20% on rough dimensions. For an exact locked-price quote,{" "}
        <Link href="/quote" className="text-brand-600 dark:text-brand-400 underline">upload your CAD file →</Link>
      </div>
    </div>
  );
}
