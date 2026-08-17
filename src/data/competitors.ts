export interface Competitor {
  slug: string;
  name: string;
  url: string;
  tagline: string;
  strengths: string[];
  weaknesses: string[];
  pricingModel: string;
  itar: boolean;
  cnc5Axis: boolean;
  takeRate?: string;
  headline: string;
  weCompare: { feature: string; us: string; them: string; win: "us" | "them" | "tie" }[];
}

const stdFeatures = (them: {
  pricingModel: string;
  itar: boolean;
  cnc5Axis: boolean;
  quoteUx: string;
  api: string;
  punchout: string;
  vault: string;
  learningLibrary: string;
  domesticShip: string;
}) => [
  { feature: "Pricing transparency", us: "Locked-price guarantee, no post-quote rebids", them: them.pricingModel, win: "us" as const },
  { feature: "5-Axis CNC + FDM + SLS + SLA under one PO", us: "✓ All four in one quote", them: them.cnc5Axis ? "✓" : "✗", win: them.cnc5Axis ? ("tie" as const) : ("us" as const) },
  { feature: "ITAR-registered US supply chain", us: "✓ On every quote", them: them.itar ? "✓" : "✗ Not available", win: them.itar ? ("tie" as const) : ("us" as const) },
  { feature: "Instant-quote UX", us: "Client-side CAD, files never leave your browser", them: them.quoteUx, win: "us" as const },
  { feature: "Public API", us: "REST + webhooks in public beta", them: them.api, win: "tie" as const },
  { feature: "PunchOut (Coupa / Ariba)", us: "Coupa integration Q3, Ariba shortly after", them: them.punchout, win: "them" as const },
  { feature: "Part vault + reorder", us: "Included on every account", them: them.vault, win: "tie" as const },
  { feature: "DFM guide library", us: "Growing weekly, AI-augmented", them: them.learningLibrary, win: "them" as const },
  { feature: "Domestic US shipping", us: "1–2 day ground from US facility", them: them.domesticShip, win: "us" as const },
];

