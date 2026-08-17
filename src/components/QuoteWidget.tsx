"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ThreeViewer } from "./ThreeViewer";
import { Badge } from "./Card";
import { parseCad, type ParsedCad } from "@/lib/cad-parse";
import { MATERIALS } from "@/data/materials";

const processes = [
  { key: "fdm", name: "FDM", lead: "2–4 days" },
  { key: "sls", name: "SLS", lead: "3–5 days" },
  { key: "sla", name: "SLA", lead: "2–4 days" },
  { key: "mjf", name: "MJF", lead: "3–5 days" },
  { key: "cnc-machining", name: "5-Axis CNC", lead: "5–7 days" },
];

const finishes = [
  { key: "standard", label: "Standard" },
  { key: "bead-blast", label: "Bead blast" },
  { key: "vapor-smooth", label: "Vapor smooth" },
  { key: "anodize2", label: "Anodize II" },
  { key: "anodize3", label: "Anodize III" },
  { key: "powder-coat", label: "Powder coat" },
  { key: "alodine", label: "Alodine" },
  { key: "passivate", label: "Passivate" },
];

const expedites = [
  { key: "economy", label: "Economy", delta: "10% off · 2× lead" },
  { key: "standard", label: "Standard", delta: "Baseline" },
  { key: "rush2", label: "2-day rush", delta: "+30%" },
  { key: "rush1", label: "1-day rush", delta: "+50%" },
  { key: "weekend", label: "Weekend", delta: "+15% flat" },
];

const TIERS = [1, 5, 25, 100, 500];

interface QuoteResp {
  ok: boolean;
  quote: { unitPriceCents: number; totalPriceCents: number; leadTimeDays: string; costDrivers: { label: string; cents: number; pct: number }[]; volumeDiscountPct: number; compatible: boolean; reason?: string };
  dfm: { summary: string; issues: { level: string; text: string }[]; suggestedFinish?: string; usingMock: boolean; costOptimizations?: string[] };
  saved?: { id: string } | null;
}

