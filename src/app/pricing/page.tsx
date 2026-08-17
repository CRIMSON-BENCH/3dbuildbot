import Link from "next/link";
import { Container, Section, PriceCard } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pricing", description: "Transparent per-part pricing plus buyer subscription plans. Materials from $0.15/cm³ · CNC from ±0.025 mm." };

export default function PricingPage() {
  return (
    <>
      <Section>
        <Container className="text-center max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Pricing</div>
          <h1 className="text-4xl font-semibold tracking-tight">Per-part pricing that never rebids. Team plans that pay for themselves.</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Every quote is locked for 30 days. Volume discounts up to 40% at 500+ units. Enterprise MSA, PunchOut, and dedicated capacity available on the Business tier.</p>
        </Container>
      </Section>
      <Section className="py-4">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <PriceCard tier="Free" price="$0" cadence="mo" features={["Unlimited instant quotes", "5-part vault", "Public API tier (10 quotes/mo)", "Community support"]} cta="Start free" href="/signup" />
            <PriceCard tier="Maker" price="$19" cadence="mo" features={["50-part vault", "AI DFM auto-reports", "Priority chat", "Public API (500 quotes/mo)"]} cta="Upgrade" href="/signup" />
            <PriceCard highlight tier="Pro" price="$49" cadence="mo" features={["500-part vault", "CAD version diffs", "90-day price lock", "Team seat included", "Cost-driver heatmap"]} cta="Start Pro" href="/signup" />
            <PriceCard tier="Business" price="$499" cadence="mo" features={["Unlimited vault", "PunchOut light (Coupa)", "NET-30 terms", "SSO / SAML", "Dedicated eng contact"]} cta="Contact sales" href="/contact" />
          </div>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 dark:bg-slate-900 text-white p-8">
              <div className="text-xs font-mono uppercase tracking-widest text-brand-400 mb-2">Enterprise</div>
              <h3 className="text-2xl font-semibold">Custom · from $2,500/mo</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>· PunchOut with Coupa / Ariba / SAP / MS Dynamics</li>
                <li>· Framework agreement + dedicated capacity reservation</li>
                <li>· Named application engineer (ProDesk equivalent)</li>
                <li>· Custom MSA / DPA / SOC-2 addenda</li>
                <li>· Quarterly business reviews</li>
              </ul>
              <Link href="/contact" className="mt-6 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-sm font-medium">Talk to sales →</Link>
            </div>
            <div className="rounded-2xl border border-red-800 bg-slate-950 dark:bg-slate-900 text-white p-8">
              <div className="text-xs font-mono uppercase tracking-widest text-red-400 mb-2">Defense · ITAR</div>
              <h3 className="text-2xl font-semibold">Custom · from $5,000/mo</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>· ITAR-registered US-only production cell</li>
                <li>· CMMC-aligned workspace, watermarked previews</li>
                <li>· AS9100D + DFARS material sourcing</li>
                <li>· Signed NDA per project</li>
                <li>· US-persons operator verification at every station</li>
              </ul>
              <Link href="/contact" className="mt-6 inline-block px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-medium">Talk to sales →</Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
