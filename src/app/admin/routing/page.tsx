import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Badge, Container, StatCard } from "@/components/Card";
import { AdminRoutingTable } from "@/components/AdminRoutingTable";

export const dynamic = "force-dynamic";

export default async function AdminRouting() {
  const u = await getCurrentUser();
  if (!u?.isAdmin) redirect("/dashboard");
  const orders = await db.orders.listAll();
  const active = orders.filter((o) => !["shipped", "delivered", "cancelled"].includes(o.status));
  const partners = await db.partners.list();
  return (
    <Container className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400">Admin</div>
          <h1 className="text-2xl font-semibold tracking-tight">Order routing</h1>
        </div>
        <Link href="/admin" className="text-sm text-slate-500">← Admin home</Link>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <StatCard value={String(active.length)} label="Active orders" />
        <StatCard value={String(active.filter((o) => o.routing?.to === "internal").length)} label="Assigned internal" />
        <StatCard value={String(active.filter((o) => o.routing?.to === "partner").length)} label="Assigned partner" />
      </div>
      <AdminRoutingTable orders={active.map((o) => ({ id: o.id, status: o.status, teamId: o.teamId, itarFlagged: !!o.itarFlagged, routing: o.routing || null }))} partners={partners.map((p) => ({ id: p.id, name: p.name, processes: p.processes, itarEligible: !!p.itarEligible }))} />
    </Container>
  );
}
