import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SCHOOLS_LARGE, getLargeSchoolBySlug } from "@/data/schools-large";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter, RelatedProducts } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return SCHOOLS_LARGE.filter((s) => s.type === "university" || s.type === "college" || s.type === "community-college").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getLargeSchoolBySlug(slug);
  if (!s) return { title: "University" };
  return {
    title: `3DBuildBot for ${s.name} — Engineering Manufacturing`,
    description: `${s.name} engineering students, research labs, and student teams get $50 free credit and 25% off first orders. .edu email verification.`,
  };
}

export default async function UniversityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getLargeSchoolBySlug(slug);
  if (!s) notFound();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "EducationalOrganization", name: s.name, address: { "@type": "PostalAddress", addressLocality: s.city, addressRegion: s.stateAbbr } }} />
      <Section>
        <Container className="max-w-4xl">
          <Badge tone="brand">Education</Badge>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">3DBuildBot for {s.name}</h1>
          <p className="mt-2 text-slate-500 text-sm">{s.city}, {s.stateAbbr}{s.enrollment ? ` · ${s.enrollment.toLocaleString()} students` : ""}{s.category ? ` · Carnegie ${s.category}` : ""}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {s.hasEngineering && <Badge tone="green">Engineering program</Badge>}
            {s.hasPhD && <Badge tone="brand">PhD-granting</Badge>}
            {s.hasITAR && <Badge tone="red">ITAR-eligible research</Badge>}
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-4">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Student credit</div>
              <div className="text-2xl font-semibold mt-1">$50 free</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">On first quote · verify with .edu email</div>
            </div>
            <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-4">
              <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300">First order discount</div>
              <div className="text-2xl font-semibold mt-1">25% off</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Auto-applies at checkout</div>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Priority queue</div>
              <div className="text-2xl font-semibold mt-1">Free</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">.edu accounts jump non-rush jobs</div>
            </div>
          </div>

          <div className="mt-8 prose-brand max-w-none">
            <h2>Programs and teams supported</h2>
            <p>{s.name}'s engineering students, capstone teams, research labs, and student competition teams (Formula SAE, Solar Car, Rocketry, Robotics) use 3DBuildBot for rapid iteration on brackets, chassis, custom fixtures, and end-of-arm tooling. Faculty labs with grant funding can arrange NET-30 terms for grant-billed orders.</p>
            <h2>How to claim the credit</h2>
            <ol>
              <li>Sign up with your <code>@{s.slug.replace(/-.*/, "")}.edu</code> or similar .edu email</li>
              <li>Verify — you'll get $50 in credit automatically</li>
              <li>Upload your CAD and quote as usual — 25% is applied at checkout</li>
            </ol>
            <h2>For faculty</h2>
            <p>Research labs and departments can apply for NET-30 terms and dedicated capacity blocks. Capstone sponsors get a placement page and monthly billing.</p>
          </div>

          <InlineQuoteCta label={`Sign up with your .edu email`} href={`/signup?school=${s.slug}`} />
          <RelatedProducts context={{ school: s.slug }} />
          <div className="mt-6 text-xs text-slate-500"><Link href="/education/universities" className="text-brand-600 hover:underline">← All universities</Link></div>
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
