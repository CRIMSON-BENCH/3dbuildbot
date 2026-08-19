// Design services landing — offer paid CAD + DFM engineering work with
// a real form → routes to /contact for human intake. Adds a services tier
// beyond the existing manufacturing marketplace revenue.
import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section, Badge } from "@/components/Card";

export const metadata: Metadata = {
  title: "CAD Design + DFM Engineering Services — $75/hr | 3DBuildBot",
  description:
    "Hire a manufacturing engineer to model your part, review your CAD for DFM issues, or design a full assembly. Ships from prototype to production-ready.",
};

const SERVICES = [
  { name: "CAD modeling from sketch/reference", rate: "$75/hr", min: "2 hr", desc: "Send a sketch or a reference photo — get back a production-ready STEP file." },
  { name: "DFM review + revision", rate: "$75/hr", min: "1 hr", desc: "Upload your CAD and we mark it up with manufacturability issues + fixes." },
  { name: "Full assembly design", rate: "$95/hr", min: "8 hr", desc: "Housing + mounts + fasteners + BOM. From napkin sketch to shippable design." },
  { name: "Reverse-engineering from a physical part", rate: "$150/hr", min: "4 hr", desc: "Send us a part; we model + tolerance it. Photos + measurements accepted." },
];

export default function Page() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Design services</div>
        <h1 className="text-4xl font-semibold tracking-tight">Hire an engineer to design or fix your part.</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Sometimes the CAD isn't there yet. Our engineers do CAD modeling, DFM review, full mechanical design, and reverse-engineering — hourly, transparent, US-based.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="brand">Fixed-scope quotes on request</Badge>
          <Badge tone="green">NDA on file for every project</Badge>
          <Badge tone="slate">Ships to /quote for manufacturing when done</Badge>
        </div>

        <div className="mt-8 grid gap-3">
          {SERVICES.map((s) => (
            <div key={s.name} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h2 className="text-base font-semibold">{s.name}</h2>
                <div className="text-sm font-mono text-brand-600 dark:text-brand-400">{s.rate} · min {s.min}</div>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-6">
          <h2 className="text-lg font-semibold">Get a fixed-scope quote</h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">Describe your project and we'll email a fixed quote within one business day.</p>
          <Link href="/contact?topic=design-services" className="mt-3 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">
            Request a design quote →
          </Link>
        </div>
      </Container>
    </Section>
  );
}
