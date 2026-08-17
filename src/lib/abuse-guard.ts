// Shared helper for public Gemini endpoints. One function per category, returns a Response if blocked.
import { NextResponse } from "next/server";
import { checkIpRate, checkDailyBudget, ipFromRequest } from "./rate-limit";

type Category = "gemini-cheap" | "gemini-vision" | "compute";

const COST_ESTIMATE_CENTS: Record<Category, number> = {
  "gemini-cheap": 1,      // ~$0.001 per Flash call
  "gemini-vision": 20,    // ~$0.20 per Pro Vision call
  "compute": 0,           // no external cost
};

export function guard(req: Request, category: Category): Response | null {
  const ip = ipFromRequest(req);
  const rl = checkIpRate(ip, category);
  if (!rl.ok) {
    return NextResponse.json({ ok: false, error: rl.reason ?? "rate_limited", retryAfterSec: rl.retryAfterSec }, { status: 429, headers: rl.retryAfterSec ? { "retry-after": String(rl.retryAfterSec) } : undefined });
  }
  const budget = checkDailyBudget(COST_ESTIMATE_CENTS[category]);
  if (!budget.ok) {
    return NextResponse.json({ ok: false, error: budget.reason }, { status: 429 });
  }
  return null;
}
