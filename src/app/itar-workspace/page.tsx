import Link from "next/link";
import { Container, Section, Badge, FeatureCard } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "ITAR Workspace" };

export default function ItarPage() {
  return (
    <>
      <Section>
        <Container className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3"><Badge tone="red">Defense-Grade</Badge><Badge tone="brand">CMMC-aligned</Badge><Badge tone="green">ITAR-Registered</Badge></div>
          <h1 className="text-4xl font-semibold tracking-tight">The ITAR workspace built for defense-adjacent hardware teams.</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Flag any project ITAR at quote time and it enters our network-segregated production cell. US-persons operators only, watermarked previews, per-project audit logs, DFARS-compliant metal sourcing, and locked storage on US soil.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/contact" className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium">Talk to security team</Link>
            <Link href="/signup" className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 font-medium">Enable on my account</Link>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard title="Network-segregated cell" desc="ITAR-flagged jobs route to a physically and logically separated production cell. Not co-mingled with commercial work." badge="Infrastructure" />
            <FeatureCard title="US-persons operators" desc="Every operator, engineer, and QA on ITAR-flagged jobs is verified as a US Person under 22 CFR § 120.15." badge="Personnel" />
            <FeatureCard title="Watermarked previews" desc="CAD previews rendered in the workspace carry per-viewer watermarks. Downloads disabled by default." badge="Data protection" />
            <FeatureCard title="Per-project audit log" desc="Every access, view, quote, and download is logged with user, IP, and timestamp. Export any time." badge="Compliance" />
            <FeatureCard title="DFARS metal sourcing" desc="Titanium, superalloys, and specialty stainless sourced only from qualifying-country mills per DFARS 252.225-7009." badge="Materials" />
            <FeatureCard title="Signed NDA per project" desc="e-sign a project-scoped NDA at quote submission. Auto-tied to the quote and order records." badge="Legal" />
          </div>
        </Container>
      </Section>
      <Section className="bg-slate-950 text-white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-semibold">What we don't do</h2>
          <p className="mt-3 text-slate-300">3DBuildBot is a manufacturing services provider, not a licensed defense broker. We do not export defense articles, do not handle classified information, and do not accept work that requires a facility clearance beyond ITAR registration + CMMC L2 alignment. For classified work, contact us to route to a partner facility with the appropriate authorization.</p>
        </Container>
      </Section>
    </>
  );
}
