import { notFound } from "next/navigation";
import Link from "next/link";
import { INTERNATIONAL_CITIES, getIntlCityBySlug } from "@/data/cities-international";
import { Container, Section, Badge } from "@/components/Card";
import { InlineQuoteCta, DisclaimerFooter } from "@/components/Upsell";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export function generateStaticParams() {
  return INTERNATIONAL_CITIES.map((c) => ({ country: c.countrySlug, slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getIntlCityBySlug(slug);
  if (!c) return { title: "City" };
  return {
    title: `Manufacturing in ${c.name}, ${c.country} — Instant Quotes`,
    description: `CNC + 3D printing manufacturing for engineering teams in ${c.name}, ${c.region}. Fast international delivery.`,
  };
}

export default async function IntlCityPage({ params }: { params: Promise<{ country: string; slug: string }> }) {
  const { country, slug } = await params;
  const c = getIntlCityBySlug(slug);
  if (!c) notFound();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "LocalBusiness", name: "3DBuildBot", areaServed: { "@type": "City", name: c.name, addressCountry: c.country } }} />
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono text-slate-500"><Link href="/international" className="text-brand-600 hover:underline">International</Link> · <Link href={`/international/${country}`} className="text-brand-600 hover:underline">{c.country}</Link></div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">Manufacturing in {c.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="brand">{c.region}</Badge>
            <Badge tone="slate">Population {c.pop.toLocaleString()}</Badge>
          </div>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Engineering teams in {c.name} order custom manufactured parts through 3DBuildBot for delivery to any address in {c.country}. Whether you're a startup prototyping a first product or an established manufacturer needing bridge production, our instant-quote engine + partner shop network gets parts to your door in 3–7 business days.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h2 className="text-sm font-semibold mb-3">Local industry context</h2>
              <div className="text-xs font-mono text-slate-500 mb-1">Nearby key industries:</div>
              <div className="flex flex-wrap gap-2">
                {c.nearbyIndustries.map((i) => (
                  <Badge key={i} tone="slate">{i}</Badge>
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Manufacturing needs in {c.name} span these sectors — prototyping components, small-batch production, and bridge tooling for full production.</p>
            </div>
            <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
              <h2 className="text-sm font-semibold mb-2">Shipping to {c.name}</h2>
              <ul className="text-sm space-y-1">
                <li>· DHL Express: 2–4 business days from US</li>
                <li>· FedEx International Priority: 3–5 business days</li>
                <li>· Landed cost pricing (duty + VAT included in quote)</li>
                <li>· Local currency invoicing available</li>
              </ul>
              <Link href="/quote" className="mt-4 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Get an instant quote →</Link>
            </div>
          </div>

          <InlineQuoteCta label={`Start a quote — parts delivered to ${c.name}`} />
          <DisclaimerFooter />
        </Container>
      </Section>
    </>
  );
}
