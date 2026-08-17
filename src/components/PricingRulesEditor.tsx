"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Mat { slug: string; name: string; defaultCost: number; }
interface Proc { slug: string; name: string; }

export function PricingRulesEditor({ materials, processes, overrides }: { materials: Mat[]; processes: Proc[]; overrides: { key: string; value: number }[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const map = new Map(overrides.map((o) => [o.key, o.value]));

  async function save(key: string, value: number) {
    setBusy(key);
    await fetch("/api/admin/pricing", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ key, value }) });
    setBusy(null);
    router.refresh();
  }
  async function reset(key: string) {
    setBusy(key);
    await fetch("/api/admin/pricing", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ key }) });
    setBusy(null);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold mb-3">Material cost per cm³ (USD)</h2>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
              <tr><th className="text-left px-4 py-2">Material</th><th className="text-right px-4 py-2">Default</th><th className="text-right px-4 py-2">Override</th><th></th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {materials.map((m) => {
                const key = `material:${m.slug}:costPerCm3`;
                return <Row key={key} label={m.name} rowKey={key} defaultValue={m.defaultCost} current={map.get(key)} busy={busy === key} onSave={save} onReset={reset} />;
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3">Process minimum charge (USD)</h2>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
              <tr><th className="text-left px-4 py-2">Process</th><th className="text-right px-4 py-2">Default</th><th className="text-right px-4 py-2">Override</th><th></th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {processes.map((p) => {
                const key = `process:${p.slug}:minChargeCents`;
                const defaults: Record<string, number> = { fdm: 15, sls: 35, sla: 22, mjf: 32, "cnc-machining": 120 };
                return <Row key={key} label={p.name} rowKey={key} defaultValue={defaults[p.slug] ?? 20} current={map.get(key) ? map.get(key)! / 100 : undefined} busy={busy === key} onSave={(k, v) => save(k, v * 100)} onReset={reset} />;
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Row({ label, rowKey, defaultValue, current, busy, onSave, onReset }: { label: string; rowKey: string; defaultValue: number; current?: number; busy: boolean; onSave: (k: string, v: number) => void; onReset: (k: string) => void }) {
  const [v, setV] = useState<number>(current ?? defaultValue);
  return (
    <tr>
      <td className="px-4 py-2">{label}</td>
      <td className="px-4 py-2 text-right font-mono">${defaultValue.toFixed(2)}</td>
      <td className="px-4 py-2 text-right">
        <input type="number" step={0.01} value={v} onChange={(e) => setV(Number(e.target.value))} className="w-24 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-2 py-1 text-xs text-right font-mono" />
      </td>
      <td className="px-4 py-2 text-right space-x-1">
        <button disabled={busy} onClick={() => onSave(rowKey, v)} className="text-xs px-2 py-1 rounded bg-brand-600 text-white disabled:opacity-60">Save</button>
        {current !== undefined && <button disabled={busy} onClick={() => onReset(rowKey)} className="text-xs px-2 py-1 rounded border border-slate-300 dark:border-slate-700">Reset</button>}
      </td>
    </tr>
  );
}
