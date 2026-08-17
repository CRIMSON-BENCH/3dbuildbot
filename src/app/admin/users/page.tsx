import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Badge, Container } from "@/components/Card";
import { ImpersonateButton } from "@/components/ImpersonateButton";

export const dynamic = "force-dynamic";

export default async function AdminUsers() {
  const u = await getCurrentUser();
  if (!u?.isAdmin) redirect("/dashboard");
  const users = await db.users.list();
  return (
    <Container className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400">Admin</div>
          <h1 className="text-2xl font-semibold tracking-tight">Users ({users.length})</h1>
        </div>
        <Link href="/admin" className="text-sm text-slate-500">← Admin home</Link>
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
            <tr><th className="text-left px-4 py-2">User</th><th className="text-left px-4 py-2">Team</th><th className="text-left px-4 py-2">Plan</th><th className="text-left px-4 py-2">Role</th><th className="text-right px-4 py-2">Joined</th><th></th></tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {users.map((x) => (
              <tr key={x.id}>
                <td className="px-4 py-3"><div className="font-medium">{x.name}</div><div className="text-xs text-slate-500">{x.email}</div></td>
                <td className="px-4 py-3 font-mono text-xs">{x.teamId.slice(-6)}</td>
                <td className="px-4 py-3"><Badge tone="brand">{x.plan}</Badge></td>
                <td className="px-4 py-3 text-xs">{x.role}{x.isAdmin && <Badge tone="red">admin</Badge>}{x.eduVerified && <Badge tone="green">.edu</Badge>}</td>
                <td className="px-4 py-3 text-xs text-slate-500 text-right">{new Date(x.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right"><ImpersonateButton userId={x.id} disabled={x.id === u.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
