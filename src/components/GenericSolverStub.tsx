"use client";

// Generic solver placeholder for solvers that don't have a fully-built
// interactive component yet. Displays the formula + a "Coming interactive"
// notice while still ranking for SEO.
import { SolverShell } from "./SolverShell";
import Link from "next/link";
import type { SolverMeta } from "@/data/solvers";

export function GenericSolverStub({ solver }: { solver: SolverMeta }) {
  const catLabel: Record<SolverMeta["category"], string> = {
    mechanics: "Mechanics", thermal: "Thermal", fluid: "Fluid Dynamics",
    machining: "Machining", math: "Math + GD&T", electrical: "Electrical",
    materials: "Materials",
  };
  return (
    <SolverShell title={solver.name} category={catLabel[solver.category]} formula={solver.formula}>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Overview</div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{solver.short}</p>

        <div className="mt-6 rounded-lg bg-slate-50 dark:bg-slate-950 p-4">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Formula</div>
          <div className="font-mono text-sm text-slate-800 dark:text-slate-200">{solver.formula}</div>
        </div>

        <div className="mt-6 text-sm text-slate-600 dark:text-slate-400">
          <strong>Interactive calculator coming soon.</strong> In the meantime, use the formula above with your inputs, or{" "}
          <Link href="/quote" className="text-brand-600 hover:underline">upload a CAD file for a quote</Link> — our team can help with specific calculations against your part.
        </div>
      </div>

      <div className="mt-6 text-xs text-slate-500">
        Need this calculation urgently? <Link href="/contact" className="text-brand-600 hover:underline">Contact us</Link> and we'll run it for you within 24 hours.
      </div>
    </SolverShell>
  );
}
