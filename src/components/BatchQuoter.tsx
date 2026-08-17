"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { parseCad, type ParsedCad } from "@/lib/cad-parse";
import { MATERIALS } from "@/data/materials";
import { Badge } from "./Card";

interface Line {
  parsed: ParsedCad;
  process: string;
  material: string;
  finish: string;
  qty: number;
  status: "queued" | "quoting" | "ok" | "err";
  unitCents?: number;
  totalCents?: number;
  leadTime?: string;
  err?: string;
}

const PROCESS_DEFAULT = "sls";
const MATERIAL_DEFAULT = "pa12-nylon";

export function BatchQuoter() {
  const [lines, setLines] = useState<Line[]>([]);
  const [running, setRunning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const csvRef = useRef<HTMLInputElement>(null);

  async function addFiles(files: FileList) {
    const parsed: Line[] = [];
    for (const f of Array.from(files)) {
      try {
        const p = await parseCad(f);
        parsed.push({ parsed: p, process: PROCESS_DEFAULT, material: MATERIAL_DEFAULT, finish: "standard", qty: 1, status: "queued" });
      } catch { /* skip */ }
    }
    setLines((prev) => [...prev, ...parsed]);
  }

  async function handleCsv(f: File) {
    // CSV columns: filename,process,material,quantity  (filename ignored — user pastes qty overrides for already-uploaded files)
    const text = await f.text();
    const rows = text.split("\n").filter(Boolean).slice(1);
    const patch = new Map<string, { process: string; material: string; qty: number }>();
    for (const row of rows) {
      const [filename, process = PROCESS_DEFAULT, material = MATERIAL_DEFAULT, qty = "1"] = row.split(",").map((s) => s.trim());
      if (filename) patch.set(filename, { process, material, qty: Number(qty) || 1 });
    }
    setLines((prev) =>
      prev.map((l) => {
        const p = patch.get(l.parsed.filename);
        if (!p) return l;
        return { ...l, process: p.process, material: p.material, qty: p.qty };
      })
    );
  }

  function updateLine(i: number, patch: Partial<Line>) {
    setLines((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }

  function removeLine(i: number) { setLines((prev) => prev.filter((_, idx) => idx !== i)); }

  async function runAll() {
    setRunning(true);
    setLines((prev) => prev.map((l) => ({ ...l, status: "quoting" })));
    const updated = await Promise.all(lines.map(async (l) => {
      try {
        const res = await fetch("/api/quote", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            partName: l.parsed.filename,
            volumeCm3: l.parsed.volumeCm3,
            bboxMm: l.parsed.bboxMm,
            triangleCount: l.parsed.triangleCount,
            processSlug: l.process,
            materialSlug: l.material,
            finish: l.finish,
            quantity: l.qty,
            persist: true,
          }),
        }).then((r) => r.json());
        if (res.ok && res.quote.compatible) {
          return { ...l, status: "ok" as const, unitCents: res.quote.unitPriceCents, totalCents: res.quote.totalPriceCents, leadTime: res.quote.leadTimeDays };
        }
        return { ...l, status: "err" as const, err: res.quote?.reason || res.error || "unknown" };
      } catch (e) {
        return { ...l, status: "err" as const, err: (e as Error).message };
      }
    }));
    setLines(updated);
    setRunning(false);
  }

  const total = lines.filter((l) => l.status === "ok").reduce((a, l) => a + (l.totalCents ?? 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => inputRef.current?.click()}
          className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 hover:bg-brand-50/30 dark:hover:bg-brand-950/10 p-8 text-left"
        >
          <svg className="w-6 h-6 text-brand-600 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v14m-6-6l6-6 6 6M4 21h16"/></svg>
          <div className="font-semibold text-slate-900 dark:text-slate-100">Add CAD files</div>
          <div className="text-xs text-slate-500 mt-1 font-mono">Multi-select .stl · .obj · .step · folder drop</div>
          <input ref={inputRef} type="file" multiple accept=".stl,.step,.stp,.iges,.igs,.3mf,.x_t,.x_b,.catpart,.sldprt,.ipt,.jt,.obj" className="hidden" onChange={(e) => e.target.files && addFiles(e.target.files)} />
        </button>
        <button
          onClick={() => csvRef.current?.click()}
          className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 p-8 text-left"
        >
          <svg className="w-6 h-6 text-brand-600 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16v16H4z M4 12h16"/></svg>
          <div className="font-semibold text-slate-900 dark:text-slate-100">Apply BOM CSV</div>
          <div className="text-xs text-slate-500 mt-1 font-mono">columns: filename,process,material,quantity</div>
          <input ref={csvRef} type="file" accept=".csv" className="hidden" onChange={(e) => e.target.files?.[0] && handleCsv(e.target.files[0])} />
        </button>
      </div>

      {lines.length > 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="text-sm font-semibold">{lines.length} parts in batch</div>
            <div className="flex items-center gap-2">
              <button onClick={runAll} disabled={running} className="px-4 py-1.5 rounded-md bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-xs font-medium">{running ? "Quoting…" : "Quote all"}</button>
              <button onClick={() => setLines([])} className="px-3 py-1.5 rounded-md text-xs text-slate-500 hover:text-slate-700">Clear</button>
            </div>
          </div>
          <table className="w-full text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 font-mono uppercase tracking-widest">
              <tr>
                <th className="text-left px-4 py-2">Part</th>
                <th className="text-left px-4 py-2">Vol / Bbox</th>
                <th className="text-left px-4 py-2">Process</th>
                <th className="text-left px-4 py-2">Material</th>
                <th className="text-right px-4 py-2">Qty</th>
                <th className="text-right px-4 py-2">Line total</th>
                <th className="text-left px-4 py-2">Lead</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {lines.map((l, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 font-mono truncate max-w-[180px]">{l.parsed.filename}</td>
                  <td className="px-4 py-2 font-mono text-slate-500">{l.parsed.volumeCm3.toFixed(1)}cm³ · {l.parsed.bboxMm.x.toFixed(0)}×{l.parsed.bboxMm.y.toFixed(0)}×{l.parsed.bboxMm.z.toFixed(0)}</td>
                  <td className="px-4 py-2">
                    <select value={l.process} onChange={(e) => updateLine(i, { process: e.target.value })} className="rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-1.5 py-1 text-xs">
                      {["fdm", "sls", "sla", "mjf", "cnc-machining"].map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <select value={l.material} onChange={(e) => updateLine(i, { material: e.target.value })} className="rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-1.5 py-1 text-xs max-w-[140px]">
                      {MATERIALS.map((m) => <option key={m.slug} value={m.slug}>{m.shortName}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <input type="number" min={1} value={l.qty} onChange={(e) => updateLine(i, { qty: Math.max(1, Number(e.target.value)) })} className="w-16 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-1.5 py-1 text-xs text-right font-mono" />
                  </td>
                  <td className="px-4 py-2 text-right font-mono font-semibold tabular-nums">{l.totalCents != null ? `$${(l.totalCents / 100).toFixed(2)}` : "—"}</td>
                  <td className="px-4 py-2 text-slate-500">{l.leadTime ?? "—"}</td>
                  <td className="px-4 py-2 text-right">
                    {l.status === "quoting" && <span className="text-brand-500">…</span>}
                    {l.status === "ok" && <Badge tone="green">ok</Badge>}
                    {l.status === "err" && <Badge tone="red" >err</Badge>}
                    <button onClick={() => removeLine(i)} className="ml-2 text-slate-400 hover:text-red-600">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {lines.some((l) => l.status === "ok") && (
            <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-brand-50/30 dark:bg-brand-950/20">
              <div className="text-sm">Batch total (compatible lines only)</div>
              <div className="flex items-center gap-3">
                <div className="text-xl font-semibold tabular-nums">${(total / 100).toFixed(2)}</div>
                <Link href="/dashboard/quotes" className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Review in dashboard →</Link>
              </div>
            </div>
          )}
        </div>
      )}
      {lines.length === 0 && (
        <div className="text-sm text-slate-500 dark:text-slate-400 py-8 text-center">
          Add STL/OBJ/STEP files or drop a BOM CSV to begin. Each row quotes independently, batch total computed at end.
        </div>
      )}
    </div>
  );
}
