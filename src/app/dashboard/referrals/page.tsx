import { getCurrentUser } from "@/lib/auth";
import { Container, StatCard } from "@/components/Card";
import { ReferralLinkCopy } from "@/components/ReferralLinkCopy";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ReferralsPage() {
  const u = (await getCurrentUser())!;
  // Ensure user has a code
  let code = u.referralCode;
  if (!code) {
    code = (u.name.replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 6) || "REF") + Math.random().toString(36).slice(2, 6).toUpperCase();
    await db.users.update(u.id, { referralCode: code });
  }
  const users = await db.users.list();
  const referred = users.filter((x) => x.referredById === u.id);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Referrals</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Give $25 · get $25 in credit for each referral that places their first order.</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <StatCard value={String(referred.length)} label="Sign-ups from your link" />
        <StatCard value={String(referred.filter((r) => r.plan !== "free").length)} label="Paid conversions" />
        <StatCard value={`$${((u.referralCreditCents ?? 0) / 100).toFixed(0)}`} label="Credit earned" sublabel="Applied automatically to next quote" />
      </div>
      <ReferralLinkCopy code={code!} />
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h2 className="text-sm font-semibold mb-3">How it works</h2>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>Share your unique link with an engineer or hardware team.</li>
          <li>They get $25 off their first order via the promo code embedded in your link.</li>
          <li>You get $25 in credit when they place their first order.</li>
          <li>Credit auto-applies to your next quote — no code required.</li>
        </ol>
      </div>
    </div>
  );
}
