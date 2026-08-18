import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { ALL_PUZZLES as PUZZLES, getPuzzleBySlug } from "@/data/puzzles";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PUZZLES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPuzzleBySlug(slug);
  if (!p) return { title: "Puzzle" };
  return { title: `${p.title} — Engineering Puzzle (${p.category})`, description: p.desc };
}

export default async function PuzzlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPuzzleBySlug(slug);
  if (!p) notFound();
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="text-xs font-mono text-slate-500"><Link href="/puzzles" className="text-brand-600 hover:underline">Puzzles</Link></div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{p.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="brand">{p.category}</Badge>
          <Badge tone="slate">{p.difficulty}</Badge>
        </div>
        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Problem</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{p.problem}</p>
        </div>
        {p.hint && (
          <details className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 group">
            <summary className="cursor-pointer text-xs font-mono uppercase tracking-widest text-slate-500 group-open:mb-2">Hint (click to reveal)</summary>
            <p className="text-slate-700 dark:text-slate-300">{p.hint}</p>
          </details>
        )}
        <details className="mt-4 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-6 group">
          <summary className="cursor-pointer text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 group-open:mb-2">Solution (click to reveal)</summary>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{p.solution}</p>
        </details>
        <InlineQuoteCta label="Have your own DFM puzzle? Upload a CAD and let us diagnose it" />
        <DisclaimerFooter />
      </Container>
    </Section>
  );
}
