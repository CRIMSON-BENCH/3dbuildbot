import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORY_LABELS, STANDARD_PARTS, getPartsByCategory, PartCategory } from "@/data/standard-parts";
import { Container, Section, Badge } from "@/components/Card";
import type { Metadata } from "next";

export function generateStaticParams() {
  const cats = new Set(STANDARD_PARTS.map((p) => p.category));
  return Array.from(cats).map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_LABELS[category as PartCategory];
  if (!meta) return { title: "Parts" };
  return { title: `${meta.label} — Standard Parts Library`, description: meta.description };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const meta = CATEGORY_LABELS[category as PartCategory];
  if (!meta) notFound();
  const parts = getPartsByCategory(category as PartCategory);
  return (
    <Section>
      <Container className="max-w-4xl">
        <Link href="/parts" className="text-xs text-brand-600">← All categories</Link>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{meta.label}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{meta.description}</p>
        <div className="mt-8 divide-y divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          {parts.map((p) => (
            <Link key={p.slug} href={`/parts/${category}/${p.slug}`} className="block px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-950 group">
              <div className="flex items-baseline justify-between gap-3">
                <div className="flex-1">
                  <div className="text-sm font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">{p.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5 font-mono">{p.material}</div>
                </div>
                {p.approxPrice && <div className="text-xs font-mono text-slate-600 dark:text-slate-400 shrink-0">{p.approxPrice}</div>}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
