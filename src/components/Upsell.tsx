// Contextual monetization surfaces — designed to be helpful, not spam.
// Each variant shows ONLY 2–3 relevant CTAs based on the page context.
import Link from "next/link";
import { Badge } from "./Card";

export function RelatedProducts({ context }: { context: { material?: string; process?: string; industry?: string; school?: string; city?: string } }) {
  const cards: { href: string; label: string; sub: string; tone?: "brand" | "green" }[] = [];

  if (context.material) {
    cards.push({ href: `/quote?material=${context.material}`, label: `Quote a part in ${context.material}`, sub: "Locked price in 4 seconds", tone: "brand" });
    cards.push({ href: `/tools/material-wizard`, label: "Not sure? Try the material wizard", sub: "Gemini-ranked alternates" });
  }
  if (context.process) {
    cards.push({ href: `/quote?process=${context.process}`, label: `Get a ${context.process.toUpperCase()} quote`, sub: "Instant CAD analysis" });
    cards.push({ href: `/api/design-essentials/${context.process}`, label: `${context.process.toUpperCase()} Design Essentials PDF`, sub: "Free · no email required" });
  }
  if (context.industry) {
    cards.push({ href: `/quote?industry=${context.industry}`, label: `Start a project for ${context.industry.replace(/-/g, " ")}`, sub: "Verified customer references" });
    cards.push({ href: `/book-a-call`, label: "Talk to an application engineer", sub: "30-min consult · free", tone: "green" });
  }
  if (context.school) {
    cards.push({ href: `/for-education?school=${context.school}`, label: "Claim your student credit", sub: "$50 free with .edu email" });
    cards.push({ href: `/tools/tolerance-calculator`, label: "Free tolerance stack calculator", sub: "Monte-Carlo Cpk analysis" });
  }
  if (context.city) {
    cards.push({ href: `/quote`, label: `Ship to ${context.city} in 2–7 days`, sub: "Domestic US shipping · locked price" });
    cards.push({ href: `/tools/cost-estimator`, label: "Rough cost estimate", sub: "No CAD upload · free" });
  }

  if (cards.length === 0) return null;
  return (
    <div className="mt-8 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-950/20 p-5">
      <div className="text-xs font-mono uppercase tracking-widest text-brand-700 dark:text-brand-300 mb-3">Recommended for this page</div>
      <div className="grid sm:grid-cols-2 gap-2">
        {cards.slice(0, 3).map((c) => (
          <Link key={c.href + c.label} href={c.href} className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 hover:border-brand-500 transition-colors group">
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400">{c.label}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{c.sub}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function InlineQuoteCta({ label = "Get a locked-price quote", href = "/quote", tone = "brand" }: { label?: string; href?: string; tone?: "brand" | "dark" }) {
  return (
    <div className={`mt-6 rounded-lg p-4 flex items-center justify-between gap-4 ${tone === "brand" ? "bg-brand-600 text-white" : "bg-slate-900 text-white"}`}>
      <div>
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs opacity-80">Client-side CAD analysis · locked-price 30 days · ships 2–7 days</div>
      </div>
      <Link href={href} className="shrink-0 px-4 py-2 rounded-md bg-white text-slate-900 text-sm font-medium hover:bg-slate-100">Start →</Link>
    </div>
  );
}

export function DisclaimerFooter() {
  return (
    <div className="mt-16 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-500">
      3DBuildBot is a manufacturing services provider. Information on this page is for reference and does not constitute engineering, legal, medical, or regulatory advice. All designs, specifications, and material selections remain the responsibility of the customer's qualified engineering staff.
    </div>
  );
}
