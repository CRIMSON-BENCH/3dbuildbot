import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/Card";
import { InviteMemberForm } from "@/components/InviteMemberForm";
import { TeamSettingsForm } from "@/components/TeamSettingsForm";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const u = (await getCurrentUser())!;
  const team = await db.teams.findById(u.teamId);
  const users = await db.users.list();
  const members = users.filter((x) => x.teamId === u.teamId);
  const invites = await db.invites.listByTeam(u.teamId);
  const audit = await db.audit.list(u.teamId, 30);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{team?.name} · {team?.plan} plan</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Members ({members.length})</h2>
          </div>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {members.map((m) => (
                <tr key={m.id}>
                  <td className="px-5 py-3">
                    <div className="font-medium">{m.name} {m.id === u.id && <span className="text-xs text-slate-500">(you)</span>}</div>
                    <div className="text-xs text-slate-500">{m.email}</div>
                  </td>
                  <td className="px-5 py-3"><Badge tone="brand">{m.role}</Badge></td>
                </tr>
              ))}
              {invites.map((i) => (
                <tr key={i.id} className="bg-amber-50/50 dark:bg-amber-950/20">
                  <td className="px-5 py-3">
                    <div className="text-slate-500 text-sm italic">{i.email}</div>
                    <div className="text-xs text-slate-500">Pending invite · expires {new Date(i.expiresAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-5 py-3"><Badge tone="amber">{i.role} · pending</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <InviteMemberForm />
        </div>
      </div>

      <TeamSettingsForm team={team!} isOwner={u.role === "owner" || u.role === "admin"} />

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h2 className="text-sm font-semibold mb-3">Audit log</h2>
        {audit.length === 0 ? (
          <div className="text-xs text-slate-500">No activity yet.</div>
        ) : (
          <ul className="space-y-1 text-xs font-mono">
            {audit.map((a) => (
              <li key={a.id} className="flex items-baseline gap-3 py-1">
                <span className="text-slate-500 tabular-nums w-40 shrink-0">{new Date(a.at).toLocaleString()}</span>
                <span className="text-brand-600 dark:text-brand-400 w-32 shrink-0">{a.action}</span>
                <span className="text-slate-700 dark:text-slate-300 truncate">{a.entity} {a.entityId ?? ""} {a.detail ?? ""}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
