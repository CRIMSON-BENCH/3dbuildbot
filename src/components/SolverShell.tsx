"use client";
import Link from "next/link";
import { Container, Section, Badge } from "./Card";

export function SolverShell({ title, category, formula, children }: { title: string; category: string; formula: string; children: React.ReactNode }) {
  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">
          <Link href="/tools/solvers" className="hover:underline">Solvers</Link> · {category}
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h1>
        <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-900 px-3 py-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
          {formula}
        </div>
        <div className="mt-8">{children}</div>
        <div className="mt-10 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/20 p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-1">Ready to build it?</div>
          <div className="text-sm">Take these numbers back to your CAD, upload a STEP, get a locked-price quote in seconds. <Link href="/quote" className="text-brand-600 dark:text-brand-400 font-medium underline">Start a quote →</Link></div>
        </div>
        <div className="mt-6 text-[11px] text-slate-500 dark:text-slate-500">Solver output is for reference and preliminary sizing only. Verify against certified standards (ASME, AISC, Eurocode) for load-bearing or life-safety applications. 3DBuildBot does not provide engineering advice.</div>
      </Container>
    </Section>
  );
}

export function Input({ label, value, onChange, unit, step = "any", min, max }: { label: string; value: number; onChange: (n: number) => void; unit?: string; step?: number | string; min?: number; max?: number }) {
  return (
    <label className="block">
      <span className="text-xs font-medium">{label}{unit && <span className="text-slate-500 font-mono ml-1">({unit})</span>}</span>
      <input type="number" value={value} step={step} min={min} max={max} onChange={(e) => onChange(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono text-right" />
    </label>
  );
}

export function Select<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <label className="block">
      <span className="text-xs font-medium">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value as T)} className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

export function Result({ label, value, unit, tone = "brand" }: { label: string; value: string; unit?: string; tone?: "brand" | "amber" | "red" | "green" }) {
  const tones = {
    brand: "bg-brand-50 dark:bg-brand-950/30 border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300",
    amber: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300",
    red: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300",
    green: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300",
  };
  return (
    <div className={`rounded-lg border p-4 ${tones[tone]}`}>
      <div className="text-[11px] font-mono uppercase tracking-widest opacity-80">{label}</div>
      <div className="text-2xl font-semibold tabular-nums mt-1">{value}{unit && <span className="text-sm opacity-70 ml-1">{unit}</span>}</div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 ${className}`}>{children}</div>;
}
