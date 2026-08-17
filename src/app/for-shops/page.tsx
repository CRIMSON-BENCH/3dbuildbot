import Link from "next/link";
import { Container, Section, Badge, StatCard } from "@/components/Card";
import { EarningsCalculator } from "@/components/EarningsCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Shops — Join the 3DBuildBot Partner Network",
  description: "Fill your machines with recurring US-sourced work. Keep 70% of every order. No Xometry-style 39% take rate. Instant quotes, we handle sales + support.",
};

export default function ForShopsHub() {
  return (
    <>
      <Section className="pt-14">
        <Container className="max-w-4xl">
          <Badge tone="green">Partner network · Now recruiting</Badge>
          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">Fill your machines. Skip the marketing. Keep 70%.</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            You run world-class CNC, SLS, MJF, SLA, and 5-axis machines. We run the sales, marketing, support, and payment engine. When an order comes in that matches your capability + region + certifications, it lands in your queue. You accept, produce, ship. We handle everything else.
          </p>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link href="/for-shops/apply" className="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium">Apply to join →</Link>
            <Link href="#calculator" className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 font-medium">Estimate your earnings</Link>
          </div>
        </Container>
      </Section>

      <Section className="py-8">
        <Container>
          <div className="grid sm:grid-cols-4 gap-3">
            <StatCard value="70%" label="Your share of every order" sublabel="vs 61% on Xometry (39% take)" />
            <StatCard value="$0" label="Marketing budget you need" sublabel="We drive customers to your queue" />
            <StatCard value="0%" label="Idle machine time we care about" sublabel="Turn every open hour into revenue" />
            <StatCard value="90 days" label="Notice to leave anytime" sublabel="No lock-in contracts" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">How it works</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: "01", h: "Apply once", b: "10-minute form. List your machines, materials, region, certs (ISO 9001, AS9100, ITAR)." },
              { n: "02", h: "We onboard you", b: "You get login credentials to your partner portal. Test order runs through end-to-end." },
              { n: "03", h: "Jobs land in your queue", b: "When a customer places an order matching your capability, it's auto-routed. Accept or reject." },
              { n: "04", h: "Produce + ship + get paid", b: "Ship direct to customer with our labels. Payment lands in your bank NET-15 the following month." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <div className="text-[11px] font-mono tracking-widest text-brand-600 dark:text-brand-400">STEP {s.n}</div>
                <h3 className="mt-2 text-base font-semibold">{s.h}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-950" id="calculator">
        <Container className="max-w-4xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Earnings calculator</div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">See what your idle hours are worth</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Enter your current utilization. See what you'd add per month by filling the gap with our routed orders.</p>
          <div className="mt-8"><EarningsCalculator /></div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Why partner with us vs going it alone</h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
                <tr><th className="text-left px-4 py-3">Feature</th><th className="text-left px-4 py-3">3DBuildBot Partner</th><th className="text-left px-4 py-3">Xometry Supplier</th><th className="text-left px-4 py-3">Direct sales</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {[
                  ["Your share of order value", "70%", "~61% (39% take)", "100%"],
                  ["Marketing effort", "None — we drive it", "None", "Full — SEO, ads, sales"],
                  ["Payment terms", "NET-15 from us", "NET-30 from Xometry", "You chase invoices"],
                  ["Post-order rebids", "Never — locked quote", "Sometimes", "You control"],
                  ["Onboarding time", "1 day", "2–4 weeks", "N/A"],
                  ["Contract commitment", "90-day notice to leave", "Auto-renewal terms", "N/A"],
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 font-medium">{row[0]}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">{row[1]}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row[2]}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-600 text-white">
        <Container className="max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Ready to fill your machines?</h2>
          <p className="mt-3 text-brand-100">10-minute application. We review within 2 business days.</p>
          <Link href="/for-shops/apply" className="mt-6 inline-block px-6 py-3 rounded-lg bg-white text-brand-700 font-medium hover:bg-slate-100">Apply now →</Link>
        </Container>
      </Section>
    </>
  );
}
