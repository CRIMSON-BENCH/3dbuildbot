import Link from "next/link";
import { Container, Section, FeatureCard } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Integrations" };

const INTEGRATIONS = [
  { slug: "onshape", name: "Onshape App", desc: "Quote and order from any Onshape Part Studio via right-click.", badge: "CAD" },
  { slug: "fusion360", name: "Fusion 360 Add-in", desc: "Quote any body or component from the Fusion 360 ribbon.", badge: "CAD" },
  { slug: "solidworks", name: "SolidWorks Add-in", desc: "Quote assemblies and components directly from the SolidWorks task pane.", badge: "CAD" },
  { slug: "slack", name: "Slack App", desc: "Drop a STEP file in a channel, get a quote in-thread. /quote slash command.", badge: "Chat" },
  { slug: "teams", name: "Microsoft Teams App", desc: "Same as Slack — quote and order from within a Teams channel.", badge: "Chat" },
];

export default function IntegrationsIndex() {
  return (
    <Section>
      <Container>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Integrations</div>
        <h1 className="text-3xl font-semibold tracking-tight">Quote and order without leaving your tools</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">Right-click a body in Onshape, drop a STEP in Slack, or hit a keyboard shortcut in Fusion 360.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INTEGRATIONS.map((i) => (
            <Link key={i.slug} href={`/integrations/${i.slug}`} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-500 transition-colors">
              <div className="text-[10px] font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1">{i.badge}</div>
              <h3 className="text-base font-semibold">{i.name}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{i.desc}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
