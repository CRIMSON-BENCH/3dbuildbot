import { Container, Section, StatCard } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About 3DBuildBot" };

export default function AboutPage() {
  return (
    <>
      <Section>
        <Container className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Company</div>
          <h1 className="text-4xl font-semibold tracking-tight">On-demand industrial manufacturing for engineering teams.</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            3DBuildBot is on-demand industrial manufacturing for hardware teams — aerospace, defense, robotics, EVs, medical devices, consumer hardware. We collapse the traditional RFQ → PO → NDA → PPAP cycle into a single browser tab: quote in seconds, parts in days, documentation packet in every box.
          </p>
        </Container>
      </Section>
      <Section className="py-6">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard value="New" label="Just launched" sublabel="Building the customer + partner network now" />
            <StatCard value="US" label="Domestic supplier network" />
            <StatCard value="5" label="Processes offered" sublabel="FDM · SLA · SLS · MJF · CNC" />
            <StatCard value="20+" label="Materials available" />
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="max-w-3xl prose-brand">
          <h2>Why we exist</h2>
          <p>Hardware engineering has always been bottlenecked by the manufacturing quote. Weeks of email chains, opaque pricing, and post-order surprises put every hardware team behind schedule. We built 3DBuildBot to give engineers the tool we wished existed when we were on the buyer side: a locked-price quote in seconds, with the material and process math visible.</p>
          <h2>How we work</h2>
          <p>Every part is analyzed client-side in your browser — files never leave until you order. Quotes are backed by real machine time, real material cost, and a locked-price guarantee for 30 days. If our DFM engineers spot an issue during production review, we call you before we cut metal.</p>
          <h2>Where we operate</h2>
          <p>3DBuildBot is US-domiciled. Our supplier network is US-based, and our platform supports the controlled-data workflows aerospace and defense teams require: watermarked previews, per-project audit logs, network-segregated file handling. We are actively pursuing ISO 9001 and AS9100 alignment with our partner shops; specific certifications available on a per-order basis on request. For projects that require ITAR-controlled data handling, contact us before uploading — we'll route through cleared personnel and confirm before you send any files.</p>
        </Container>
      </Section>
    </>
  );
}
