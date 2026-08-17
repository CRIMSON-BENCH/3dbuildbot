import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Container, Section, Badge } from "@/components/Card";
import { formatUSD } from "@/lib/quote-engine";

export const dynamic = "force-dynamic";

export default async function OrderSuccess({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const u = await getCurrentUser();
  const order = await db.orders.findById(id);
  if (!order || (!u || (order.teamId !== u.teamId && !u.isAdmin))) notFound();
  return (
    <Section>
      <Container className="max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 mb-4"><Badge tone="green">Order placed</Badge></div>
        <h1 className="text-3xl font-semibold tracking-tight">Thanks — we're on it.</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Order <span className="font-mono">{order.id}</span> paid {formatUSD(order.totalPaidCents)}. Production kicks off same-day. Compliance packet available on the order detail page.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href={`/dashboard/orders/${order.id}`} className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Track order →</Link>
          <Link href="/quote" className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium">New quote</Link>
        </div>
      </Container>
    </Section>
  );
}
