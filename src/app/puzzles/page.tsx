import Link from "next/link";
import { Container, Section } from "@/components/Card";
import { PUZZLES } from "@/data/puzzles";
import type { Metadata } from "next";

export const metadata: Metadata = { title: `Engineering Puzzles — ${PUZZLES.length} DFM + Physics Challenges`, description: "Real design-for-manufacturing challenges from our engineering team. GD&T, SLS, CNC, thermal, fatigue, and more." };

export default function PuzzlesIndex() {
  const cats = Array.from(new Set(PUZZLES.map((p) => p.category)));
  return (
    <Section>
      <Container>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Interactive · Free · No login</div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Engineering Puzzles</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">{PUZZLES.length} real design-for-manufacturing challenges from our engineering team. Practice on the same problems that trip up junior engineers on their first CAD review.</p>
        {cats.map((cat) => {
          const list = PUZZLES.filter((p) => p.category === cat);
          return (
            <div key={cat} className="mt-8">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">{cat} ({list.length})</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {list.map((p) => (
                  <Link key={p.slug} href={`/puzzles/${p.slug}`} className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-brand-500 transition-colors">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                      <span>{p.difficulty}</span>
                    </div>
                    <h3 className="text-sm font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">{p.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </Container>
    </Section>
  );
}
