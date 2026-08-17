"use client";
import { useState } from "react";
import Link from "next/link";

interface Rec { slug: string; name: string; shortName: string; score: number; tensileMpa: number; elongationPct: number; glassTransC: number; densityGcc: number; costPerCm3: number; processes: string[]; itarEligible?: boolean; bioCompatible?: boolean; }

export function MaterialWizard() {
  const [loadKind, setLoadKind] = useState<"low" | "medium" | "high" | "impact" | "cyclic">("medium");
  const [maxTempC, setMaxTempC] = useState(80);
  const [environment, setEnvironment] = useState<"indoor" | "outdoor" | "chemical" | "medical" | "cryogenic" | "food-contact">("indoor");
  const [cosmetic, setCosmetic] = useState<"not-important" | "important" | "critical">("not-important");
  const [cost, setCost] = useState<"cheap" | "balanced" | "premium">("balanced");
  const [itar, setItar] = useState(false);
  const [bio, setBio] = useState(false);
  const [busy, setBusy] = useState(false);
  const [rec, setRec] = useState<{ top3: Rec[]; rationale: string; usingMock: boolean } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await fetch("/api/material-wizard", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ loadKind, maxTempC, environment, cosmetic, cost, itar, bio }) });
    const data = await res.json();
    setBusy(false);
    if (data.ok) setRec(data);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs font-medium">1. How is the part loaded?</span>
          <select value={loadKind} onChange={(e) => setLoadKind(e.target.value as typeof loadKind)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
            <option value="low">Low load / cosmetic</option>
            <option value="medium">Medium load / general use</option>
            <option value="high">High static load</option>
            <option value="impact">Impact / drop test</option>
            <option value="cyclic">Cyclic / fatigue</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium">2. Maximum service temperature (°C)</span>
          <input type="number" value={maxTempC} onChange={(e) => setMaxTempC(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs font-medium">3. Environment</span>
          <select value={environment} onChange={(e) => setEnvironment(e.target.value as typeof environment)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
            <option value="indoor">Indoor (controlled)</option>
            <option value="outdoor">Outdoor (UV, weather)</option>
            <option value="chemical">Chemical exposure</option>
            <option value="medical">Medical / skin-contact</option>
            <option value="cryogenic">Cryogenic</option>
            <option value="food-contact">Food-contact</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium">4. Cosmetic importance</span>
          <select value={cosmetic} onChange={(e) => setCosmetic(e.target.value as typeof cosmetic)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
            <option value="not-important">Not important (functional part)</option>
            <option value="important">Important (visible part)</option>
            <option value="critical">Critical (customer-facing, optically clear, etc)</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium">5. Cost target</span>
          <select value={cost} onChange={(e) => setCost(e.target.value as typeof cost)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
            <option value="cheap">Cheapest that works</option>
            <option value="balanced">Balanced</option>
            <option value="premium">Best-in-class</option>
          </select>
        </label>
        <div className="block space-y-2">
          <span className="text-xs font-medium">6. Regulatory needs</span>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={itar} onChange={(e) => setItar(e.target.checked)} /> ITAR-eligible / DFARS-compliant metal</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={bio} onChange={(e) => setBio(e.target.checked)} /> Biocompatible (medical, skin contact)</label>
        </div>
        <div className="sm:col-span-2">
          <button disabled={busy} type="submit" className="w-full rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-medium py-2.5">{busy ? "Ranking materials with Gemini…" : "Get recommendation →"}</button>
        </div>
      </form>

      {rec && (
        <div className="space-y-4 animate-fade-in">
          <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/60 dark:bg-brand-950/20 p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2">
              Gemini rationale {rec.usingMock ? "· (mock — add GEMINI_API_KEY for live)" : "· Gemini 2.5"}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{rec.rationale}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {rec.top3.map((m, i) => (
              <Link key={m.slug} href={`/materials/${m.slug}`} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-brand-500 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Rank #{i + 1}</div>
                  <div className="text-xs font-mono text-brand-600">score {Math.round(m.score)}</div>
                </div>
                <h3 className="mt-1 text-base font-semibold">{m.name}</h3>
                <div className="mt-3 grid grid-cols-2 gap-1 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                  <div>σ<sub>t</sub>: {m.tensileMpa} MPa</div>
                  <div>ρ: {m.densityGcc} g/cm³</div>
                  <div>ε: {m.elongationPct}%</div>
                  <div>T<sub>g</sub>: {m.glassTransC}°C</div>
                  <div className="col-span-2 text-brand-600 dark:text-brand-400 pt-1">${m.costPerCm3.toFixed(2)}/cm³ · {m.processes.join(", ")}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-500">
            <Link href={`/quote?material=${rec.top3[0].slug}`} className="text-brand-600 dark:text-brand-400 underline">Quote a part in {rec.top3[0].name} →</Link>
          </div>
        </div>
      )}
    </div>
  );
}
