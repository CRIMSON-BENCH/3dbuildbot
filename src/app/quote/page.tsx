import { QuoteWidget } from "@/components/QuoteWidget";
import { Container, Section } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get an Instant CAD Quote",
  description: "Upload a STEP, STL, or native CAD file. FDM parts ship in 3–6 days from our US supplier network. Files never leave your browser.",
};

export default function QuotePage() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Instant CAD Quote</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Drop your CAD file. Client-side analysis runs in your browser — nothing uploads until you order. Locked-price guarantee for 30 days.</p>
        </div>
        <QuoteWidget />
      </Container>
    </Section>
  );
}
