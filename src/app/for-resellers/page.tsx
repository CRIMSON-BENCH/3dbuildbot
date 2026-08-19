// White-label API landing — pitch Etsy/Shopify sellers on drop-shipping
// 3D-printed parts via our API + Slant 3D backend. Signals demand for the
// external-facing reseller channel before we build the full API tier.
import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section, Badge } from "@/components/Card";

export const metadata: Metadata = {
  title: "White-Label 3D Print API for Etsy & Shopify Sellers | 3DBuildBot",
  description:
    "Drop-ship 3D-printed products to your Etsy or Shopify customers. Our API takes an STL + address, we print + ship in your branding. Under $0.10/cm³, US-based.",
};

const SLABS = [
  { name: "Print-on-demand FDM", rate: "from $0.11/cm³", min: "no minimum" },
  { name: "Same-day dispatch (FDM under 5cm³)", rate: "+$2/unit", min: "" },
  { name: "Custom colors", rate: "included", min: "PLA/PETG/ABS/TPU/ASA" },
  { name: "Your branding on the box", rate: "+$1/order", min: "logo insert" },
];

export default function Page() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">For resellers · Print-on-demand</div>
        <h1 className="text-4xl font-semibold tracking-tight">
          Drop-ship 3D-printed products to your customers.
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Selling on Etsy, Shopify, Amazon Handmade, or your own store? Send us an STL + shipping address via API — we print, package, and ship direct to your customer under your branding. You never touch inventory.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone="brand">US-based printing</Badge>
          <Badge tone="green">Public API, real docs</Badge>
          <Badge tone="slate">No minimum volume</Badge>
        </div>

        <div className="mt-8 grid gap-3">
          {SLABS.map((s) => (
            <div key={s.name} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-sm font-semibold">{s.name}</h2>
                <div className="text-sm font-mono text-brand-600 dark:text-brand-400">{s.rate}</div>
              </div>
              {s.min && <div className="text-xs text-slate-500 mt-0.5">{s.min}</div>}
            </div>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold mb-2">How it works</h2>
            <ol className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-decimal ml-4">
              <li>Sign up + get an API key (self-serve, free)</li>
              <li>POST STL URL + shipping address to /api/v1/reseller/orders</li>
              <li>We charge your card on file at cost + margin</li>
              <li>Part prints + ships in 3-6 days, tracking sent to your webhook</li>
            </ol>
          </div>
          <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-5">
            <h2 className="text-sm font-semibold mb-2">Get early access</h2>
            <p className="text-sm text-slate-700 dark:text-slate-300">Reseller API is in private beta. Tell us about your store + volume, we'll onboard you and set your pricing tier.</p>
            <Link href="/contact?topic=reseller-api" className="mt-3 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">
              Request beta access →
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
