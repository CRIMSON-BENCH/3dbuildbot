import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

function generateCode(name: string): string {
  const clean = name.replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 6) || "REF";
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${clean}${suffix}`;
}

export async function GET() {
  try {
    const u = await requireUser();
    let code = u.referralCode;
    if (!code) {
      code = generateCode(u.name);
      await db.users.update(u.id, { referralCode: code });
    }
    // Simple stats
    const users = await db.users.list();
    const referred = users.filter((x) => x.referredById === u.id);
    const orders = await db.orders.listAll();
    const referredOrders = orders.filter((o) => referred.some((r) => r.teamId === o.teamId));
    return NextResponse.json({
      ok: true,
      code,
      link: `/promo/${code}`,
      referralsCount: referred.length,
      convertedCount: new Set(referredOrders.map((o) => o.teamId)).size,
      creditCents: u.referralCreditCents ?? 0,
    });
  } catch { return NextResponse.json({ ok: false }, { status: 401 }); }
}
