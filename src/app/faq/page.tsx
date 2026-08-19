import Link from "next/link";
import { Container, Section } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { InlineQuoteCta } from "@/components/Upsell";
import { FAQ_TOPICS } from "@/data/faq-topics";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Everything About 3DBuildBot Manufacturing",
  description: "Answers to the questions engineering teams ask before their first order — pricing, materials, lead time, ITAR, custom quotes, and how instant quoting actually works.",
};

const FAQ_GROUPS: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: "How ordering works",
    items: [
      { q: "How does instant quoting work?", a: "Upload a STEP, STL, or OBJ file to /quote. Our engine parses geometry client-side (your file never leaves your browser until you commit), extracts volume + bounding box + feature complexity, runs it through our pricing model calibrated on real shop data, and returns a locked-price quote in ~400ms. No engineer review needed for the ~90% of parts that fit the model." },
      { q: "How long does it take to get parts?", a: "FDM (our instant-quote flow): 3–6 business days end-to-end from our US supplier network. Other processes are currently hand-quoted (1 business day for the quote) and typically ship in 7–14 days: SLA 7–10 days, SLS/MJF 7–10 days, CNC 10–14 days, DMLS metal 3D print 14–21 days. Rush production available on request. As we add more direct partner shops, more processes will move to the instant-quote flow." },
      { q: "What CAD formats do you accept?", a: "STEP (.step, .stp), STL (.stl), OBJ (.obj), IGES, and for our universal viewer beta: SLDPRT, CATPART, IPT, JT, X_T via Autodesk Platform Services translation. If you have a proprietary format not listed, export to STEP first — every major CAD tool exports STEP." },
      { q: "Can I order just one part?", a: "Yes. No minimum quantity. Prototype single parts are our specialty. Volume discounts kick in at qty 11+ with steeper breaks at 25, 100, 500, 1000." },
    ],
  },
  {
    heading: "Materials + processes",
    items: [
      { q: "Which materials do you stock?", a: "20 materials with real spec sheets on /materials — 3DP: PLA, PETG, ABS, PC, PA12, PA11, PA-CF, TPU, standard/tough/flexible SLA resins, Ti-64 DMLS. Machining: Aluminum 6061/7075, Stainless 303/304/316L/17-4, Titanium Grade 2/5, Delrin, PEEK, Ultem, Inconel 718." },
      { q: "How do I pick the right material?", a: "Try our AI Material Wizard at /tools/material-wizard. Enter your load, environment, and application; Gemini ranks materials with reasoning. Or browse by property on /materials — sortable by tensile, density, glass transition, cost." },
      { q: "Do you offer 5-axis CNC?", a: "Yes. 5-axis is our default routing for complex geometry. Simple prismatic parts route to 3-axis when it's meaningfully cheaper — the quote engine decides automatically." },
      { q: "Can you machine titanium and Inconel?", a: "Yes. Ti-6Al-4V (Grade 5) and Grade 23 (ELI, medical) both available. Inconel 625 and 718 for high-temp aerospace. Expect 5–15× the machining time vs aluminum — cost is dominated by tool wear on superalloys." },
    ],
  },
  {
    heading: "Pricing + payment",
    items: [
      { q: "How is pricing calculated?", a: "Material cost + machining/print time + finishing + quantity discount + expedite surcharge. Full breakdown shown at quote time. Our pricing model is calibrated on 6+ years of actual shop-completed orders and continuously re-tuned." },
      { q: "What payment methods do you accept?", a: "Credit card (Stripe — Visa, Mastercard, Amex, Discover), ACH bank transfer, wire, and Net-30/60 for approved teams (apply on /dashboard/billing after your first order). PunchOut integrations with Coupa + Ariba for enterprise procurement." },
      { q: "Is there a minimum order?", a: "No minimum. Order 1 part or 10,000." },
      { q: "How do volume discounts work?", a: "Standard ladder: qty 1–10 baseline, 11–25 = 5% off, 26–100 = 10%, 101–500 = 15%, 501–1000 = 20%, 1001+ = 25%. Applies to identical parts in one order." },
    ],
  },
  {
    heading: "ITAR, compliance, quality",
    items: [
      { q: "Do you support ITAR-controlled projects?", a: "3DBuildBot supports controlled-data workflows for ITAR/export-controlled work: US-based routing, watermarked previews, air-gapped file handling, and full access-audit logging. If your project involves ITAR-controlled data, contact us before uploading so we can confirm the routing and personnel qualifications for your specific project. We do not represent that we hold DDTC registration ourselves; controlled-data routing is coordinated with cleared partner facilities on a per-order basis." },
      { q: "Do you provide AS9102 first-article inspection?", a: "Available on request through partner shops that support it. For AS9102 FAI Forms 1/2/3, dimensional inspection reports, and CMM data, flag at quote time or contact us before ordering so we can confirm the partner shop and price the inspection." },
      { q: "Do you support ISO 13485 medical device manufacturing?", a: "Yes for instrument + non-implant components. Certified materials, traceability, sterile-packaged options. Implantable-class requires the OEM's Design History File." },
      { q: "What certifications do you carry?", a: "3DBuildBot itself is a manufacturing marketplace; the certifications on a given order come from the partner shop fulfilling it. We can route to ISO 9001, AS9100, ISO 13485, or NADCAP-certified partners on request — contact us with your program's requirements and we'll confirm partner availability and pricing before you order." },
    ],
  },
  {
    heading: "Delivery + international",
    items: [
      { q: "Do you ship internationally?", a: "Yes, to 500+ cities across 40 countries. See /international for the full list. DHL Express (2–4 days) or FedEx International Priority (3–5 days). Landed cost pricing includes duty + VAT — no surprise fees at customs." },
      { q: "Do you offer weekend or rush production?", a: "Yes — 1-day expedite (+50%), 2-day (+30%), 3-day (+15%), weekend (+$99 flat). Available on FDM, SLA, SLS, MJF, and simple CNC. Complex 5-axis parts case-by-case." },
      { q: "What happens if a part is defective?", a: "Free replacement or full refund. Report within 30 days at /dashboard/orders — attach photos and note the defect. Our QA team reviews within 24h and either ships a replacement or refunds within 3 business days." },
    ],
  },
  {
    heading: "Enterprise + API",
    items: [
      { q: "Do you have a REST API?", a: "Yes. Docs at /api-docs. Bearer-key authenticated, rate-limited per plan (10–1000 requests/min based on subscription). Endpoints for quote, order create, order status, webhooks. Full OpenAPI spec published." },
      { q: "Do you integrate with Onshape / Fusion 360?", a: "Onshape marketplace app is live (right-click any part → 'Get 3DBuildBot quote'). Fusion 360 add-in in beta — email api@3dbuildbot.com for early access." },
      { q: "Can teams share quotes and orders?", a: "Yes. Teams have shared quote history, per-user approval workflows, cost-center tagging, and PunchOut integration with Coupa + Ariba. Enterprise SSO via SAML for Okta / Azure AD / Google Workspace." },
    ],
  },
];

