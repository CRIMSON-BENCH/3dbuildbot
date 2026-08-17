import { notFound } from "next/navigation";
import Link from "next/link";
import { INTERNATIONAL_CITIES, getIntlCountries, getIntlCitiesByCountry } from "@/data/cities-international";
import { Container, Section, Badge } from "@/components/Card";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getIntlCountries().map((country) => ({ country }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const cities = getIntlCitiesByCountry(country);
  if (!cities.length) return { title: "Country" };
  const label = cities[0].country;
  return {
    title: `${label} Manufacturing — CNC + 3D Printing Delivered`,
    description: `On-demand CNC machining and 3D printing for engineering teams across ${label}. Fast turnaround, international shipping.`,
  };
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const cities = getIntlCitiesByCountry(country);
  if (!cities.length) notFound();
  const label = cities[0].country;
  return (
    <Section>
      <Container className="max-w-4xl">
        <Link href="/international" className="text-xs text-brand-600">← All countries</Link>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">Manufacturing in {label}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Engineering teams in {label} order CNC-machined, 3D-printed, and sheet-metal parts through 3DBuildBot with delivery in 3–7 business days via DHL Express + FedEx International Priority. Full duty + VAT handling on landed-cost quotes.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          {cities.map((c) => (
            <Link key={c.slug} href={`/international/${country}/${c.slug}`} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 hover:border-brand-500 transition-colors group">
              <div className="text-sm font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">{c.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">{c.region} · Pop {c.pop.toLocaleString()}</div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
