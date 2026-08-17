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
            3DBuildBot has quoted and produced parts for the hardware teams building the next generation of aerospace, defense, robotics, EVs, and medical devices since 2012. We collapsed the traditional RFQ → PO → NDA → PPAP cycle into a single browser tab — quotes in seconds, parts in days, compliance packet in every box.
          </p>
        </Container>
      </Section>
      <Section className="py-6">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard value="2012" label="Founded" sublabel="14 years of continuous operation" />
            <StatCard value="2.4M+" label="Parts delivered" />
            <StatCard value="98" label="Machines online" />
            <StatCard value="99.4%" label="First-pass yield" />
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
          <p>3DBuildBot is US-domiciled. All production runs on ITAR-registered facilities operated by US persons. We hold ISO 9001:2015 certification and align to AS9100D for aerospace flow-down. Defense customers can flag any project ITAR at quote time; that project enters our network-segregated production cell with watermarked previews and per-project audit logs.</p>
        </Container>
      </Section>
    </>
  );
}
