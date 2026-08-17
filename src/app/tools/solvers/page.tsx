import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import { SOLVERS } from "@/data/solvers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physics & Engineering Solvers — Free Interactive Calculators",
  description: "Beam deflection, moment of inertia, feed & speed, thermal expansion, Reynolds, buckling, GD&T stack. Real physics, shareable URLs, no login.",
};

const CAT_LABELS = {
  mechanics: "Mechanics",
  thermal: "Thermal",
  fluid: "Fluid Dynamics",
  machining: "Machining",
  math: "Math + GD&T",
  electrical: "Electrical",
  materials: "Materials",
};

export default function SolversHub() {
  const cats = Object.keys(CAT_LABELS) as (keyof typeof CAT_LABELS)[];
  return (
    <>
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Free · No login · Shareable via URL</div>
          <h1 className="text-4xl font-semibold tracking-tight">Engineering & Physics Solvers</h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Real physics, real math, real machinist rules — the calculations engineers actually run before ordering a part. Every solver has an interactive form, live output, and a shareable URL you can paste into your team chat.
          </p>
        </Container>
      </Section>
      <Section className="py-4">
        <Container className="max-w-4xl space-y-10">
          {cats.map((cat) => {
            const list = SOLVERS.filter((s) => s.category === cat);
            if (!list.length) return null;
            return (
              <div key={cat}>
                <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">{CAT_LABELS[cat]}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {list.map((s) => (
                    <Link key={s.slug} href={`/tools/solvers/${s.slug}`} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-brand-500 transition-colors group">
                      <div className="text-sm font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">{s.name}</div>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{s.short}</p>
                      <div className="mt-2 text-[11px] font-mono text-brand-600 dark:text-brand-400">{s.formula}</div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </Section>
    </>
  );
}
