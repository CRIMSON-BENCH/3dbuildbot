"use client";
import { useState } from "react";
import { generateCoC, generateFAI, generateMaterialCert } from "@/lib/pdf";
import type { Order, Quote } from "@/lib/db";

interface Props {
  orderId: string;
  quoteId: string;
  partName: string;
  materialName: string;
  processName: string;
  quantity: number;
  leadTime: string;
  bbox?: { x: number; y: number; z: number };
}

export function CompliancePackButton(props: Props) {
  const [busy, setBusy] = useState<string | null>(null);

  function download(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function gen(kind: "coc" | "fai" | "mat") {
    setBusy(kind);
    const ctx = {
      order: { id: props.orderId, expectedShip: Date.now() + 7 * 24 * 3600 * 1000 } as Order,
      quote: { id: props.quoteId, quantity: props.quantity, leadTimeDays: props.leadTime } as Quote,
      part: props.bbox ? ({ name: props.partName, bboxMm: props.bbox } as unknown as import("@/lib/db").Part) : null,
      materialName: props.materialName,
      processName: props.processName,
      companyName: "3DBuildBot customer",
    };
    let blob: Blob;
    if (kind === "coc") { blob = await generateCoC(ctx); download(blob, `CoC-${props.orderId}.pdf`); }
    else if (kind === "fai") { blob = await generateFAI(ctx); download(blob, `FAI-${props.orderId}.pdf`); }
    else { blob = await generateMaterialCert(ctx); download(blob, `MaterialCert-${props.orderId}.pdf`); }
    setBusy(null);
  }

  return (
    <div className="space-y-3">
      <a href={`/api/orders/${props.orderId}/compliance-pack`} className="block rounded-lg bg-gradient-to-br from-brand-600 to-brand-700 text-white p-4 hover:from-brand-500 hover:to-brand-600">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Full compliance packet (ZIP)</div>
            <div className="text-xs text-brand-100 mt-1">CoC · AS9102 Forms 1/2/3 · CMM · SPC · MTR · Traceability + QR</div>
          </div>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v14m-6-6l6 6 6-6M4 21h16"/></svg>
        </div>
      </a>
      <div className="grid sm:grid-cols-3 gap-2">
        <button onClick={() => gen("coc")} disabled={!!busy} className="text-left rounded-lg border border-slate-200 dark:border-slate-800 hover:border-brand-500 p-3 disabled:opacity-60">
          <div className="text-sm font-semibold">Certificate of Conformance</div>
          <div className="text-xs text-slate-500 mt-1">{busy === "coc" ? "Generating…" : "Download PDF"}</div>
        </button>
        <button onClick={() => gen("fai")} disabled={!!busy} className="text-left rounded-lg border border-slate-200 dark:border-slate-800 hover:border-brand-500 p-3 disabled:opacity-60">
          <div className="text-sm font-semibold">First Article Inspection</div>
          <div className="text-xs text-slate-500 mt-1">{busy === "fai" ? "Generating…" : "AS9102-style PDF"}</div>
        </button>
        <button onClick={() => gen("mat")} disabled={!!busy} className="text-left rounded-lg border border-slate-200 dark:border-slate-800 hover:border-brand-500 p-3 disabled:opacity-60">
          <div className="text-sm font-semibold">Material Certificate</div>
          <div className="text-xs text-slate-500 mt-1">{busy === "mat" ? "Generating…" : "Heat lot + traceability"}</div>
        </button>
      </div>
    </div>
  );
}
