import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import { MATERIALS } from "@/data/materials";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Materials · Datasheet-grade" };

export default function MaterialsIndex() {
  return (
    <Section>
      <Container>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Materials</div>
        <h1 className="text-3xl font-semibold tracking-tight">All 20 materials · Real datasheet values</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">Tensile, elongation, glass transition, density, cost per cm³. Filter by category or process.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {MATERIALS.map((m) => (
            <Link key={m.slug} href={`/materials/${m.slug}`} className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-brand-500 transition-colors group">
              <div className={`absolute inset-0 opacity-60 pointer-events-none bg-gradient-to-br ${m.color}`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{m.category}</div>
                  {m.itarEligible && <Badge tone="red">ITAR</Badge>}
                </div>
                <div className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-1 group-hover:text-brand-600">{m.name}</div>
                <div className="mt-3 grid grid-cols-2 gap-1 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                  <div>σ<sub>t</sub>: {m.tensileMpa} MPa</div>
                  <div>ρ: {m.densityGcc} g/cm³</div>
                  <div>ε: {m.elongationPct}%</div>
                  <div>T<sub>g</sub>: {m.glassTransC}°C</div>
                  <div className="col-span-2 text-brand-600 dark:text-brand-400 pt-1">${m.costPerCm3.toFixed(2)}/cm³</div>
                </div>
                <div className="mt-2 text-[10px] font-mono text-slate-500">Processes: {m.processes.join(" · ")}</div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
