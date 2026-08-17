import Link from "next/link";
import { Container, Section, FeatureCard } from "@/components/Card";
import { INDUSTRIES } from "@/data/industries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Industries" };

export default function IndustriesIndex() {
  return (
    <Section>
      <Container>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Industries</div>
        <h1 className="text-3xl font-semibold tracking-tight">Pre-tuned workflows by industry</h1>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((i) => (
            <FeatureCard key={i.slug} href={`/industries/${i.slug}`} title={i.name} desc={i.tagline} badge={i.certs[0]} gradient={i.color} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
