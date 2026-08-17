import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

async function auth(req: Request) {
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  if (!bearer) return null;
  const hash = crypto.createHash("sha256").update(bearer).digest("hex");
  return db.apiKeys.findByHash(hash);
}

export async function GET(req: Request) {
  const key = await auth(req);
  if (!key) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const orders = await db.orders.listByTeam(key.teamId);
  return NextResponse.json({
    data: orders.map((o) => ({
      id: o.id,
      status: o.status,
      total_paid_cents: o.totalPaidCents,
      currency: o.currency,
      created_at: o.createdAt,
      updated_at: o.updatedAt,
      timeline: o.timeline,
    })),
  });
}
