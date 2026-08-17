import { Container, Section, Badge } from "@/components/Card";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PunchOutSession({ params, searchParams }: { params: Promise<{ session: string }>; searchParams: Promise<{ buyer?: string; team?: string; return?: string }> }) {
  const { session } = await params;
  const sp = await searchParams;
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="mb-6 flex items-center gap-2">
          <Badge tone="brand">PunchOut session</Badge>
          <Badge tone="green">{sp.buyer?.toUpperCase() ?? "COUPA"}</Badge>
          <span className="text-xs font-mono text-slate-500">{session}</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Shop 3DBuildBot inside {sp.buyer === "ariba" ? "SAP Ariba" : "Coupa"}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">You've arrived via PunchOut. Get an instant quote below; when you're done, your cart returns to your procurement system as a shoppable cart (cXML PunchOutOrderMessage).</p>

        <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h2 className="text-sm font-semibold mb-3">Quick add — Instant CAD quote</h2>
          <p className="text-xs text-slate-500 mb-4">Upload a CAD file. Our system will produce a line item at the quoted price and add it to your PunchOut cart.</p>
          <Link href={`/quote?punchout=${session}`} className="inline-block px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Start quote →</Link>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Cart</div>
          <p className="text-sm text-slate-600 dark:text-slate-400">Empty. Add a quote above.</p>
          <div className="mt-4 flex justify-between items-center border-t border-slate-200 dark:border-slate-800 pt-4">
            <span className="text-xs text-slate-500 font-mono">Return URL: {sp.return}</span>
            <button className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium">Submit cart to buyer →</button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
