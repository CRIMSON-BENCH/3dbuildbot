import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Badge, StatCard } from "@/components/Card";
import { NetTermsForm } from "@/components/NetTermsForm";
import { VendorPackButton } from "@/components/VendorPackButton";
import { PunchoutSetup } from "@/components/PunchoutSetup";

export const dynamic = "force-dynamic";

export default async function ProcurementPage() {
  const u = (await getCurrentUser())!;
  const team = (await db.teams.findById(u.teamId))!;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Procurement</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">PunchOut integrations · NET-30 terms · vendor onboarding pack.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <StatCard value={team.netTerms?.status ?? "none"} label="NET terms status" sublabel={team.netTerms?.days ? `NET-${team.netTerms.days} · $${((team.netTerms.limitCents ?? 0) / 100).toLocaleString()} limit` : "No application on file"} />
        <StatCard value={team.coupaSharedSecret ? "configured" : "—"} label="Coupa PunchOut" />
        <StatCard value={team.aribaSharedSecret ? "configured" : "—"} label="SAP Ariba PunchOut" />
      </div>

      <NetTermsForm current={team.netTerms} />

      <PunchoutSetup teamId={u.teamId} coupaConfigured={!!team.coupaSharedSecret} aribaConfigured={!!team.aribaSharedSecret} />

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Vendor onboarding pack</h2>
          <Badge tone="green">Auto-filled</Badge>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Download pre-filled onboarding documents for your buyer's AP / procurement team.</p>
        <VendorPackButton />
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h2 className="text-sm font-semibold mb-3">SSO / SAML (Enterprise plan)</h2>
        <div className="text-xs text-slate-600 dark:text-slate-400">
          Upload your identity-provider metadata to enable single sign-on. Supported: Okta · Azure AD · Google Workspace · any SAML 2.0 IdP.
        </div>
        <div className="mt-3 flex gap-2">
          <input type="file" accept=".xml" className="text-xs" />
          <button className="text-xs px-3 py-1.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900">Upload IdP metadata</button>
        </div>
        <div className="mt-3 text-xs font-mono text-slate-500">
          SP entity ID: <code>https://www.3dbuildbot.com/saml/{u.teamId}</code><br />
          ACS URL: <code>https://www.3dbuildbot.com/api/saml/{u.teamId}/callback</code>
        </div>
      </div>
    </div>
  );
}
