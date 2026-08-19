import Link from "next/link";
import { Container, Section, Badge, StatCard, FeatureCard } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Hardware Prototypers — Ship v1 in a Week, Iterate Weekly",
  description: "First prototype in 2 days. Locked-price quote in seconds. No minimum order. From napkin sketch to shipped part without emailing suppliers.",
};

export default function ForPrototypersHub() {
  return (
    <>
      <Section className="pt-14">
        <Container className="max-w-4xl">
          <Badge tone="green">For prototypers · No MOQ · No sales calls</Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">Get your first prototype in 2 days. Iterate weekly. No emails to suppliers.</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            You're building something new. You need a real physical part in your hands by end of week — not next month after five email threads and a 40-page RFQ. 3DBuildBot was built for exactly this: drop a STEP file, get an instant FDM quote in seconds, ship in 3–6 days from our US supplier network. Other processes (SLA, SLS, CNC, metal) are hand-quoted in 1 business day.
          </p>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link href="/quote" className="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium">Get instant quote →</Link>
            <Link href="/signup" className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 font-medium">Free account (unlimited quotes)</Link>
            <Link href="/tools/cost-estimator" className="px-6 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium">Cost estimator (no login)</Link>
          </div>
        </Container>
      </Section>

      <Section className="py-8">
        <Container>
          <div className="grid sm:grid-cols-4 gap-3">
            <StatCard value="3–6 days" label="FDM prototype end-to-end" sublabel="US supplier network" />
            <StatCard value="$18" label="Starting quote" sublabel="Real part, not a sample" />
            <StatCard value="1" label="Minimum quantity" sublabel="No MOQ, ever" />
            <StatCard value="30 days" label="Price lock" sublabel="Quote today, order Friday" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Who this is for</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard href="/for-prototypers/hardware-startups" title="Hardware startups" desc="Pre-seed to Series A. Weekly bracket iterations, enclosure prototypes, PCB standoffs, sensor mounts." badge="Startups" gradient="from-brand-500/15 to-brand-500/5" />
            <FeatureCard href="/for-prototypers/students" title="Engineering students" desc="Capstone projects, Formula SAE, Solar Car, Rocketry. $50 free credit + 25% off first order with .edu email." badge="Students" gradient="from-emerald-500/15 to-emerald-500/5" />
            <FeatureCard href="/for-prototypers/indie-makers" title="Indie makers + creators" desc="One-off custom parts, personal projects, gifts, tools. FDM PLA from $18. Ships in 2 days." badge="Makers" gradient="from-violet-500/15 to-violet-500/5" />
            <FeatureCard href="/for-prototypers/hardware-founders" title="First-time hardware founders" desc="Don't have a manufacturing engineer yet? Our AI DFM catches issues before you hit Order." badge="Founders" gradient="from-amber-500/15 to-amber-500/5" />
            <FeatureCard href="/for-prototypers/yc-companies" title="YC + accelerator companies" desc="Startup school playbook: MVP hardware in 8 weeks. We're the fastest way to prototype without hiring a supplier." badge="Accelerators" gradient="from-rose-500/15 to-rose-500/5" />
            <FeatureCard href="/for-prototypers/product-designers" title="Product designers + agencies" desc="Physical models for pitch decks, dimensional mockups for user testing, hero shots for renders. SLA high-detail from $22." badge="Design" gradient="from-cyan-500/15 to-cyan-500/5" />
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-950">
        <Container className="max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">The prototyper workflow — from napkin sketch to shipped part</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: "Mon", h: "Sketch your part in Fusion / Onshape", b: "Or reverse-engineer from photos with our Gemini Vision tool — no CAD required." },
              { n: "Mon", h: "Drop STEP into the quote page", b: "Client-side analysis. Locked price in 4 seconds. Files never upload until you order." },
              { n: "Tue", h: "Hit Order + pay", b: "Stripe checkout. Same-day production start. Text notifications on ship." },
              { n: "Thu", h: "Part arrives", b: "Test it. It doesn't work. Fix the CAD. Requote in 2 seconds. Rev B ships Monday." },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <div className="text-[11px] font-mono tracking-widest text-brand-600 dark:text-brand-400">{s.n}</div>
                <h3 className="mt-2 text-base font-semibold">{s.h}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Why prototypers pick 3DBuildBot</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {[
              { h: "No sales calls", b: "Ever. Everything self-serve. No Calendly, no discovery call, no 'let me connect you with a rep.'" },
              { h: "Real geometry parsing", b: "Drop your actual STEP file. Our client-side WASM parses it and gives you a locked price. Not a range, not an estimate — a real quote." },
              { h: "AI DFM before you order", b: "Gemini flags thin walls, escape holes, tool-access issues before you cut metal. Junior-engineer safety net." },
              { h: "5 processes in one PO", b: "Prototype in FDM Monday. Order the machined production version Wednesday. Same login, same cart." },
              { h: "Twenty real materials", b: "PLA to titanium. Real datasheet values on every page. No 'nylon-like' marketing fluff." },
              { h: "Rev fast, rev cheap", b: "Volume discounts start at 5 units. Free re-quote on any CAD change. Price lock 30 days." },
            ].map((f, i) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <h3 className="text-base font-semibold">{f.h}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <InlineQuoteCta label="Ready to prototype? Get an instant quote." />
      <DisclaimerFooter />
    </>
  );
}
