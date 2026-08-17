import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — What's new at 3DBuildBot",
  description: "Every feature, improvement, and fix. Shipped in public.",
};

interface Entry { date: string; version: string; tag: "release" | "security" | "feature" | "fix" | "content"; title: string; items: string[]; }

const ENTRIES: Entry[] = [
  { date: "2026-08-17", version: "v1.0-beta", tag: "release",
    title: "Beta v1 launch — 4,282 static pages, 650 parts, 2,082 schools, 500 international cities",
    items: [
      "Full SEO empire: 20 materials, 5 processes, 50 guides, 30 glossary terms, 50 puzzles, 25 blog posts",
      "Geographic coverage: 493 US cities, 51 states, 500 international cities across 40 countries",
      "Education tier: 2,082 universities/colleges/community colleges + 20 STEM high schools",
      "Standard parts library: 650 hardware parts with custom-variant quote flow",
      "14 physics/math/machining solvers with real formulas",
      "AI-powered: DFM analysis, material wizard, reverse-engineer from photo (Gemini 2.5)",
      "Full REST API v1 + Onshape OAuth + universal CAD viewer scaffolds",
    ],
  },
  { date: "2026-08-17", version: "v1.0-beta-p1", tag: "security",
    title: "SECURITY: Patched React2Shell CVE-2025-66478 (RCE)",
    items: [
      "Upgraded Next.js 15.1.6 → 15.1.11 via official Vercel-Labs fix tool",
      "Patched 4 CVEs: CVE-2025-66478 (RCE), CVE-2025-55184, CVE-2025-55183, CVE-2025-67779",
      "Content-Security-Policy + HSTS + X-Frame-Options headers added",
      "Cookie-consent-gated analytics (essential-only mode respects choice)",
      "Auto-Dependabot enabled for weekly patches + immediate CVE PRs",
    ],
  },
  { date: "2026-08-17", version: "v1.0-beta-p2", tag: "feature",
    title: "Fairness audit — per-user rate limits on every AI endpoint",
    items: [
      "API v1 /quotes: per-API-key rate limits by plan tier (10/min free → 1000/min enterprise)",
      "Auth endpoints (signup/login): 5/min per IP throttle",
      "Public endpoints (contact/promo/newsletter): 3/min per IP throttle",
      "Global Gemini budget kill-switch as belt-and-suspenders",
      "Anonymous Gemini calls capped at 100 Flash + 5 Vision per IP per day",
    ],
  },
  { date: "2026-08-17", version: "v1.0-beta-p3", tag: "feature",
    title: "Trust + accessibility polish",
    items: [
      "New /faq, /status, /careers, /press, /security pages",
      "Public real-time status page reads /api/health per-component",
      "Skip-to-content link + focus rings (WCAG 2.4.1)",
      "Dynamic OG image (1200×630) generated per-page at edge runtime",
      "RSS 2.0 feed at /blog/rss.xml",
      "Security.txt per RFC 9116 at /.well-known/security.txt",
      "Full-library search at /search",
    ],
  },
];

const TAG_STYLES: Record<Entry["tag"], "brand" | "amber" | "green" | "red" | "slate"> = {
  release: "brand",
  security: "red",
  feature: "green",
  fix: "amber",
  content: "slate",
};

export default function ChangelogPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">Changelog</div>
        <h1 className="text-4xl font-semibold tracking-tight">What's new</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Every feature, improvement, and fix. Shipped in public. <Link href="/blog/rss.xml" className="text-brand-600 hover:underline">RSS</Link></p>

        <div className="mt-10 space-y-8">
          {ENTRIES.map((e, i) => (
            <div key={i} className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
              <div className="absolute w-4 h-4 rounded-full bg-brand-500 -left-[9px] top-1 border-2 border-white dark:border-slate-900" />
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                <Badge tone={TAG_STYLES[e.tag]}>{e.tag}</Badge>
                <span>{e.date}</span>
                <span>·</span>
                <span>{e.version}</span>
              </div>
              <h2 className="text-lg font-semibold mt-2">{e.title}</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                {e.items.map((item, j) => (
                  <li key={j} className="flex gap-2"><span className="text-brand-500 shrink-0">→</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
