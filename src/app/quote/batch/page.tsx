import { BatchQuoter } from "@/components/BatchQuoter";
import { Container, Section } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Batch / BOM quote" };

export default function BatchQuotePage() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Batch quote</div>
          <h1 className="text-3xl font-semibold tracking-tight">Multi-part &amp; BOM CSV quoting</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Drop a folder of STLs, or upload a BOM CSV — get a single consolidated locked-price quote.</p>
        </div>
        <BatchQuoter />
      </Container>
    </Section>
  );
}
