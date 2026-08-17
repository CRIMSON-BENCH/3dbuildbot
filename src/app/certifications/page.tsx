import Link from "next/link";
import { Container, Section, FeatureCard } from "@/components/Card";
import { CERTIFICATIONS } from "@/data/certifications";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Certifications" };

export default function CertsIndex() {
  return (
    <Section>
      <Container>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Compliance</div>
        <h1 className="text-3xl font-semibold tracking-tight">Certifications & standards</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">The certifications behind every 3DBuildBot quote and shipment.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((c) => (
            <FeatureCard key={c.slug} href={`/certifications/${c.slug}`} title={c.name} desc={c.overview.slice(0, 160) + "…"} badge={c.short} gradient={c.color} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
