import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { MATERIALS } from "@/data/materials";
import { PROCESSES } from "@/data/processes";
import { PricingRulesEditor } from "@/components/PricingRulesEditor";
import { Container } from "@/components/Card";

export const dynamic = "force-dynamic";

export default async function AdminPricing() {
  const u = await getCurrentUser();
  if (!u?.isAdmin) redirect("/dashboard");
  const overrides = await db.pricingOverrides.list();
  return (
    <Container className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400">Admin</div>
          <h1 className="text-2xl font-semibold tracking-tight">Pricing rules</h1>
        </div>
        <Link href="/admin" className="text-sm text-slate-500">← Admin home</Link>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">Override per-material cost per cm³ or per-process minimum-charge floor. Overrides take effect on the next quote.</p>
      <PricingRulesEditor
        materials={MATERIALS.map((m) => ({ slug: m.slug, name: m.name, defaultCost: m.costPerCm3 }))}
        processes={PROCESSES.map((p) => ({ slug: p.slug, name: p.name }))}
        overrides={overrides.map((o) => ({ key: o.key, value: o.value }))}
      />
    </Container>
  );
}
