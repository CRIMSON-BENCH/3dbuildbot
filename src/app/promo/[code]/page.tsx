import Link from "next/link";
import { db } from "@/lib/db";
import { Container, Section, Badge } from "@/components/Card";

export const dynamic = "force-dynamic";

export default async function PromoLanding({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const promo = await db.promos.findByCode(code);
  const users = await db.users.list();
  const referrer = users.find((u) => u.referralCode?.toUpperCase() === code.toUpperCase());
  const description = promo
    ? (promo.percentOff ? `${promo.percentOff}% off` : `$${((promo.amountOffCents ?? 0) / 100).toFixed(0)} off`) + (promo.minSpendCents ? ` on orders over $${(promo.minSpendCents / 100).toFixed(0)}` : "")
    : referrer
      ? "$25 off your first order via referral"
      : "Promo code invalid or expired";

  return (
    <Section>
      <Container className="max-w-2xl text-center">
        <Badge tone="brand">Promo code · {code.toUpperCase()}</Badge>
        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">{description}</h1>
        {referrer && <p className="mt-3 text-slate-600 dark:text-slate-400">Referred by {referrer.name}. When you place your first order, {referrer.name.split(" ")[0]} gets $25 in credit too.</p>}
        <div className="mt-6 flex justify-center gap-3">
          <Link href={`/signup?promo=${code}`} className="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium">Create account →</Link>
          <Link href={`/quote?promo=${code}`} className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 font-medium">Try instant quote</Link>
        </div>
      </Container>
    </Section>
  );
}
