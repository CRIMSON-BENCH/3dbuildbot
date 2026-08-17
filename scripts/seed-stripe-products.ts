/**
 * One-run Stripe product seed script.
 * Creates ~85 fixed-price products (subscriptions + catalog + setup fees) from MONETIZATION-PLAN.md.
 * Per-quote dynamic pricing does NOT need Stripe products — those use price_data at checkout.
 *
 * Usage:
 *   1. In .env.local: STRIPE_SECRET_KEY=sk_test_... (or sk_live_...)
 *   2. npm run seed:stripe   (add to package.json scripts: "seed:stripe": "tsx scripts/seed-stripe-products.ts")
 *   3. Or: npx tsx scripts/seed-stripe-products.ts
 *
 * Idempotent: uses `metadata.sku` as the dedupe key. Re-running only creates missing products.
 */

import Stripe from "stripe";

const KEY = process.env.STRIPE_SECRET_KEY;
if (!KEY) { console.error("STRIPE_SECRET_KEY missing. Add to .env.local."); process.exit(1); }
const stripe = new Stripe(KEY);

type ProductDef = {
  sku: string;
  name: string;
  description?: string;
  amountCents: number;
  currency?: string;
  interval?: "month" | "year";
  category: string;
};

const PRODUCTS: ProductDef[] = [
  // === Consumer subscriptions ===
  { sku: "sub-maker-mo", name: "Maker plan (monthly)", amountCents: 1900, interval: "month", category: "subscription", description: "50-part vault · AI DFM auto-reports · priority chat · API 500 quotes/mo" },
  { sku: "sub-maker-yr", name: "Maker plan (annual)", amountCents: 19000, interval: "year", category: "subscription", description: "Two months free · same features as monthly" },
  { sku: "sub-pro-mo", name: "Pro Engineer plan (monthly)", amountCents: 4900, interval: "month", category: "subscription", description: "500-part vault · CAD version diffs · 90-day price lock · team seat · cost-driver heatmap" },
  { sku: "sub-pro-yr", name: "Pro Engineer plan (annual)", amountCents: 49000, interval: "year", category: "subscription" },
  { sku: "sub-family-mo", name: "Family / Studio (3 seats, monthly)", amountCents: 9900, interval: "month", category: "subscription" },
  { sku: "sub-family-yr", name: "Family / Studio (3 seats, annual)", amountCents: 99000, interval: "year", category: "subscription" },

  // === B2B / Team subscriptions ===
  { sku: "sub-team-mo", name: "Team (5 seats, monthly)", amountCents: 19900, interval: "month", category: "subscription" },
  { sku: "sub-team-yr", name: "Team (5 seats, annual)", amountCents: 199000, interval: "year", category: "subscription" },
  { sku: "sub-team-pro-mo", name: "Team Pro (15 seats, monthly)", amountCents: 49900, interval: "month", category: "subscription" },
  { sku: "sub-team-pro-yr", name: "Team Pro (15 seats, annual)", amountCents: 499000, interval: "year", category: "subscription" },
  { sku: "sub-business-mo", name: "Business (monthly)", amountCents: 99900, interval: "month", category: "subscription", description: "API access · PunchOut light · NET-30 terms · SSO · dedicated eng contact" },
  { sku: "sub-business-yr", name: "Business (annual)", amountCents: 999000, interval: "year", category: "subscription" },

  // === Enterprise + ITAR ===
  { sku: "sub-ent-starter", name: "Enterprise Starter", amountCents: 250000, interval: "month", category: "subscription" },
  { sku: "sub-ent-growth", name: "Enterprise Growth", amountCents: 500000, interval: "month", category: "subscription" },
  { sku: "sub-ent-scale", name: "Enterprise Scale", amountCents: 1000000, interval: "month", category: "subscription" },
  { sku: "sub-defense-starter", name: "Defense / ITAR Starter", amountCents: 500000, interval: "month", category: "subscription", description: "Segregated production cell · CMMC-aligned · US-persons operators" },
  { sku: "sub-defense-growth", name: "Defense / ITAR Growth", amountCents: 1000000, interval: "month", category: "subscription" },
  { sku: "sub-defense-enterprise", name: "Defense / ITAR Enterprise", amountCents: 2500000, interval: "month", category: "subscription" },

  // === API tiers ===
  { sku: "api-developer", name: "API Developer (500 quotes/mo)", amountCents: 9900, interval: "month", category: "api" },
  { sku: "api-business", name: "API Business (5,000 quotes/mo)", amountCents: 49900, interval: "month", category: "api" },
  { sku: "api-webhook-addon", name: "API webhook add-on", amountCents: 2900, interval: "month", category: "api" },
  { sku: "api-support", name: "API premium support", amountCents: 29900, interval: "month", category: "api" },

  // === Enterprise integration setup fees ===
  { sku: "int-coupa-setup", name: "Coupa PunchOut setup", amountCents: 250000, category: "setup" },
  { sku: "int-coupa-recurring", name: "Coupa PunchOut recurring", amountCents: 9900, interval: "month", category: "subscription" },
  { sku: "int-ariba-setup", name: "SAP Ariba PunchOut setup", amountCents: 250000, category: "setup" },
  { sku: "int-ariba-recurring", name: "SAP Ariba PunchOut recurring", amountCents: 9900, interval: "month", category: "subscription" },
  { sku: "int-msdynamics-setup", name: "Microsoft Dynamics connector setup", amountCents: 200000, category: "setup" },
  { sku: "int-netsuite-setup", name: "NetSuite SuiteApp setup", amountCents: 150000, category: "setup" },
  { sku: "int-odoo-setup", name: "Odoo connector setup", amountCents: 99900, category: "setup" },
  { sku: "int-sso-saml", name: "SSO / SAML 2.0 configuration", amountCents: 49900, category: "setup" },
  { sku: "int-scim-setup", name: "SCIM auto-provisioning setup", amountCents: 99900, category: "setup" },
  { sku: "int-scim-recurring", name: "SCIM auto-provisioning recurring", amountCents: 4900, interval: "month", category: "subscription" },
  { sku: "int-webhook-custom", name: "Custom procurement webhook setup", amountCents: 99900, category: "setup" },
  { sku: "int-whitelabel-setup", name: "White-label reseller portal setup", amountCents: 500000, category: "setup" },
  { sku: "int-whitelabel-recurring", name: "White-label reseller portal recurring", amountCents: 49900, interval: "month", category: "subscription" },
  { sku: "int-dedicated-capacity", name: "Dedicated production capacity block", amountCents: 499900, interval: "month", category: "subscription" },
  { sku: "int-prodesk", name: "Named application engineer (ProDesk)", amountCents: 199900, interval: "month", category: "subscription" },

  // === Consumer catalog — brackets & standoffs ===
  { sku: "cat-brackets-l-6061", name: "L-brackets 10-pack — Aluminum 6061", amountCents: 3400, category: "catalog" },
  { sku: "cat-brackets-angle", name: "Angle brackets 10-pack", amountCents: 2800, category: "catalog" },
  { sku: "cat-brackets-u", name: "U-brackets 10-pack", amountCents: 3200, category: "catalog" },
  { sku: "cat-brackets-z", name: "Z-brackets 10-pack", amountCents: 3600, category: "catalog" },
  { sku: "cat-standoff-m2", name: "M2 standoff assortment", amountCents: 1900, category: "catalog" },
  { sku: "cat-standoff-m3", name: "M3 standoff assortment", amountCents: 1900, category: "catalog" },
  { sku: "cat-standoff-4-40", name: "4-40 standoff assortment", amountCents: 1900, category: "catalog" },
  { sku: "cat-standoff-6-32", name: "6-32 standoff assortment", amountCents: 1900, category: "catalog" },

  // === Consumer catalog — enclosures ===
  { sku: "cat-enclosure-pi5-pc", name: "Raspberry Pi 5 enclosure — Polycarbonate", amountCents: 1800, category: "catalog" },
  { sku: "cat-enclosure-pi5-pacf", name: "Raspberry Pi 5 enclosure — PA-CF nylon", amountCents: 2800, category: "catalog" },
  { sku: "cat-enclosure-pi-zero", name: "Raspberry Pi Zero 2 enclosure", amountCents: 1400, category: "catalog" },
  { sku: "cat-enclosure-arduino", name: "Arduino Uno / Mega enclosure — PC", amountCents: 2200, category: "catalog" },
  { sku: "cat-enclosure-esp32", name: "ESP32 dev-board enclosure", amountCents: 1600, category: "catalog" },
  { sku: "cat-enclosure-jetson", name: "Jetson Nano enclosure — PA-CF", amountCents: 3200, category: "catalog" },
  { sku: "cat-enclosure-blank-sm", name: "Enclosure blank — small", amountCents: 2200, category: "catalog" },
  { sku: "cat-enclosure-blank-md", name: "Enclosure blank — medium", amountCents: 3200, category: "catalog" },
  { sku: "cat-enclosure-blank-lg", name: "Enclosure blank — large", amountCents: 4800, category: "catalog" },
  { sku: "cat-panel-mount", name: "Panel mount blank (customizable cutouts)", amountCents: 1800, category: "catalog" },

  // === Consumer catalog — camera & drone ===
  { sku: "cat-gopro-mount", name: "GoPro-compatible camera mount", amountCents: 1800, category: "catalog" },
  { sku: "cat-osmo-mount", name: "DJI Osmo camera mount", amountCents: 2200, category: "catalog" },
  { sku: "cat-basler-mount", name: "Industrial Basler ace camera mount", amountCents: 4800, category: "catalog" },
  { sku: "cat-drone-motor-4x28", name: "Drone motor mount — 4x28mm", amountCents: 1800, category: "catalog" },
  { sku: "cat-drone-motor-6x28", name: "Drone motor mount — 6x28mm", amountCents: 2400, category: "catalog" },
  { sku: "cat-drone-arm-5in", name: "Drone arm — 5-inch carbon-fiber-look", amountCents: 2800, category: "catalog" },
  { sku: "cat-drone-arm-7in", name: "Drone arm — 7-inch", amountCents: 3400, category: "catalog" },

  // === Consumer catalog — test coupons + kits ===
  { sku: "cat-coupon-tensile", name: "Test coupon set (tensile ASTM D638)", amountCents: 6500, category: "catalog" },
  { sku: "cat-coupon-compression", name: "Test coupon set (compression)", amountCents: 6500, category: "catalog" },
  { sku: "cat-coupon-flexural", name: "Test coupon set (flexural)", amountCents: 6500, category: "catalog" },
  { sku: "cat-coupon-impact", name: "Test coupon set (impact Izod)", amountCents: 6500, category: "catalog" },
  { sku: "cat-fixture-pack", name: "Prototyping fixture pack — 10 fixtures", amountCents: 8900, category: "catalog" },
  { sku: "cat-vise-jaws", name: "Vise fixture kit — Kurt-style jaws", amountCents: 7900, category: "catalog" },
  { sku: "cat-cable-clips", name: "Cable management pack (10 clips)", amountCents: 2200, category: "catalog" },
  { sku: "cat-grommets", name: "Cable pass-through grommets (25-pack)", amountCents: 1800, category: "catalog" },
  { sku: "cat-hinge-kit", name: "Standard hinge kit — 3 sizes", amountCents: 2800, category: "catalog" },
  { sku: "cat-latch-kit", name: "Standard latch kit — 3 sizes", amountCents: 3200, category: "catalog" },
  { sku: "cat-rack-1u", name: "1U server rack rails", amountCents: 5800, category: "catalog" },
  { sku: "cat-rack-2u", name: "2U server rack rails", amountCents: 6800, category: "catalog" },
  { sku: "cat-chassis-200", name: "Robotics chassis panel — 200mm sq", amountCents: 4200, category: "catalog" },
  { sku: "cat-chassis-300", name: "Robotics chassis panel — 300mm sq", amountCents: 5800, category: "catalog" },
  { sku: "cat-rc-chassis", name: "RC car chassis parts (educational)", amountCents: 8900, category: "catalog" },
  { sku: "cat-stem-starter", name: "STEM classroom maker kit — starter", amountCents: 19900, category: "catalog" },
  { sku: "cat-stem-pro", name: "STEM classroom maker kit — pro", amountCents: 49900, category: "catalog" },
  { sku: "cat-starter-pack", name: "Design starter pack template kit", amountCents: 7900, category: "catalog" },
  { sku: "cat-nozzles-prusa", name: "3D-printed spare nozzles (Prusa MK3)", amountCents: 2400, category: "catalog" },
  { sku: "cat-nozzles-bambu", name: "3D-printed spare nozzles (Bambu)", amountCents: 2800, category: "catalog" },
  { sku: "cat-insert-jig", name: "Standard threaded insert install jig", amountCents: 3400, category: "catalog" },

  // === Education & training ===
  { sku: "edu-dfm-masterclass", name: "DFM Masterclass — video course", amountCents: 19900, category: "education" },
  { sku: "edu-gdt-training", name: "GD&T Fundamentals training", amountCents: 9900, category: "education" },
  { sku: "edu-dfam-cert", name: "Design for Additive Manufacturing certification", amountCents: 29900, category: "education" },
  { sku: "edu-workshop", name: "Live workshop / monthly AMA", amountCents: 7900, category: "education" },
  { sku: "edu-enterprise-training", name: "Enterprise training day (on-site)", amountCents: 249900, category: "education" },
  { sku: "edu-university-license", name: "University-cohort curriculum license", amountCents: 499900, interval: "year", category: "subscription" },

  // === Reports + data ===
  { sku: "data-supplier-report", name: "Supplier capability report — single supplier", amountCents: 9900, category: "reports" },
  { sku: "data-itar-directory", name: "ITAR/AS9100 verified partner directory", amountCents: 4900, interval: "month", category: "subscription" },
  { sku: "data-materials-api", name: "Materials database API access", amountCents: 2900, interval: "month", category: "subscription" },
  { sku: "data-cost-benchmark", name: "Cost benchmarking report — one part", amountCents: 19900, category: "reports" },
  { sku: "data-custom-intel", name: "Custom market intelligence report", amountCents: 49900, category: "reports" },
  { sku: "data-industry-report", name: "Enterprise industry benchmark report", amountCents: 249900, category: "reports" },
  { sku: "data-lme-feed", name: "Live LME metals pricing feed (API)", amountCents: 19900, interval: "month", category: "subscription" },
  { sku: "data-resin-index", name: "Live SLS resin index (API)", amountCents: 9900, interval: "month", category: "subscription" },
  { sku: "data-tensile-single", name: "Real-world tensile test data (per material)", amountCents: 9900, category: "reports" },
  { sku: "data-tensile-library", name: "Full tensile test data library", amountCents: 99900, interval: "year", category: "subscription" },

  // === Marketplace / partner ===
  { sku: "mkt-partner-featured", name: "Partner shop featured placement", amountCents: 49900, interval: "month", category: "subscription" },
  { sku: "mkt-partner-premium", name: "Partner shop premium placement", amountCents: 99900, interval: "month", category: "subscription" },
  { sku: "mkt-jobshop-sponsored", name: "Jobshop marketplace listing (sponsored)", amountCents: 19900, interval: "month", category: "subscription" },
  { sku: "mkt-vendor-verified", name: "Vendor directory verified badge (annual)", amountCents: 49900, interval: "year", category: "subscription" },
  { sku: "mkt-wholesale-10k", name: "Wholesale bulk credits (10K credit pack)", amountCents: 850000, category: "catalog" },
  { sku: "mkt-wholesale-50k", name: "Wholesale bulk credits (50K credit pack)", amountCents: 3750000, category: "catalog" },
  { sku: "mkt-reseller-annual", name: "Reseller / distributor annual license", amountCents: 249900, interval: "year", category: "subscription" },

  // === Advertising / sponsorship ===
  { sku: "ad-newsletter", name: "Newsletter sponsor slot", amountCents: 49900, category: "advertising" },
  { sku: "ad-material-listing", name: "Sponsored material listing in comparisons (monthly)", amountCents: 29900, interval: "month", category: "subscription" },
  { sku: "ad-directory-featured", name: "Featured job on machinist directory", amountCents: 9900, category: "advertising" },
  { sku: "ad-trade-show", name: "Trade-show booth co-sponsorship", amountCents: 250000, category: "advertising" },
  { sku: "ad-podcast", name: "Podcast sponsorship — one episode", amountCents: 150000, category: "advertising" },
];

async function findExistingBySku(sku: string): Promise<Stripe.Product | null> {
  const list = await stripe.products.search({ query: `metadata['sku']:'${sku}' AND active:'true'` });
  return list.data[0] ?? null;
}

async function main() {
  console.log(`Seeding ${PRODUCTS.length} Stripe products...`);
  let created = 0;
  let skipped = 0;
  for (const p of PRODUCTS) {
    const existing = await findExistingBySku(p.sku);
    if (existing) { skipped++; console.log(`  skip ${p.sku} (already exists)`); continue; }
    const product = await stripe.products.create({
      name: p.name,
      description: p.description,
      metadata: { sku: p.sku, category: p.category },
      tax_code: p.category === "catalog" ? "txcd_99999999" : undefined,
    });
    await stripe.prices.create({
      product: product.id,
      unit_amount: p.amountCents,
      currency: p.currency ?? "usd",
      recurring: p.interval ? { interval: p.interval } : undefined,
    });
    created++;
    console.log(`  ✓ ${p.sku} — ${p.name}`);
  }
  console.log(`Done. Created ${created}, skipped ${skipped} existing.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
