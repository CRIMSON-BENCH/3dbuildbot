import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Container, Section, Badge } from "@/components/Card";
import { NdaSignForm } from "@/components/NdaSignForm";

export const dynamic = "force-dynamic";

export default async function NdaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const nda = await db.ndas.findById(id);
  if (!nda) notFound();
  return (
    <Section>
      <Container className="max-w-3xl">
        <Badge tone={nda.signedAt ? "green" : "amber"}>{nda.signedAt ? "Executed" : "Awaiting customer signature"}</Badge>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">Mutual Non-Disclosure Agreement</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Reference: quote {nda.quoteId}</p>

        <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 max-h-[400px] overflow-y-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-200">
          {nda.text}
        </div>

        {nda.signedAt ? (
          <div className="mt-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-5 text-sm text-emerald-800 dark:text-emerald-200">
            Executed by <strong>{nda.signerName}</strong>{nda.signerTitle ? `, ${nda.signerTitle}` : ""} ({nda.signerEmail}) on {new Date(nda.signedAt).toLocaleString()}. Signature IP: <code className="font-mono">{nda.signerIp}</code>.
          </div>
        ) : (
          <div className="mt-6">
            <NdaSignForm id={id} />
          </div>
        )}
      </Container>
    </Section>
  );
}
