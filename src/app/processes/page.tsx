import Link from "next/link";
import { Container, Section } from "@/components/Card";
import { PROCESSES } from "@/data/processes";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manufacturing Processes" };

export default function ProcessesIndex() {
  return (
    <Section>
      <Container>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Processes</div>
        <h1 className="text-3xl font-semibold tracking-tight">Five production lines. One platform.</h1>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROCESSES.map((p) => (
            <Link key={p.slug} href={`/processes/${p.slug}`} className={`group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-500 transition-colors`}>
              <div className={`absolute inset-0 opacity-40 pointer-events-none bg-gradient-to-br ${p.color}`} />
              <div className="relative">
                <div className="flex items-baseline justify-between">
                  <div className="text-[10px] font-mono tracking-widest text-brand-600 dark:text-brand-400 uppercase">{p.short}</div>
                  <div className="text-[10px] font-mono text-slate-500">{p.leadTimeDays}</div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-1 group-hover:text-brand-600">{p.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">{p.tagline}</p>
                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-3 gap-2 text-[11px] font-mono">
                  <div><div className="text-slate-500">Tol.</div><div className="text-slate-900 dark:text-slate-100">{p.toleranceMm}</div></div>
                  <div><div className="text-slate-500">Layer</div><div className="text-slate-900 dark:text-slate-100">{p.layerMicron || "—"}</div></div>
                  <div><div className="text-slate-500">Build</div><div className="text-slate-900 dark:text-slate-100">{p.maxBuildMm}</div></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
