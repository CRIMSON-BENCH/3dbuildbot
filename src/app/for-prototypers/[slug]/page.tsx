import { notFound } from "next/navigation";
import Link from "next/link";
import { PERSONAS, getPersonaBySlug } from "@/data/personas";
import { Container, Section, Badge, StatCard, FeatureCard } from "@/components/Card";
import { InlineQuoteCta, RelatedProducts, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export function generateStaticParams() { return PERSONAS.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPersonaBySlug(slug);
  if (!p) return { title: "For prototypers" };
  return { title: `Manufacturing for ${p.name}`, description: p.tagline };
}

export default async function PersonaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPersonaBySlug(slug);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: `Manufacturing for ${p.name}`, description: p.hero, audience: { "@type": "Audience", audienceType: p.audience } }} />
      <Section className="pt-14">
        <Container className="max-w-4xl">
          <Badge tone="brand">For {p.name}</Badge>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">{p.tagline}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{p.hero}</p>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link href="/quote" className="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium">Get instant quote →</Link>
            <Link href={p.slug === "students" ? "/for-education" : "/signup"} className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 font-medium">{p.cta}</Link>
          </div>
          {p.socialProof && <div className="mt-4 text-xs font-mono uppercase tracking-widest text-slate-500">{p.socialProof}</div>}
        </Container>
      </Section>

      <Section className="py-8">
        <Container>
          <div className="grid sm:grid-cols-3 gap-3">
            <StatCard value="2–7 days" label="Ship time" sublabel="Domestic US ground" />
            <StatCard value={p.pricingHook.split(" ")[0]} label="Starting price" sublabel="Real part, not a sample" />
            <StatCard value="1" label="Minimum quantity" sublabel="Prototype at scale = 1" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <h2 className="text-2xl font-semibold tracking-tight">What you're probably struggling with</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {p.painPoints.map((pt) => (
              <li key={pt} className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✕</span>{pt}</li>
            ))}
          </ul>

          <h2 className="mt-10 text-2xl font-semibold tracking-tight">Common orders from {p.name}</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {p.useCases.map((u) => (
              <div key={u.title} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                <div className="text-sm font-semibold">{u.title}</div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{u.body}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-semibold tracking-tight">Preferred processes + materials for {p.name}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.processes.map((pr) => <Badge key={pr} tone="brand">{pr}</Badge>)}
            {p.materials.map((m) => <Badge key={m} tone="slate">{m}</Badge>)}
          </div>
        </Container>
      </Section>

      <InlineQuoteCta label={p.cta} href="/quote" />
      <RelatedProducts context={{ industry: p.slug }} />
      <DisclaimerFooter />
    </>
  );
}
