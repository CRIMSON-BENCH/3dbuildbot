import { Container, Section } from "@/components/Card";
import { CostEstimator } from "@/components/CostEstimator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instant Cost Estimator (no login)",
  description: "Rough cost estimate for FDM, SLS, SLA, MJF, and 5-axis CNC parts from dimensions alone. No CAD upload required. Free tool.",
};

export default function CostEstimatorPage() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Free tool · no login · no CAD</div>
        <h1 className="text-3xl font-semibold tracking-tight">Instant Cost Estimator</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Rough cost from dimensions alone. Real math from our quote engine. For a locked-price quote, upload the CAD file.</p>
        <div className="mt-8"><CostEstimator /></div>
      </Container>
    </Section>
  );
}
