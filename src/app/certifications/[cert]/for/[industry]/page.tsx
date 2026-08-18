// Certification × Industry — 5 certs × 6 industries = 30 pages.
// URL: /certifications/as9100/for/aerospace-defense
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CERTIFICATIONS } from "@/data/certifications";
import { INDUSTRIES } from "@/data/industries";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";

export function generateStaticParams() {
  const combos: { cert: string; industry: string }[] = [];
  for (const c of CERTIFICATIONS) for (const i of INDUSTRIES) combos.push({ cert: c.slug, industry: i.slug });
  return combos;
}

export async function generateMetadata({ params }: { params: Promise<{ cert: string; industry: string }> }): Promise<Metadata> {
  const { cert, industry } = await params;
  const c = CERTIFICATIONS.find((x) => x.slug === cert);
  const i = INDUSTRIES.find((x) => x.slug === industry);
  if (!c || !i) return { title: "Certification × Industry" };
  return {
    title: `${c.name} Manufacturing for ${i.name} — Compliant Parts On-Demand | 3DBuildBot`,
    description: `${c.name}-compliant manufacturing for ${i.name} engineering teams. Full CoC, material certs, and audit-ready documentation on every order.`,
  };
}

export default async function Page({ params }: { params: Promise<{ cert: string; industry: string }> }) {
  const { cert, industry } = await params;
  const c = CERTIFICATIONS.find((x) => x.slug === cert);
  const i = INDUSTRIES.find((x) => x.slug === industry);
  if (!c || !i) notFound();

  const relevant = i.certs.includes(c.short) || i.certs.includes(c.name);

  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="text-xs font-mono text-slate-500">
          <Link href={`/certifications/${c.slug}`} className="text-brand-600 hover:underline">{c.name}</Link> ·{" "}
          <Link href={`/industries/${i.slug}`} className="text-brand-600 hover:underline">{i.name}</Link>
        </div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
          {c.name} manufacturing for {i.name}
        </h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="brand">{c.short}</Badge>
          <Badge>{i.name}</Badge>
          {relevant && <Badge tone="green">Industry-standard</Badge>}
        </div>

        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {i.name} programs require {c.name} compliance because {c.scope.toLowerCase()} maps directly to the risk profile the sector accepts. 3DBuildBot's supplier network is qualified against {c.short} and delivers full documentation packets — CoC, mill certs, FAI when required — on every order, without a separate documentation fee.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">{c.name} coverage</h2>
            <dl className="text-xs space-y-2">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <dt className="text-slate-500 font-mono">Authority</dt>
                <dd className="mt-0.5">{c.authority}</dd>
              </div>
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <dt className="text-slate-500 font-mono">Scope</dt>
                <dd className="mt-0.5">{c.scope}</dd>
              </div>
              <div>
                <dt className="text-slate-500 font-mono">Documents included</dt>
                <dd className="mt-0.5">{c.documentsIncluded.join(", ")}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-3">{i.name} — typical needs</h2>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <li><span className="font-mono text-slate-500">Processes: </span>{i.processes.slice(0, 4).join(", ")}</li>
              <li><span className="font-mono text-slate-500">Materials: </span>{i.materials.slice(0, 4).join(", ")}</li>
              <li><span className="font-mono text-slate-500">Certs stack: </span>{i.certs.join(", ")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
          <h2 className="text-sm font-semibold mb-2">What a compliant {i.name.toLowerCase()} order includes</h2>
          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <li>· Certificate of Conformance (CoC) with lot traceability</li>
            <li>· Material test reports (CMTRs) traced to melt</li>
            <li>· Dimensional inspection report (CMM or laser)</li>
            <li>· First Article Inspection (FAI) per AS9102 when required</li>
            <li>· {c.short}-aligned process controls at partner shop</li>
          </ul>
        </div>

        <InlineQuoteCta label={`Quote a ${c.short}-compliant part for ${i.name.toLowerCase()}`} />
        <DisclaimerFooter />
      </Container>
    </Section>
  );
}
