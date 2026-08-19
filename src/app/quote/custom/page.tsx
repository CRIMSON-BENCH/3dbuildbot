// Hand-quote landing for processes that aren't yet on the instant flow
// (SLA, SLS, MJF, CNC, DMLS, sheet metal, injection molding, etc.).
// Routes to the existing /contact form pre-filled with the "custom quote" topic.
import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section, Badge } from "@/components/Card";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Custom Quote — Hand-Priced in 1 Business Day | 3DBuildBot",
  description:
    "For SLA, SLS, MJF, CNC, sheet metal, DMLS, and injection molding — get a firm hand-quote within one business day. No charge until you approve.",
};

const PROCESSES = [
  "SLA (stereolithography)",
  "SLS (selective laser sintering)",
  "MJF (Multi Jet Fusion)",
  "5-Axis CNC machining",
  "3-Axis CNC machining",
  "Sheet metal fabrication",
  "DMLS / metal 3D printing",
  "Injection molding (low-volume + production)",
  "Cast urethane",
  "Vacuum forming",
  "Anodizing, powder coat, plating",
];

export default function Page() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">
          Hand-quoted · 1 business day
        </div>
        <h1 className="text-4xl font-semibold tracking-tight">Custom quote for anything we don't price instantly.</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          FDM is the only process we currently quote and route to fulfillment automatically. For everything else, we hand-price against our partner shops within one business day and route your order manually — no charge until you approve the quote.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">Processes we hand-quote</h2>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              {PROCESSES.map((p) => (
                <li key={p}>· {p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
            <h2 className="text-sm font-semibold mb-3">How it works</h2>
            <ol className="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-decimal ml-4">
              <li>Send us your CAD + specs via the form below.</li>
              <li>We shop it across our partner shops within 1 business day.</li>
              <li>You get a firm, itemized quote by email.</li>
              <li>Approve + pay → we place the order on your behalf.</li>
            </ol>
            <Link
              href="/contact?topic=custom-quote"
              className="mt-4 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium"
            >
              Request a hand-quote →
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge tone="green">No charge until approved</Badge>
          <Badge tone="slate">US-based routing</Badge>
          <Badge tone="brand">1 business day turnaround</Badge>
        </div>

        <div className="mt-10">
          <WaitlistForm />
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Need FDM instead? <Link href="/quote" className="text-brand-600 hover:underline">Get an instant quote →</Link>
        </p>
      </Container>
    </Section>
  );
}
