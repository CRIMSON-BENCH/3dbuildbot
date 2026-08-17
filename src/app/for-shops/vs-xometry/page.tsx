import Link from "next/link";
import { Container, Section, Badge, StatCard } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3DBuildBot vs Xometry (for suppliers) — Keep 70% instead of 61%",
  description: "Xometry's ~39% supplier take-rate is public. We take 30%. Same instant-quote flow, better economics. Compare side-by-side.",
};

export default function VsXometry() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <Badge tone="brand">Comparison for suppliers</Badge>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">3DBuildBot vs Xometry — from the supplier's side</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
          If you're already a Xometry supplier, you know the pain: the take rate has crept to ~39% (documented on <a href="https://www.practicalmachinist.com/forum/threads/xometrys-take-grows-to-39-last-quarter.406671/" target="_blank" rel="noopener" className="text-brand-600 hover:underline">Practical Machinist</a>), post-order rebids are common, and titanium jobs sometimes quote below raw-material cost. We built 3DBuildBot as a straightforward alternative: same instant-quote UX, better economics for the shop that actually makes the part.
        </p>

        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          <StatCard value="30%" label="Our platform fee" sublabel="You keep 70%" />
          <StatCard value="~39%" label="Xometry take" sublabel="You keep ~61%" />
          <StatCard value="+9pp" label="Additional margin on 3DBuildBot" sublabel="9 more points on every order" />
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
              <tr><th className="text-left px-4 py-3">Feature</th><th className="text-left px-4 py-3">3DBuildBot</th><th className="text-left px-4 py-3">Xometry</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                ["Platform fee (take rate)", "30%", "~39% (Q4 2024)"],
                ["Post-quote rebids", "Never — locked price", "Documented issue"],
                ["Payment terms", "NET-15 from us", "NET-30 from Xometry"],
                ["Onboarding time", "1 day", "2–4 weeks"],
                ["Exclusivity required", "No — you can also serve direct customers", "No — same"],
                ["Notice to leave", "90 days", "30 days"],
                ["Job matching", "Machine + region + certification aware", "Same"],
                ["Titanium / high-value work", "Locked customer price at time of quote", "Sometimes below material cost"],
                ["ITAR-flagged routing", "Only to ITAR-verified partners", "Same"],
              ].map((row, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 font-medium">{row[0]}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">{row[1]}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 prose-brand max-w-none">
          <h2>Do I have to leave Xometry?</h2>
          <p>No. You can be a supplier on both platforms. Many of our best partners are on Xometry, ThomasNet, and us — they route orders to whichever platform pays them best that week.</p>
          <h2>What's the catch on your 30% fee?</h2>
          <p>Honestly, none — we're smaller than Xometry and growing. We built with better unit economics because we're focused on speed and trust, not on maximizing take-rate. Long-term we may adjust the fee as volume scales, but every existing partner is grandfathered at 30% for their lifetime on the platform.</p>
          <h2>How do I compare a real order?</h2>
          <p>Apply below. During onboarding we'll route your first order through both platforms in parallel (with your permission) so you can see the price difference yourself before committing anything.</p>
        </div>

        <div className="mt-8 flex gap-3">
          <Link href="/for-shops/apply" className="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium">Apply to compare →</Link>
          <Link href="/for-shops" className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 font-medium">Learn more first</Link>
        </div>
      </Container>
    </Section>
  );
}
