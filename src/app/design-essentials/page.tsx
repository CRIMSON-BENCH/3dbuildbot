import { Container, Section, FeatureCard } from "@/components/Card";
import { PROCESSES } from "@/data/processes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Essentials — Free PDF Guides",
  description: "Engineer-grade DFM guides for FDM, SLS, SLA, MJF, and 5-axis CNC. Free downloadable PDFs, no email required.",
};

export default function DesignEssentialsPage() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Free · No login</div>
        <h1 className="text-3xl font-semibold tracking-tight">Design Essentials</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">One-page technical guide per process — the design rules that separate an ordinary part from an ordering-ready one.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROCESSES.map((p) => (
            <FeatureCard key={p.slug} href={`/api/design-essentials/${p.slug}`} title={`${p.name} Essentials`} desc={`Wall thickness, tolerances, feature resolution, and cost-driver rules for ${p.short}.`} badge="PDF · Auto-gen" gradient={p.color} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
