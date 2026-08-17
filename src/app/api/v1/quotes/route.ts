// Public REST API v1 — instant quote endpoint. Auth via Bearer API key.
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { quote as computeQuote } from "@/lib/quote-engine";
import { analyzeDfm } from "@/lib/gemini";
import { quoteId } from "@/lib/ids";
import crypto from "crypto";
import { checkRate, checkDailyBudget, rateLimitHeaders } from "@/lib/rate-limit";

async function auth(req: Request) {
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  if (!bearer) return null;
  const hash = crypto.createHash("sha256").update(bearer).digest("hex");
  const key = await db.apiKeys.findByHash(hash);
  return key ?? null;
}

const schema = z.object({
  part: z.object({
    name: z.string().optional(),
    volumeCm3: z.number(),
    bboxMm: z.object({ x: z.number(), y: z.number(), z: z.number() }),
    triangleCount: z.number().optional(),
  }),
  process: z.string(),
  material: z.string(),
  quantity: z.number().int().min(1),
  finish: z.string().optional(),
  expedite: z.enum(["standard", "economy", "rush2", "rush1", "weekend"]).optional(),
});

export async function POST(req: Request) {
  const key = await auth(req);
  if (!key) return NextResponse.json({ error: "unauthorized", detail: "Missing or invalid Bearer API key" }, { status: 401 });
  // Per-key sliding-window rate limit — prevents any single API key from
  // hammering Gemini and degrading shared quota for other paying customers.
  // Plan tier drives the limit; team lookup falls back to "free" if missing.
  const team = await db.teams.findById(key.teamId);
  const plan = team?.plan ?? "free";
  const rate = checkRate(key.id, plan);
  const rlHeaders = rateLimitHeaders(rate);
  if (!rate.ok) {
    return NextResponse.json({ error: "rate_limited", detail: `Rate limit exceeded for plan '${plan}'`, retry_after_sec: rate.retryAfterSec }, { status: 429, headers: { ...rlHeaders, ...(rate.retryAfterSec ? { "retry-after": String(rate.retryAfterSec) } : {}) } });
  }
  // Global Gemini budget kill-switch — belt-and-suspenders on top of the
  // billing cap set at the Gemini API console.
  const budget = checkDailyBudget(1); // ~$0.001 per analyzeDfm call
  if (!budget.ok) {
    return NextResponse.json({ error: "service_unavailable", detail: budget.reason }, { status: 503 });
  }
  try {
    const body = schema.parse(await req.json());
    const priced = computeQuote({
      volumeCm3: body.part.volumeCm3,
      bboxMm: body.part.bboxMm,
      triangleCount: body.part.triangleCount,
      processSlug: body.process,
      materialSlug: body.material,
      quantity: body.quantity,
      finish: body.finish,
      expedite: body.expedite,
    });
    const dfm = await analyzeDfm({ ...body.part, name: body.part.name ?? "part", processSlug: body.process, materialSlug: body.material, quantity: body.quantity });
    return NextResponse.json({
      id: quoteId(),
      unit_price_cents: priced.unitPriceCents,
      total_price_cents: priced.totalPriceCents,
      currency: priced.currency,
      lead_time_days: priced.leadTimeDays,
      cost_drivers: priced.costDrivers,
      dfm_summary: dfm.summary,
      dfm_issues: dfm.issues,
      expires_at: Date.now() + 30 * 24 * 60 * 60 * 1000,
    }, { headers: rlHeaders });
  } catch (e) {
    return NextResponse.json({ error: "invalid_request", detail: (e as Error).message }, { status: 400, headers: rlHeaders });
  }
}