export function QuoteWidget() {
  const [file, setFile] = useState<File | null>(null);
  const [parsed, setParsed] = useState<ParsedCad | null>(null);
  const [process, setProcess] = useState("sls");
  const [material, setMaterial] = useState("pa12-nylon");
  const [finish, setFinish] = useState("standard");
  const [expedite, setExpedite] = useState<"standard" | "economy" | "rush2" | "rush1" | "weekend">("standard");
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);
  const [parseNote, setParseNote] = useState<string | null>(null);
  const [result, setResult] = useState<QuoteResp | null>(null);
  const [tierPrices, setTierPrices] = useState<Record<number, number>>({});
  const [me, setMe] = useState<{ id: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setMe(d.user ?? null)).catch(() => {});
  }, []);

  const availableMaterials = MATERIALS.filter((m) => {
    const code = process === "fdm" ? "FDM" : process === "sls" ? "SLS" : process === "sla" ? "SLA" : process === "mjf" ? "MJF" : "CNC-5";
    return m.processes.includes(code as never);
  });

  useEffect(() => {
    if (!availableMaterials.some((m) => m.slug === material)) setMaterial(availableMaterials[0]?.slug || "");
  }, [process, availableMaterials, material]);

  async function handleFile(f: File) {
    setBusy(true);
    setResult(null);
    setParseNote("Parsing geometry…");
    setFile(f);
    try {
      const p = await parseCad(f);
      setParsed(p);
      setParseNote(p.isReal ? `Parsed via ${p.parser.toUpperCase()} · ${p.triangleCount.toLocaleString()} tris · ${p.volumeCm3.toFixed(2)} cm³` : `Estimated (STEP WASM warming — refresh if needed)`);
      await runQuote(p, process, material, finish, expedite, qty);
    } finally {
      setBusy(false);
    }
  }

  async function runQuote(p: ParsedCad, proc: string, mat: string, fin: string, exp: string, quantity: number) {
    setBusy(true);
    const body = { partName: p.filename, volumeCm3: p.volumeCm3, bboxMm: p.bboxMm, triangleCount: p.triangleCount, hash: p.hash, fileSize: p.fileSize, processSlug: proc, materialSlug: mat, finish: fin, expedite: exp };
    // Fetch all tiers in parallel; persist the main-quantity result.
    const results = await Promise.all(TIERS.map((t) =>
      fetch("/api/quote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...body, quantity: t, persist: !!me && t === quantity }) }).then((r) => r.json())
    ));
    const tierMap: Record<number, number> = {};
    TIERS.forEach((t, i) => { if (results[i]?.quote?.compatible) tierMap[t] = results[i].quote.unitPriceCents; });
    setTierPrices(tierMap);
    // The result for the selected quantity is the "main" one.
    const mainIdx = TIERS.indexOf(quantity);
    setResult((mainIdx >= 0 ? results[mainIdx] : results[0]) as QuoteResp);
    setBusy(false);
  }

  useEffect(() => {
    if (parsed && material) runQuote(parsed, process, material, finish, expedite, qty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [process, material, finish, expedite, qty]);

  const proc = processes.find((p) => p.key === process)!;

  return (
    <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xl shadow-brand-500/5">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Left: upload + inputs */}
        <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400">Step 1</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Upload CAD</h3>
            </div>
            <div className="flex gap-2">
              <Badge tone="green">Files never leave your browser</Badge>
              <Link href="/quote/batch" className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-slate-700 dark:text-slate-300">Batch / BOM →</Link>
            </div>
          </div>

          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
            className={`block cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${parsed ? "border-brand-500 bg-brand-50/40 dark:bg-brand-950/20" : "border-slate-300 dark:border-slate-700 hover:border-brand-500 hover:bg-brand-50/30 dark:hover:bg-brand-950/10"}`}
          >
            <input ref={inputRef} type="file" className="hidden" accept=".stl,.step,.stp,.iges,.igs,.3mf,.x_t,.x_b,.catpart,.sldprt,.ipt,.jt,.obj" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            {parsed ? (
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-mono text-slate-900 dark:text-slate-100">
                  <svg className="w-4 h-4 text-brand-600" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2l6 6-6 6V2z"/></svg>
                  {parsed.filename}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-mono">{parseNote}</div>
              </div>
            ) : (
              <div>
                <svg className="mx-auto w-8 h-8 text-slate-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v14m-6-6l6-6 6 6M4 21h16"/></svg>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Drop your CAD file or click to browse</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">.stl · .obj · .step · .stp · .3mf · .iges · .x_t · .sldprt · .catpart · .ipt</div>
                <div className="text-[10px] text-slate-500 mt-2">All parsers run in-browser · WASM STEP · zero upload until you order</div>
              </div>
            )}
          </label>

          <div className="mt-6 space-y-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Step 2 — Process</div>
              <div className="grid grid-cols-5 gap-1">
                {processes.map((p) => (
                  <button key={p.key} onClick={() => setProcess(p.key)} className={`p-2 rounded-lg text-xs font-medium transition-colors ${process === p.key ? "bg-brand-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>{p.name}</button>
                ))}
              </div>
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-500 font-mono">{proc.name}: {proc.lead}</div>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Step 3 — Material</div>
              <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
                {availableMaterials.map((m) => (<option key={m.slug} value={m.slug}>{m.name} — ${m.costPerCm3.toFixed(2)}/cm³{m.itarEligible ? " · ITAR" : ""}</option>))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Step 4 — Finish</div>
                <select value={finish} onChange={(e) => setFinish(e.target.value)} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
                  {finishes.map((f) => (<option key={f.key} value={f.key}>{f.label}</option>))}
                </select>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Step 5 — Speed</div>
                <select value={expedite} onChange={(e) => setExpedite(e.target.value as typeof expedite)} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
                  {expedites.map((e) => (<option key={e.key} value={e.key}>{e.label} · {e.delta}</option>))}
                </select>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Step 6 — Quantity</div>
              <div className="grid grid-cols-5 gap-1">
                {TIERS.map((n) => (
                  <button key={n} onClick={() => setQty(n)} className={`p-2 rounded-lg text-xs font-medium ${qty === n ? "bg-brand-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>×{n}</button>
                ))}
              </div>
              <div className="mt-2">
                <input type="number" min={1} max={50000} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-sm text-center font-mono" placeholder="Or custom qty" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: viewer + result */}
        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-950">
          <div className="mb-4">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400">Live preview</div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Client-side CAD analysis</h3>
          </div>
          <ThreeViewer file={file} fallbackShape={process === "cnc-machining" ? "bracket" : process === "sls" ? "torus" : "gear"} height={280} />

          {parsed && (
            <div className="mt-4 space-y-3 animate-fade-in">
              <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3">
                <div className="text-xs font-mono text-slate-500 mb-2">GEOMETRY {parsed.isReal ? "" : "(estimated)"}</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div><div className="text-slate-500">Volume</div><div className="font-mono font-medium">{parsed.volumeCm3.toFixed(1)} cm³</div></div>
                  <div><div className="text-slate-500">Bbox mm</div><div className="font-mono font-medium">{parsed.bboxMm.x.toFixed(0)}×{parsed.bboxMm.y.toFixed(0)}×{parsed.bboxMm.z.toFixed(0)}</div></div>
                  <div><div className="text-slate-500">Tris</div><div className="font-mono font-medium">{parsed.triangleCount.toLocaleString()}</div></div>
                </div>
              </div>

              {busy && (
                <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
                  <div className="text-xs text-slate-700 dark:text-slate-300">Computing quote, DFM &amp; tier prices…</div>
                </div>
              )}

              {result?.quote?.compatible === false && (
                <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-3 text-xs text-red-700 dark:text-red-300">{result.quote.reason}</div>
              )}

              {result?.dfm && result.quote?.compatible && (
                <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
                    <span>DFM ANALYSIS {result.dfm.usingMock ? "· mock (add GEMINI_API_KEY for live)" : "· Gemini 2.5"}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">{result.dfm.summary}</p>
                  <ul className="space-y-1">
                    {result.dfm.issues.map((i, idx) => (
                      <li key={idx} className="text-xs flex items-start gap-2">
                        <span className={i.level === "warn" ? "text-amber-500" : i.level === "error" ? "text-red-500" : "text-brand-500"}>{i.level === "warn" ? "⚠" : i.level === "error" ? "✕" : "ⓘ"}</span>
                        <span className="text-slate-700 dark:text-slate-300">{i.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result?.quote?.compatible && (
                <div className="rounded-lg bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-950/40 dark:to-brand-950/20 border border-brand-200 dark:border-brand-800 p-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300">Locked-price quote</div>
                      <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums">${(result.quote.totalPriceCents / 100).toFixed(2)}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">${(result.quote.unitPriceCents / 100).toFixed(2)} × {qty} · ships in {result.quote.leadTimeDays}</div>
                    </div>
                    <div className="flex gap-2">
                      {result?.saved?.id && (
                        <Link href={`/dashboard/quotes`} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-brand-300 text-brand-700 dark:text-brand-300 text-xs font-medium">Saved</Link>
                      )}
                      <Link href={me ? "/dashboard/quotes" : "/signup"} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">{me ? "View quotes →" : "Sign up to order →"}</Link>
                    </div>
                  </div>
                  {result.quote.volumeDiscountPct > 0 && <div className="mt-2 text-[11px] text-brand-700 dark:text-brand-300 font-mono">−{result.quote.volumeDiscountPct}% volume discount applied</div>}

                  {/* Tier ladder */}
                  {Object.keys(tierPrices).length > 0 && (
                    <div className="mt-3">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-1">Volume ladder (per part)</div>
                      <div className="grid grid-cols-5 gap-1 text-[11px] font-mono">
                        {TIERS.map((t) => (
                          <button key={t} onClick={() => setQty(t)} className={`rounded p-1.5 text-center border ${qty === t ? "border-brand-500 bg-brand-500/20" : "border-brand-200/40 dark:border-brand-800/40 hover:border-brand-400"}`}>
                            <div className="text-slate-500">×{t}</div>
                            <div className="text-slate-900 dark:text-slate-100">${((tierPrices[t] ?? 0) / 100).toFixed(2)}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono">
                    {result.quote.costDrivers.map((d) => (
                      <div key={d.label} className="flex justify-between border-b border-brand-200/40 dark:border-brand-800/40 py-0.5">
                        <span className="text-slate-600 dark:text-slate-400">{d.label}</span>
                        <span className={d.cents < 0 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-slate-100"}>{d.cents < 0 ? "−" : ""}${Math.abs(d.cents / 100).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-[10px] text-slate-500 dark:text-slate-500 font-mono">Price locked for 30 days · Free re-quote on any rev</div>
                </div>
              )}
            </div>
          )}

          {!parsed && (
            <div className="mt-4 text-xs text-slate-500 dark:text-slate-500 font-mono leading-relaxed">
              → Upload a CAD file to see live DFM analysis, cost-driver breakdown, and locked-price quote.<br />→ STL, OBJ, STEP all parsed in-browser. Nothing uploads until you order.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
