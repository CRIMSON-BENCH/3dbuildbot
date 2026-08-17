import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { StatCard, Badge } from "@/components/Card";

export const dynamic = "force-dynamic";

export default async function ApiKeyDetail({ params }: { params: Promise<{ id: string }> }) {
  const u = await getCurrentUser();
  if (!u) redirect("/login");
  const { id } = await params;
  const keys = await db.apiKeys.listByTeam(u.teamId);
  const key = keys.find((k) => k.id === id);
  if (!key) redirect("/dashboard/api-keys");
  const stats24h = await db.apiUsage.statsByKey(id, 24 * 60 * 60 * 1000);
  const stats7d = await db.apiUsage.statsByKey(id, 7 * 24 * 60 * 60 * 1000);
  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/api-keys" className="text-xs text-brand-600">← All keys</Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-2">{key!.name}</h1>
        <p className="text-xs font-mono text-slate-500">{key!.prefix}…{key!.last4} · created {new Date(key!.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="grid sm:grid-cols-4 gap-3">
        <StatCard value={String(stats24h.total)} label="Requests · 24h" />
        <StatCard value={`${stats24h.total ? Math.round((stats24h.success / stats24h.total) * 100) : 100}%`} label="Success · 24h" sublabel={`${stats24h.errors} errors`} />
        <StatCard value={String(stats7d.total)} label="Requests · 7d" />
        <StatCard value={`${stats7d.total ? Math.round((stats7d.success / stats7d.total) * 100) : 100}%`} label="Success · 7d" />
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h2 className="text-sm font-semibold mb-3">Rate limits (based on team plan)</h2>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div><div className="text-xs font-mono uppercase text-slate-500">Per minute</div><div className="text-lg font-mono">{u.plan === "business" ? 300 : u.plan === "pro" ? 60 : u.plan === "team" ? 120 : u.plan === "enterprise" ? 1000 : 10}</div></div>
          <div><div className="text-xs font-mono uppercase text-slate-500">Per day</div><div className="text-lg font-mono">{u.plan === "business" ? "100k" : u.plan === "pro" ? "5k" : u.plan === "team" ? "20k" : u.plan === "enterprise" ? "∞" : "100"}</div></div>
          <div><div className="text-xs font-mono uppercase text-slate-500">Scopes</div><div className="flex flex-wrap gap-1 mt-1">{key!.scopes.map((s) => <Badge key={s}>{s}</Badge>)}</div></div>
        </div>
      </div>
    </div>
  );
}