export const COMPETITORS: Competitor[] = [
  {
    slug: "xometry",
    name: "Xometry",
    url: "https://xometry.com",
    tagline: "The largest instant-quote manufacturing marketplace",
    pricingModel: "Opaque post-order rebids possible",
    itar: true,
    cnc5Axis: true,
    takeRate: "~39% supplier take rate (Q4 2024, public grievance)",
    headline: "Xometry has scale and full cert stack — but supplier take rate has climbed to ~39%, post-order price rebids happen, and pricing volatility swings ±10% quarter over quarter. 3DBuildBot delivers the same cert stack with locked-price quotes, transparent unit economics, and a focused capability set instead of a 5,000-supplier marketplace.",
    strengths: ["Broadest capability stack", "PunchOut with Coupa/Ariba/SAP", "ITAR + AS9100D + CMMC Level 2", "5,000+ vetted suppliers"],
    weaknesses: ["~39% supplier take rate", "Post-quote AI rebids", "Volatile pricing quarter over quarter", "Auto-generated content depth"],
    weCompare: stdFeatures({
      pricingModel: "Opaque; post-quote rebids possible",
      itar: true,
      cnc5Axis: true,
      quoteUx: "Server-side CAD upload",
      api: "Public API (dev.xometry.com)",
      punchout: "✓ Coupa, Ariba, SAP, MS Dynamics",
      vault: "Teamspace with roles",
      learningLibrary: "Broad, auto-generated feel",
      domesticShip: "US + international via marketplace",
    }),
  },
  {
    slug: "protolabs",
    name: "Protolabs (+ Hubs / Protolabs Network)",
    url: "https://protolabs.com",
    tagline: "In-house factories + Hubs marketplace",
    pricingModel: "Premium; ~11% price increase Q4 2024",
    itar: true,
    cnc5Axis: true,
    headline: "Protolabs owns the fastest quote-to-part lead times (1-day parts) and the industry's most-linked DFM guide library. But you pay for it: comparisons put Protolabs 30–50% above budget alternatives, and their cert stack lacks CMMC and IATF. 3DBuildBot matches Protolabs on speed for FDM/SLS/SLA and undercuts on unit price without losing US-domicile ITAR.",
    strengths: ["1-day parts on FDM/SLA", "Industry's deepest DFM guide library", "ProDesk human application engineers", "In-house US factories"],
    weaknesses: ["30–50% premium vs alternatives", "Prices up ~11% (Q4 2024)", "No CMMC or IATF certification", "Dual-brand confusion (Protolabs vs Hubs)"],
    weCompare: stdFeatures({
      pricingModel: "Premium; +11% Q4 2024",
      itar: true,
      cnc5Axis: true,
      quoteUx: "Server-side CAD upload",
      api: "Not marketed",
      punchout: "Not marketed",
      vault: "Team accounts (Network)",
      learningLibrary: "Deepest DFM library in industry",
      domesticShip: "US in-house + Network global",
    }),
  },
  {
    slug: "fictiv",
    name: "Fictiv",
    url: "https://fictiv.com",
    tagline: "Sourcing-simplified supply chain platform",
    pricingModel: "Instant quote, hidden rate card",
    itar: false,
    cnc5Axis: true,
    headline: "Fictiv has the industry's best BOM tracking, published tolerance tables, and thought-leadership content. But the platform holds ISO 9001 only — ITAR sits at individual supplier centers, and their China exposure disqualifies them for US defense work. 3DBuildBot delivers Fictiv's UX polish on a US-domiciled ITAR-registered supply chain.",
    strengths: ["Best published tolerance tables", "Order tracking + BOM traceability", "Strong thought leadership + case studies", "250+ supplier network"],
    weaknesses: ["Platform ISO 9001 only (no platform-level ITAR)", "China supplier exposure disqualifies defense work", "No public API", "No PunchOut"],
    weCompare: stdFeatures({
      pricingModel: "Instant quote, hidden rates",
      itar: false,
      cnc5Axis: true,
      quoteUx: "Server-side CAD upload",
      api: "Not public",
      punchout: "Not marketed",
      vault: "Fictiv Teams + Parts Library",
      learningLibrary: "Rich case studies, teardowns, podcasts",
      domesticShip: "Global (US + China + India + Japan + Mexico)",
    }),
  },
  {
    slug: "shapeways",
    name: "Shapeways",
    url: "https://shapeways.com",
    tagline: "Post-bankruptcy relaunch; B2B pivot",
    pricingModel: "Instant quote, no published rates",
    itar: false,
    cnc5Axis: false,
    headline: "Shapeways filed Chapter 7 in July 2024. Reborn under original co-founders in late 2024, but the marketplace SEO moat is gone and enterprise buyers are actively hunting for stability. Shapeways only offers 3-axis CNC (no 5-axis). 3DBuildBot delivers the 5-axis capability Shapeways structurally can't, on a US-domiciled operation that's not one bankruptcy away from disappearing.",
    strengths: ["12 3D printing technologies", "Shopify + Etsy integrations for creator storefronts", "ZVerse-partnered design services"],
    weaknesses: ["Chapter 7 in July 2024 damaged enterprise trust", "Lost marketplace SEO moat entirely", "Only 3-axis CNC (no 5-axis)", "Slow quote turnaround relative to instant-CAD players"],
    weCompare: stdFeatures({
      pricingModel: "Instant quote, no published rates",
      itar: false,
      cnc5Axis: false,
      quoteUx: "Server-side upload",
      api: "Public API + Shopify/Etsy",
      punchout: "Not available",
      vault: "Account order history",
      learningLibrary: "Reduced post-bankruptcy",
      domesticShip: "US ship",
    }),
  },
  {
    slug: "fathom",
    name: "Fathom",
    url: "https://fathommfg.com",
    tagline: "US contract manufacturer (NYSE:FATH)",
    pricingModel: "Project-based premium quotes",
    itar: true,
    cnc5Axis: true,
    headline: "Fathom is the toughest US-domestic competitor for defense/aerospace wallets — 8 US facilities, full cert stack (AS9100D + ITAR + NIST 800-171), Tesla / Stryker / Blue Origin logos. But Fathom is a traditional engineer-brokered contract manufacturer; quote cycles are slow and UX lags digital-native platforms. 3DBuildBot matches Fathom's US cert stack with instant-quote UX and self-serve.",
    strengths: ["Full US defense cert stack: AS9100D + ITAR + NIST 800-171", "8 US facilities", "25+ processes under one roof", "Big-logo enterprise references"],
    weaknesses: ["Slow engineer-brokered quote cycle", "UX behind digital-native platforms", "Post-SPAC financial fragility", "No true instant-quote flow"],
    weCompare: stdFeatures({
      pricingModel: "Project quotes, no instant flow",
      itar: true,
      cnc5Axis: true,
      quoteUx: "Engineer-brokered",
      api: "Not marketed",
      punchout: "Enterprise sales-led",
      vault: "Account manager relationship",
      learningLibrary: "Case studies + trade press",
      domesticShip: "US in-house all 8 facilities",
    }),
  },
  {
    slug: "rapiddirect",
    name: "RapidDirect",
    url: "https://rapiddirect.com",
    tagline: "Chinese contract manufacturer, low-cost",
    pricingModel: "Instant quote; ~30–60% below US CNC",
    itar: false,
    cnc5Axis: true,
    headline: "RapidDirect wins on unit price — 30–60% below US CNC shops for aluminum prototypes. But no ITAR, no AS9100, 3–10 day international shipping, and Section 301 tariff exposure eat into that price advantage on defense-adjacent work. 3DBuildBot's US supply chain removes IP risk and tariff exposure and delivers ITAR-eligible parts RapidDirect cannot.",
    strengths: ["100+ materials", "6 factories in Pearl River Delta", "Automated DFM in quote", "IATF 16949 + ISO 13485"],
    weaknesses: ["No ITAR, no AS9100 (defense-blocked)", "Section 301 25% tariff exposure", "3–10 day international shipping + customs", "IP concerns (China jurisdiction)"],
    weCompare: stdFeatures({
      pricingModel: "30–60% below US CNC; +tariffs",
      itar: false,
      cnc5Axis: true,
      quoteUx: "Instant + automated DFM",
      api: "Available",
      punchout: "Not marketed",
      vault: "Teamspace + real-time production tracking",
      learningLibrary: "Long-form blog + case studies",
      domesticShip: "China air freight 3–10 days to US",
    }),
  },
];

export const getCompetitorBySlug = (slug: string) => COMPETITORS.find((c) => c.slug === slug);
export const getAllCompetitorSlugs = () => COMPETITORS.map((c) => c.slug);
