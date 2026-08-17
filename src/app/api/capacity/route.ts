// Live capacity / lead-time widget backing endpoint.
// Computes current queue depth per process from real orders in production and returns projected lead time.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PROCESSES } from "@/data/processes";

export async function GET() {
  const orders = await db.orders.listAll();
  const inProd = orders.filter((o) => ["queued", "in-production", "post-processing", "qc"].includes(o.status));
  const quotes = await Promise.all(inProd.map((o) => db.quotes.findById(o.quoteId)));
  const byProc: Record<string, { queue: number; averageLead: string }> = {};
  for (const p of PROCESSES) {
    const q = inProd.filter((_, i) => quotes[i]?.process === p.slug);
    byProc[p.slug] = { queue: q.length, averageLead: p.leadTimeDays };
  }
  return NextResponse.json({ ok: true, at: Date.now(), capacity: byProc });
}