export default function FaqPage() {
  const allItems = FAQ_GROUPS.flatMap((g) => g.items);
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: allItems.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      }} />
      <Section>
        <Container className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">FAQ</div>
          <h1 className="text-4xl font-semibold tracking-tight">Frequently asked questions</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Everything engineering teams ask before their first order. Missing something? <Link href="/contact" className="text-brand-600 hover:underline">Ask us directly →</Link></p>

          {FAQ_GROUPS.map((g) => (
            <div key={g.heading} className="mt-10">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">{g.heading}</h2>
              <div className="space-y-2">
                {g.items.map((it) => (
                  <details key={it.q} className="group rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                    <summary className="cursor-pointer font-medium text-sm group-open:mb-3">{it.q}</summary>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{it.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">Deep-dive by topic ({FAQ_TOPICS.length} topic guides, {FAQ_TOPICS.reduce((n, t) => n + t.groups.reduce((m, g) => m + g.items.length, 0), 0)} answers)</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {FAQ_TOPICS.map((t) => (
                <Link key={t.slug} href={`/faq/topic/${t.slug}`} className="rounded-lg border border-slate-200 dark:border-slate-800 hover:border-brand-500 bg-white dark:bg-slate-900 p-3 block">
                  <div className="text-sm font-medium">{t.title.replace(" FAQ", "")}</div>
                  <div className="mt-0.5 text-xs text-slate-500 line-clamp-1">{t.description}</div>
                </Link>
              ))}
            </div>
          </div>

          <InlineQuoteCta label="Ready? Get an instant quote in seconds" />
        </Container>
      </Section>
    </>
  );
}
