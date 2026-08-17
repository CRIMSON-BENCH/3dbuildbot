import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section, Badge } from "@/components/Card";
import type { Metadata } from "next";

const INTEGRATIONS: Record<string, { name: string; badge: string; desc: string; install: string[]; features: string[] }> = {
  solidworks: {
    name: "SolidWorks Add-in",
    badge: "CAD",
    desc: "Quote assemblies and components directly from the SolidWorks task pane.",
    install: [
      "Download the installer from the SolidPartners portal",
      "Run installer (Windows only)",
      "In SolidWorks: Tools → Add-ins → check 3DBuildBot",
      "Sign in with your 3DBuildBot account",
    ],
    features: ["Right-click quoting", "Assembly BOM auto-quote", "Configuration-aware pricing", "Auto-sync revs on file save"],
  },
  slack: {
    name: "Slack App",
    badge: "Chat",
    desc: "Drop a STEP file in a channel, get a quote in-thread. /quote slash command.",
    install: [
      "Click 'Add to Slack' below",
      "Grant channel + files permissions",
      "Use /quote in any channel or drop a STEP/STL/OBJ file",
      "Bot posts the quote inline; approve to order",
    ],
    features: ["/quote slash command", "File-drop quote", "Order notifications in-channel", "Team billing rolls up"],
  },
  teams: {
    name: "Microsoft Teams App",
    badge: "Chat",
    desc: "Same as Slack — quote and order from within a Teams channel.",
    install: [
      "Install from the Microsoft Teams app store",
      "Add to a team + grant permissions",
      "Type /quote or drop a CAD file in a channel",
      "Bot posts locked-price quote inline",
    ],
    features: ["/quote slash command", "File-drop quote", "Ship notifications", "Adaptive Card previews"],
  },
};

export function generateStaticParams() {
  return Object.keys(INTEGRATIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = INTEGRATIONS[slug];
  return { title: i?.name ?? "Integration" };
}

export default async function IntegrationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = INTEGRATIONS[slug];
  if (!i) notFound();
  return (
    <Section>
      <Container className="max-w-3xl">
        <Badge tone="brand">{i.badge}</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">3DBuildBot {i.name}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{i.desc}</p>
        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          {i.features.map((f) => <div key={f} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4"><div className="text-sm font-semibold">{f}</div></div>)}
        </div>
        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold mb-2">Install</h2>
          <ol className="list-decimal pl-5 text-sm space-y-1 text-slate-700 dark:text-slate-300">
            {i.install.map((step, idx) => <li key={idx}>{step}</li>)}
          </ol>
          <div className="mt-4 flex gap-2">
            <Link href="/contact" className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Get early access →</Link>
            <Link href="/api-docs" className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium">API docs</Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
