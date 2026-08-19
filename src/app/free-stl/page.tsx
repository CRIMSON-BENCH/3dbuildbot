// Free STL library hub — massive SEO target ("free stl X"). Each item
// gets its own page with a "Get printed and shipped for $X" CTA.
import Link from "next/link";
import type { Metadata } from "next";
import { PRINTABLES } from "@/data/printables";
import { Container, Section, Badge } from "@/components/Card";

export const metadata: Metadata = {
  title: `Free STL Files (${PRINTABLES.length}+) — Household, Tools, Organizers | 3DBuildBot`,
  description: `${PRINTABLES.length}+ free STL files for organizers, tools, household items. Print at home or get it printed and shipped by us starting under $10.`,
};

export default function Page() {
  const cats = Array.from(new Set(PRINTABLES.map((p) => p.category)));
  return (
    <Section>
      <Container className="max-w-5xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Free STL library</div>
        <h1 className="text-4xl font-semibold tracking-tight">{PRINTABLES.length}+ free printable designs.</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
          Print at home if you have a printer, or get it printed and shipped by our US supplier network starting under $10.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {cats.map((c) => <Badge key={c} tone="brand">{c}</Badge>)}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRINTABLES.map((p) => (
            <Link key={p.slug} href={`/free-stl/${p.slug}`} className="rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 bg-white dark:bg-slate-900 p-5 block transition">
              <div className="text-xs font-mono text-slate-500">{p.category}</div>
              <h2 className="mt-1 font-semibold">{p.name}</h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{p.description}</p>
              <div className="mt-3 text-xs font-mono text-slate-500">
                {p.volumeCm3Approx} cm³ · {p.printTimeHours}h print · {p.difficulty}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
