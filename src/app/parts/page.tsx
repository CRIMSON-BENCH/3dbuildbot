import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import { STANDARD_PARTS, CATEGORY_LABELS, getAllPartCategories } from "@/data/standard-parts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Standard Parts Library — Hardware Catalog + Custom Variant Quotes",
  description: "Free downloadable CAD for standard fasteners, bearings, motors, inserts, and linear-motion hardware. Need a custom variant? Quote in seconds.",
};

export default function PartsIndex() {
  const cats = getAllPartCategories();
  return (
    <>
      <Section>
        <Container className="max-w-4xl">
          <Badge tone="brand">Standard parts library</Badge>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Free CAD for {STANDARD_PARTS.length}+ standard hardware parts</h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Bolts, bearings, motors, standoffs, inserts, linear motion. Real specs, real datasheets. Need a custom variant of any of these — different length, bore, material, mounting? Upload a modified CAD and get a locked-price quote in seconds.
          </p>
        </Container>
      </Section>
      <Section className="py-4">
        <Container className="max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cats.map((cat) => {
              const parts = STANDARD_PARTS.filter((p) => p.category === cat);
              return (
                <Link key={cat} href={`/parts/${cat}`} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-500 transition-colors group">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">{parts.length} parts</div>
                  <h3 className="text-lg font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">{CATEGORY_LABELS[cat].label}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{CATEGORY_LABELS[cat].description}</p>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
