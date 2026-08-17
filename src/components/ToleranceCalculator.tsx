"use client";
import { useState, useMemo, useEffect } from "react";

interface Feature { label: string; nominal: number; tolerance: number; }

const PROCESS_TOLS: Record<string, number> = {
  fdm: 0.20, sls: 0.30, sla: 0.15, mjf: 0.30, "cnc-3": 0.05, "cnc-5": 0.025, dmls: 0.10,
};

const PRESETS: Record<string, Feature[]> = {
  cnc_bracket: [
    { label: "Hole 1 → Datum A", nominal: 25, tolerance: 0.05 },
    { label: "Hole 1 → Hole 2", nominal: 40, tolerance: 0.025 },
    { label: "Hole 2 → Edge", nominal: 10, tolerance: 0.05 },
  ],
  sls_snap: [
    { label: "Snap arm length", nominal: 12, tolerance: 0.3 },
    { label: "Bore Ø", nominal: 6, tolerance: 0.3 },
    { label: "Wall offset", nominal: 2, tolerance: 0.2 },
  ],
};

export function ToleranceCalculator() {
  const [features, setFeatures] = useState<Feature[]>(PRESETS.cnc_bracket);
  const [process, setProcess] = useState("cnc-5");
  const [iterations, setIterations] = useState(10000);

  useEffect(() => {
    // Hydrate from URL if present
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    const state = p.get("s");
    if (state) {
      try { setFeatures(JSON.parse(atob(state))); } catch { /* ignore */ }
    }
    const proc = p.get("p");
    if (proc) setProcess(proc);
  }, []);

  const worstCase = features.reduce((a, f) => a + f.tolerance, 0);
  const rss = Math.sqrt(features.reduce((a, f) => a + f.tolerance * f.tolerance, 0));
  const nominalSum = features.reduce((a, f) => a + f.nominal, 0);

  const { cpk, sigma } = useMemo(() => runMonteCarlo(features, iterations), [features, iterations]);

  const processFloor = PROCESS_TOLS[process] ?? 0.05;
  const anyBelow = features.some((f) => f.tolerance < processFloor);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/tools/tolerance-calculator?s=${btoa(JSON.stringify(features))}&p=${process}`
    : "";

  function update(i: number, patch: Partial<Feature>) {
    setFeatures((prev) => prev.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  }
  function addFeature() { setFeatures((prev) => [...prev, { label: `Feature ${prev.length + 1}`, nominal: 10, tolerance: 0.05 }]); }
  function removeFeature(i: number) { setFeatures((prev) => prev.filter((_, idx) => idx !== i)); }
  function copyLink() { navigator.clipboard.writeText(shareUrl); }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
        <div className="flex items-end gap-3 flex-wrap">
          <label className="block">
            <span className="text-xs font-medium">Process</span>
            <select value={process} onChange={(e) => setProcess(e.target.value)} className="mt-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
              <option value="cnc-5">5-Axis CNC (±0.025mm)</option>
              <option value="cnc-3">3-Axis CNC (±0.05mm)</option>
              <option value="dmls">DMLS metal 3DP (±0.10mm)</option>
              <option value="sla">SLA (±0.15mm)</option>
              <option value="fdm">FDM (±0.20mm)</option>
              <option value="sls">SLS (±0.30mm)</option>
              <option value="mjf">MJF (±0.30mm)</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-medium">Preset</span>
            <select onChange={(e) => setFeatures(PRESETS[e.target.value])} className="mt-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
              <option value="cnc_bracket">CNC bracket (3 holes)</option>
              <option value="sls_snap">SLS snap-fit assembly</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-medium">Monte-Carlo iterations</span>
            <select value={iterations} onChange={(e) => setIterations(Number(e.target.value))} className="mt-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
              <option value={1000}>1,000</option>
              <option value={10000}>10,000</option>
              <option value={100000}>100,000</option>
            </select>
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Features in stack</h2>
          <button onClick={addFeature} className="text-xs font-medium px-3 py-1.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900">+ Add feature</button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
            <tr>
              <th className="text-left px-4 py-2">Label</th>
              <th className="text-right px-4 py-2">Nominal (mm)</th>
              <th className="text-right px-4 py-2">Tolerance (±mm)</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {features.map((f, i) => (
              <tr key={i}>
                <td className="px-4 py-2"><input value={f.label} onChange={(e) => update(i, { label: e.target.value })} className="w-full rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-2 py-1 text-xs" /></td>
                <td className="px-4 py-2 text-right"><input type="number" step={0.001} value={f.nominal} onChange={(e) => update(i, { nominal: Number(e.target.value) })} className="w-24 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-2 py-1 text-xs text-right font-mono" /></td>
                <td className="px-4 py-2 text-right"><input type="number" step={0.001} value={f.tolerance} onChange={(e) => update(i, { tolerance: Number(e.target.value) })} className="w-24 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-2 py-1 text-xs text-right font-mono" /></td>
                <td className="px-4 py-2 text-right"><button onClick={() => removeFeature(i)} className="text-xs text-red-600">✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        <Metric label="Nominal sum" value={`${nominalSum.toFixed(3)} mm`} />
        <Metric label="Worst-case stack" value={`±${worstCase.toFixed(3)} mm`} />
        <Metric label="RSS stack (statistical)" value={`±${rss.toFixed(3)} mm`} />
        <Metric label="Monte-Carlo Cpk" value={cpk.toFixed(2)} sub={`σ = ${sigma.toFixed(4)} mm`} />
      </div>

      {anyBelow && (
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 text-xs text-amber-700 dark:text-amber-300">
          ⚠ At least one tolerance is tighter than the process floor (±{processFloor}mm). Consider switching to a tighter process or opening the callout.
        </div>
      )}

      <div className="flex items-center gap-3">
        <button onClick={copyLink} className="px-3 py-1.5 rounded-md bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium">Copy shareable URL</button>
        <a href={`/quote?process=${process}`} className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-xs font-medium">Quote a real part on this process →</a>
      </div>
    </div>
  );
}

function runMonteCarlo(features: Feature[], iterations: number) {
  if (!features.length) return { cpk: 0, sigma: 0 };
  const results: number[] = [];
  for (let i = 0; i < iterations; i++) {
    let sum = 0;
    for (const f of features) {
      // Approximate normal via Box-Muller
      const u1 = Math.random(), u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      sum += f.nominal + z * (f.tolerance / 3); // 3-sigma spec
    }
    results.push(sum);
  }
  const mean = results.reduce((a, b) => a + b, 0) / results.length;
  const variance = results.reduce((a, b) => a + (b - mean) ** 2, 0) / results.length;
  const sigma = Math.sqrt(variance);
  const targetTolerance = features.reduce((a, f) => a + f.tolerance, 0);
  const cpk = targetTolerance / (3 * sigma);
  return { cpk, sigma };
}

function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{label}</div>
      <div className="text-lg font-semibold tabular-nums text-slate-900 dark:text-slate-100">{value}</div>
      {sub && <div className="text-[11px] font-mono text-slate-500">{sub}</div>}
    </div>
  );
}
