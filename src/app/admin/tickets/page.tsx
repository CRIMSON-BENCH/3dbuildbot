import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Badge, Container } from "@/components/Card";

export const dynamic = "force-dynamic";

export default async function AdminTickets() {
  const u = await getCurrentUser();
  if (!u?.isAdmin) redirect("/dashboard");
  const tickets = await db.tickets.list();
  return (
    <Container className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400">Admin</div>
          <h1 className="text-2xl font-semibold tracking-tight">Support inbox</h1>
        </div>
        <Link href="/admin" className="text-sm text-slate-500">← Admin home</Link>
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        {tickets.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500">Inbox zero.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-mono uppercase tracking-widest text-slate-500">
              <tr><th className="text-left px-4 py-2">Subject</th><th className="text-left px-4 py-2">Team</th><th className="text-left px-4 py-2">Status</th><th className="text-right px-4 py-2">Updated</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-3"><Link href={`/admin/tickets/${t.id}`} className="text-brand-600 dark:text-brand-400 font-medium hover:underline">{t.subject}</Link></td>
                  <td className="px-4 py-3 font-mono text-xs">{t.teamId.slice(-6)}</td>
                  <td className="px-4 py-3"><Badge tone={t.status === "open" ? "amber" : t.status === "resolved" ? "green" : "slate"}>{t.status}</Badge></td>
                  <td className="px-4 py-3 text-xs text-slate-500 text-right">{new Date(t.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
}
