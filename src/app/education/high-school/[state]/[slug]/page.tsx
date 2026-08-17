import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SCHOOLS_LARGE, getLargeSchoolBySlug } from "@/data/schools-large";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return SCHOOLS_LARGE.filter((s) => s.type === "high-school").map((s) => ({ state: s.stateAbbr.toLowerCase(), slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getLargeSchoolBySlug(slug);
  if (!s) return { title: "High School" };
  return {
    title: `3DBuildBot for ${s.name} — STEM & Engineering Support`,
    description: `${s.name} FIRST Robotics teams, engineering pathway students, and STEM programs get free credit and student pricing.`,
  };
}

export default async function HSPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getLargeSchoolBySlug(slug);
  if (!s || s.type !== "high-school") notFound();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "HighSchool", name: s.name, address: { "@type": "PostalAddress", addressLocality: s.city, addressRegion: s.stateAbbr } }} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono text-slate-500"><Link href="/education/universities" className="text-brand-600 hover:underline">Education</Link> · High Schools · {s.stateAbbr}</div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{s.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="brand">{s.category ?? "High School"}</Badge>
            <Badge>{s.city}, {s.stateAbbr}</Badge>
            {s.enrollment && <Badge tone="slate">{s.enrollment.toLocaleString()} students</Badge>}
          </div>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Building engineering skills at {s.name}? FIRST Robotics teams, engineering pathway students, and PLTW programs use 3DBuildBot for CNC-machined competition parts, SLS-printed robot components, and prototype hardware — faster than the school's shop can turn parts and often cheaper.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-2">Student pricing</div>
              <ul className="text-sm space-y-1">
                <li>· $25 free credit on your first order</li>
                <li>· 20% off all student-signed orders (with adviser co-approval)</li>
                <li>· No minimum order — one bracket is fine</li>
                <li>· 3-day turnaround on FDM/SLA prints</li>
              </ul>
              <Link href="/signup?edu=1" className="mt-4 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Sign up with student email →</Link>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Perfect for</h2>
              <ul className="text-sm space-y-1">
                <li>· FIRST Robotics (FRC / FTC) competition brackets, gearboxes, wheels</li>
                <li>· PLTW Engineering Design Development capstone parts</li>
                <li>· Baja / Solar Car / SAE Aero prototypes</li>
                <li>· AP Research physical prototypes</li>
                <li>· Maker Space individual student projects</li>
                <li>· Rocketry payload housings and fins</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">How to get parts fast</h2>
            <ol className="text-sm space-y-2 list-decimal list-inside">
              <li>Design in Fusion 360, Onshape, or Solidworks (all free for students)</li>
              <li>Upload the STEP or STL to 3DBuildBot — get an instant quote in seconds</li>
              <li>Choose material — PLA for concept, PETG for durable, aluminum for competition parts</li>
              <li>Your adviser co-approves the order (school payment method or student card)</li>
              <li>Parts arrive in 2–7 days depending on process</li>
            </ol>
          </div>

          <InlineQuoteCta label="Start a quote for your team's next competition part" />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
