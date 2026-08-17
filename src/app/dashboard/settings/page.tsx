import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const u = (await getCurrentUser())!;
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
        <Row k="Name" v={u.name} />
        <Row k="Email" v={u.email} />
        <Row k="Team ID" v={u.teamId} mono />
        <Row k="Plan" v={u.plan} />
        <Row k="Role" v={u.role} />
        <Row k="Member since" v={new Date(u.createdAt).toLocaleDateString()} />
      </div>
      <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50/60 dark:bg-red-950/20 p-5">
        <h2 className="text-sm font-semibold text-red-900 dark:text-red-200">Danger zone</h2>
        <p className="text-xs text-red-700 dark:text-red-300 mt-1">Deleting your account removes all vault parts, quotes, and orders. GDPR export available on request.</p>
        <button className="mt-3 px-3 py-1.5 rounded-md text-xs font-medium border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30">Delete account</button>
      </div>
    </div>
  );
}

function Row({ k, v, mono = false }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between border-b border-slate-100 dark:border-slate-800 pb-2 last:border-0">
      <span className="text-xs uppercase tracking-wider font-mono text-slate-500">{k}</span>
      <span className={`text-sm ${mono ? "font-mono" : ""}`}>{v}</span>
    </div>
  );
}
