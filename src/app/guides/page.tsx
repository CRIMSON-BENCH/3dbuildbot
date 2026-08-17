import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import { GUIDES } from "@/data/guides";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "DFM & Design Guides" };

export default function GuidesIndex() {
  return (
    <Section>
      <Container>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Resources</div>
        <h1 className="text-3xl font-semibold tracking-tight">Engineer-grade DFM guides</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">Written for engineers who read the datasheet before quoting.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GUIDES.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-500 transition-colors">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                <span>{g.category}</span>
                <span>{g.readTime}</span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{g.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{g.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
