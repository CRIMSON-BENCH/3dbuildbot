import { Container, Section, Badge } from "@/components/Card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "API Documentation" };

const quoteExample = `curl -X POST https://www.3dbuildbot.com/api/v1/quotes \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "part": {
      "name": "bracket-rev-B",
      "volumeCm3": 42.5,
      "bboxMm": { "x": 80, "y": 40, "z": 20 },
      "triangleCount": 18420
    },
    "process": "cnc-machining",
    "material": "aluminum-6061",
    "quantity": 25,
    "finish": "anodize2"
  }'`;

const orderListExample = `curl https://www.3dbuildbot.com/api/v1/orders \\
  -H "Authorization: Bearer sk_live_..."`;

export default function ApiDocsPage() {
  return (
    <>
      <Section>
        <Container className="max-w-4xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Developers</div>
          <h1 className="text-4xl font-semibold tracking-tight">Public REST API</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Instant quote and order-status endpoints. Bearer-auth with an API key from your dashboard.</p>
          <div className="mt-3 flex gap-2"><Badge tone="green">v1 · Stable</Badge><Badge tone="brand">JSON</Badge><Badge>REST</Badge></div>
        </Container>
      </Section>
      <Section className="py-4">
        <Container className="max-w-4xl">
          <div className="space-y-8">
            <Endpoint method="POST" path="/api/v1/quotes" title="Create an instant quote" example={quoteExample}
              description="Returns a locked-price quote with cost drivers and AI-driven DFM analysis. No CAD upload — you send parsed geometry (volume + bbox). Use our client-side parser or your own."
              response={`{
  "id": "QT-260816-A9K3P",
  "unit_price_cents": 4520,
  "total_price_cents": 113000,
  "currency": "USD",
  "lead_time_days": "5–7 days",
  "cost_drivers": [
    { "label": "Material", "cents": 2100, "pct": 34 },
    { "label": "Machine time", "cents": 1650, "pct": 27 },
    { "label": "Setup + tooling", "cents": 650, "pct": 11 },
    { "label": "Geometry complexity", "cents": 120, "pct": 2 },
    { "label": "Finish (anodize2)", "cents": 1000, "pct": 16 },
    { "label": "Volume discount (18%)", "cents": -1050, "pct": 17 }
  ],
  "dfm_summary": "Part is compatible with CNC in Al 6061...",
  "dfm_issues": [
    { "level": "info", "text": "Estimated min wall: 1.20mm — within CNC guidelines" }
  ],
  "expires_at": 1758038400000
}`}
            />
            <Endpoint method="GET" path="/api/v1/orders" title="List orders" example={orderListExample}
              description="Returns all orders on your team, sorted newest first. Includes timeline events."
              response={`{
  "data": [
    {
      "id": "ORD-260816-A9K3P",
      "status": "in-production",
      "total_paid_cents": 113000,
      "currency": "USD",
      "created_at": 1758000000000,
      "updated_at": 1758004500000,
      "timeline": [
        { "at": 1758000000000, "status": "quoted" },
        { "at": 1758000600000, "status": "paid" },
        { "at": 1758001200000, "status": "queued" },
        { "at": 1758004500000, "status": "in-production" }
      ]
    }
  ]
}`}
            />
          </div>
          <div className="mt-8 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/60 dark:bg-brand-950/20 p-5">
            <div className="text-sm font-semibold">Get an API key</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Head to your dashboard → API keys to generate a live key. Keys are shown once, hashed at rest.</p>
            <Link href="/dashboard/api-keys" className="mt-3 inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Manage keys →</Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Endpoint({ method, path, title, description, example, response }: { method: string; path: string; title: string; description: string; example: string; response: string; }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <Badge tone={method === "POST" ? "amber" : "green"}>{method}</Badge>
        <code className="font-mono text-sm text-slate-900 dark:text-slate-100">{path}</code>
        <span className="ml-auto text-sm font-semibold">{title}</span>
      </div>
      <div className="p-5">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{description}</p>
        <div className="grid lg:grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">Request</div>
            <pre className="text-xs font-mono bg-slate-950 text-slate-100 rounded-lg p-4 overflow-x-auto">{example}</pre>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">Response</div>
            <pre className="text-xs font-mono bg-slate-950 text-slate-100 rounded-lg p-4 overflow-x-auto">{response}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
