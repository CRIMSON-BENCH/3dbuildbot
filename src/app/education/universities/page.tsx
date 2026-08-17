import Link from "next/link";
import { Container, Section } from "@/components/Card";
import { SCHOOLS_LARGE } from "@/data/schools-large";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Universities — 3DBuildBot for Education" };

export default function UniversitiesIndex() {
  const unis = SCHOOLS_LARGE.filter((s) => s.type === "university" || s.type === "college").sort((a, b) => a.name.localeCompare(b.name));
  const byState = new Map<string, typeof unis>();
  for (const u of unis) {
    if (!byState.has(u.stateAbbr)) byState.set(u.stateAbbr, []);
    byState.get(u.stateAbbr)!.push(u);
  }
  const states = Array.from(byState.keys()).sort();
  return (
    <Section>
      <Container>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Universities</div>
        <h1 className="text-3xl font-semibold tracking-tight">Manufacturing services for {unis.length}+ universities</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">$50 free credit + 25% off first order for verified .edu students. Faculty labs eligible for NET-30 and dedicated capacity.</p>
        <div className="mt-8 space-y-6">
          {states.map((state) => (
            <div key={state}>
              <h2 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-2">{state}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {byState.get(state)!.map((u) => (
                  <Link key={u.slug} href={`/education/university/${u.slug}`} className="text-sm text-brand-600 hover:underline truncate">{u.name}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
