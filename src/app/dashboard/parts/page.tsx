import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function PartsVault() {
  const u = (await getCurrentUser())!;
  const parts = await db.parts.listByTeam(u.teamId);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Part vault</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Parts persist across quotes. Reorder in two clicks.</p>
        </div>
        <Link href="/quote" className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Upload part</Link>
      </div>
      {parts.length === 0 ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
          No parts saved yet. Upload a CAD file on the quote page — parts are auto-saved to your vault after quoting.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {parts.map((p) => (
            <div key={p.id} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <div className="text-sm font-semibold truncate">{p.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1 truncate">{p.filename}</div>
              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono mt-3">
                <div><div className="text-slate-500">Volume</div><div>{p.volumeCm3.toFixed(1)} cm³</div></div>
                <div><div className="text-slate-500">Bbox</div><div>{p.bboxMm.x.toFixed(0)}×{p.bboxMm.y.toFixed(0)}×{p.bboxMm.z.toFixed(0)}</div></div>
                <div><div className="text-slate-500">Tris</div><div>{p.triangleCount?.toLocaleString() ?? "—"}</div></div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Link href={`/quote?partId=${p.id}`} className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline">Re-quote →</Link>
                {p.itarFlagged && <span className="ml-auto text-[10px] font-mono uppercase text-red-600">ITAR</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
