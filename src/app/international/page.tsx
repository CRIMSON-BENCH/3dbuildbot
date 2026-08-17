import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import { INTERNATIONAL_CITIES, getIntlCountries } from "@/data/cities-international";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `3DBuildBot Ships Worldwide — ${INTERNATIONAL_CITIES.length} International Cities Served`,
  description: "On-demand CNC + 3D printing manufacturing to the UK, EU, Canada, Australia, and Asia. Fast quotes, local delivery, no import hassle.",
};

const COUNTRY_LABELS: Record<string, string> = {
  "united-kingdom": "United Kingdom", "germany": "Germany", "france": "France", "italy": "Italy",
  "spain": "Spain", "netherlands": "Netherlands", "belgium": "Belgium", "switzerland": "Switzerland",
  "sweden": "Sweden", "norway": "Norway", "denmark": "Denmark", "finland": "Finland", "iceland": "Iceland",
  "austria": "Austria", "ireland": "Ireland", "portugal": "Portugal", "poland": "Poland",
  "czech-republic": "Czech Republic", "hungary": "Hungary", "romania": "Romania", "slovakia": "Slovakia",
  "bulgaria": "Bulgaria", "croatia": "Croatia", "slovenia": "Slovenia", "estonia": "Estonia",
  "canada": "Canada", "australia": "Australia", "new-zealand": "New Zealand", "japan": "Japan",
  "singapore": "Singapore", "hong-kong": "Hong Kong", "taiwan": "Taiwan", "south-korea": "South Korea",
  "india": "India", "malaysia": "Malaysia", "thailand": "Thailand", "vietnam": "Vietnam",
  "indonesia": "Indonesia", "philippines": "Philippines", "china": "China",
};

export default function IntlHub() {
  const countries = getIntlCountries();
  return (
    <>
      <Section>
        <Container className="max-w-4xl">
          <Badge tone="brand">International</Badge>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">3DBuildBot Ships Worldwide</h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            On-demand CNC machining, 3D printing, sheet metal, and injection molding delivered to {INTERNATIONAL_CITIES.length} cities across {countries.length} countries. Fast international shipping via DHL Express + FedEx International Priority.
          </p>
        </Container>
      </Section>
      <Section className="py-4">
        <Container className="max-w-4xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {countries.map((c) => {
              const cities = INTERNATIONAL_CITIES.filter((x) => x.countrySlug === c);
              return (
                <Link key={c} href={`/international/${c}`} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-brand-500 transition-colors group">
                  <div className="text-sm font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">{COUNTRY_LABELS[c] ?? c}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{cities.length} cities</div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
