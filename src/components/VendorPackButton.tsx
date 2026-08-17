"use client";
import { useState } from "react";
import { generateW9, generateCoiRequest, generateBankingForm } from "@/lib/vendor-pack";

const stub = { team: { id: "", name: "", ownerId: "", memberIds: [], plan: "free", createdAt: 0 } as import("@/lib/db").Team, user: { id: "", email: "", passwordHash: "", name: "", createdAt: 0, teamId: "", plan: "free", role: "owner" } as import("@/lib/db").User };

export function VendorPackButton() {
  const [busy, setBusy] = useState<string | null>(null);
  function dl(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }
  async function gen(kind: "w9" | "coi" | "bank") {
    setBusy(kind);
    let b: Blob;
    if (kind === "w9") { b = await generateW9(stub); dl(b, "3DBuildBot-W9.pdf"); }
    else if (kind === "coi") { b = await generateCoiRequest(stub); dl(b, "3DBuildBot-COI-request.pdf"); }
    else { b = await generateBankingForm(stub); dl(b, "3DBuildBot-banking.pdf"); }
    setBusy(null);
  }
  return (
    <div className="grid sm:grid-cols-3 gap-2">
      <button onClick={() => gen("w9")} disabled={!!busy} className="text-left rounded-lg border border-slate-200 dark:border-slate-800 hover:border-brand-500 p-3">
        <div className="text-sm font-semibold">Substitute W-9</div>
        <div className="text-xs text-slate-500 mt-1">{busy === "w9" ? "…" : "Download PDF"}</div>
      </button>
      <button onClick={() => gen("coi")} disabled={!!busy} className="text-left rounded-lg border border-slate-200 dark:border-slate-800 hover:border-brand-500 p-3">
        <div className="text-sm font-semibold">COI Request Letter</div>
        <div className="text-xs text-slate-500 mt-1">{busy === "coi" ? "…" : "Download PDF"}</div>
      </button>
      <button onClick={() => gen("bank")} disabled={!!busy} className="text-left rounded-lg border border-slate-200 dark:border-slate-800 hover:border-brand-500 p-3">
        <div className="text-sm font-semibold">ACH / Wire Instructions</div>
        <div className="text-xs text-slate-500 mt-1">{busy === "bank" ? "…" : "Download PDF"}</div>
      </button>
    </div>
  );
}
