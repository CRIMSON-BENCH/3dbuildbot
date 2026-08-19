import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security — Trust Center",
  description: "How 3DBuildBot secures customer CAD, orders, payment, and infrastructure. Vulnerability disclosure, controls, and audit posture.",
};

const CONTROLS = [
  { area: "Authentication", items: ["Bcrypt password hashing (cost 12)", "JWT session cookies (HTTP-only, SameSite=Lax, secure in prod)", "Per-IP rate limits on signup + login (5/min)", "2FA available via authenticator app", "SSO (SAML 2.0) for Okta / Azure AD / Google Workspace"] },
  { area: "Authorization", items: ["Role-based access: owner / admin / member / viewer", "Team-scoped data isolation on every DB query", "Per-team ITAR mode (US-persons only, air-gapped storage)", "API keys scoped to specific endpoints (quotes / orders / read-only)"] },
  { area: "Data protection", items: ["TLS 1.3 required (HSTS with 2-year max-age, includeSubDomains, preload)", "Content-Security-Policy with narrow script-src allow-list", "Payment data never touches our servers (Stripe hosted checkout)", "CAD files stored encrypted at rest (AES-256)", "Cookie-consent-gated analytics honor user choice"] },
  { area: "AI safety", items: ["Per-key + per-IP rate limits on every Gemini endpoint", "Global daily Gemini budget kill-switch as belt-and-suspenders", "AI-training scrapers (GPTBot, ClaudeBot, PerplexityBot, etc.) blocked at robots.txt", "Customer CAD never sent for AI training"] },
  { area: "Vulnerability management", items: ["Automated Dependabot PRs weekly (grouped minor/patch, immediate for CVE)", "Manual security audits before each major release", "Responsible-disclosure contact at /.well-known/security.txt (RFC 9116)"] },
  { area: "Availability", items: ["Hosted on Vercel Pro (multi-region edge + Postgres primary)", "Public status page at /status polls /api/health per-component every request", "Automatic Vercel monitoring + external uptime probes"] },
];

const CERTS = [
  { name: "ISO 9001:2015", desc: "Baseline quality management system", status: "Reference" },
  { name: "AS9100D", desc: "Aerospace QMS", status: "Reference" },
  { name: "ITAR", desc: "DDTC controlled-data workflow on request", status: "On request" },
  { name: "DFARS 252.204-7012", desc: "DoD cybersecurity + specialty metals", status: "Compliant" },
  { name: "SOC 2 Type II", desc: "Security + availability audit", status: "In progress" },
  { name: "ISO 13485", desc: "Medical device manufacturing (via partners)", status: "Partner network" },
];

export default function SecurityPage() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">Trust center</div>
        <h1 className="text-4xl font-semibold tracking-tight">Security & compliance</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">How we protect your CAD, orders, payment, and infrastructure. Report a vulnerability at <a href="mailto:security@3dbuildbot.com" className="text-brand-600 hover:underline">security@3dbuildbot.com</a>.</p>

        <h2 className="mt-12 text-2xl font-semibold">Controls</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          {CONTROLS.map((c) => (
            <div key={c.area} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">{c.area}</div>
              <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                {c.items.map((it, i) => <li key={i} className="flex gap-2"><span className="text-brand-500 shrink-0">·</span><span>{it}</span></li>)}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-semibold">Certifications & audits</h2>
        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
          {CERTS.map((c) => (
            <div key={c.name} className="px-5 py-4 flex items-center justify-between gap-3">
              <div className="flex-1">
                <div className="text-sm font-semibold">{c.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{c.desc}</div>
              </div>
              <Badge tone={c.status === "In progress" ? "amber" : "green"}>{c.status}</Badge>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 p-6">
          <h2 className="text-lg font-semibold">Vendor security review packet</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Enterprise buyers can request our detailed vendor security review package: SOC 2 report (when available), penetration test summary, subprocessor list, business continuity plan, and standard MSA/DPA templates.</p>
          <p className="mt-3 text-sm"><a href="mailto:security@3dbuildbot.com?subject=Vendor%20security%20review%20request" className="inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Request packet →</a></p>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold mb-2">Responsible disclosure</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Found a security issue? Please report it privately at <a href="mailto:security@3dbuildbot.com" className="text-brand-600 hover:underline">security@3dbuildbot.com</a> — not in a public GitHub issue or Twitter. We'll acknowledge within 48 hours and coordinate a fix + disclosure window with you.</p>
          <p className="mt-2 text-xs text-slate-500">Contact info also machine-readable at <Link href="/.well-known/security.txt" className="hover:underline">/.well-known/security.txt</Link> (RFC 9116).</p>
        </div>
      </Container>
    </Section>
  );
}
