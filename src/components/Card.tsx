import Link from "next/link";

export function StatCard({ value, label, sublabel }: { value: string; label: string; sublabel?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{value}</div>
      <div className="text-sm text-slate-700 dark:text-slate-300 mt-1">{label}</div>
      {sublabel && <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">{sublabel}</div>}
    </div>
  );
}

export function FeatureCard({ href, title, desc, badge, gradient }: { href?: string; title: string; desc: string; badge?: string; gradient?: string }) {
  const cls = `group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 overflow-hidden ${href ? "hover:border-brand-500 dark:hover:border-brand-500 transition-colors" : ""}`;
  const inner = (
    <>
      {gradient && <div className={`absolute inset-0 opacity-40 pointer-events-none bg-gradient-to-br ${gradient}`} />}
      <div className="relative">
        {badge && <div className="inline-block text-[10px] font-mono tracking-wider text-brand-600 dark:text-brand-400 mb-2 uppercase">{badge}</div>}
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </>
  );
  return href ? <Link href={href} className={cls}>{inner}</Link> : <div className={cls}>{inner}</div>;
}

export function PriceCard({ tier, price, cadence, features, cta, href, highlight }: { tier: string; price: string; cadence?: string; features: string[]; cta: string; href: string; highlight?: boolean }) {
  return (
    <div className={`relative rounded-2xl border p-6 flex flex-col ${highlight ? "border-brand-500 bg-brand-50/40 dark:bg-brand-950/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"}`}>
      {highlight && <div className="absolute -top-3 left-6 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white bg-brand-600 rounded-full uppercase">Most popular</div>}
      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide">{tier}</div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{price}</span>
        {cadence && <span className="text-sm text-slate-500 dark:text-slate-400">/{cadence}</span>}
      </div>
      <ul className="mt-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" viewBox="0 0 20 20" fill="currentColor"><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z"/></svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link href={href} className={`mt-6 inline-flex justify-center rounded-lg px-4 py-2.5 text-sm font-medium ${highlight ? "bg-brand-600 hover:bg-brand-700 text-white" : "bg-slate-900 hover:bg-slate-700 text-white dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900"}`}>{cta}</Link>
    </div>
  );
}

export function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "brand" | "green" | "amber" | "red" }) {
  const map = {
    slate: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    brand: "bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800",
    green: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    amber: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    red: "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${map[tone]}`}>{children}</span>;
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`py-16 sm:py-20 ${className}`}>{children}</section>;
}
