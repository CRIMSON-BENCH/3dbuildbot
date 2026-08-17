// Anti-abuse layer. Three defenses stacked:
// 1. Per-API-key sliding-window (for authenticated /api/v1/* traffic)
// 2. Per-IP sliding-window (for anonymous public endpoints — main defense against burn attacks)
// 3. Global daily cost ceiling (kills all Gemini calls once daily budget breached — configurable via env)

const RL: Map<string, number[]> = new Map();
const IP_RL: Map<string, number[]> = new Map();
const DAILY_COST_CENTS: { day: string; cents: number } = { day: "", cents: 0 };

const PLAN_LIMITS: Record<string, { perMinute: number; perDay: number }> = {
  free: { perMinute: 10, perDay: 100 },
  maker: { perMinute: 30, perDay: 1000 },
  pro: { perMinute: 60, perDay: 5000 },
  team: { perMinute: 120, perDay: 20000 },
  business: { perMinute: 300, perDay: 100000 },
  enterprise: { perMinute: 1000, perDay: Number.POSITIVE_INFINITY },
  defense: { perMinute: 1000, perDay: Number.POSITIVE_INFINITY },
};

// Anonymous (no-auth) limits per public endpoint category.
// Chosen so a legit user is never blocked but a bot can't run up a bill.
const ANON_LIMITS: Record<string, { perMinute: number; perHour: number; perDay: number }> = {
  "gemini-cheap": { perMinute: 5, perHour: 30, perDay: 100 },   // material-wizard, materials-chat, quote-dfm, cad-diff, make-vs-buy
  "gemini-vision": { perMinute: 1, perHour: 3, perDay: 5 },     // reverse-engineer — expensive Pro Vision calls
  "compute": { perMinute: 20, perHour: 200, perDay: 1000 },     // pure-compute endpoints (quote engine, tolerance, dfm/advanced)
  "auth": { perMinute: 5, perHour: 20, perDay: 100 },           // signup / login — throttle credential stuffing + account farming
  "spam": { perMinute: 3, perHour: 15, perDay: 50 },            // contact / reviews / promo / referral — no-cost but abusable
};

export function checkRate(keyId: string, plan: string = "free"): { ok: boolean; retryAfterSec?: number; remaining: number; limit: number; resetSec: number } {
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.free;
  const now = Date.now();
  const arr = (RL.get(keyId) ?? []).filter((t) => now - t < 60000);
  if (arr.length >= limits.perMinute) {
    return { ok: false, retryAfterSec: Math.ceil((arr[0] + 60000 - now) / 1000), remaining: 0, limit: limits.perMinute, resetSec: 60 };
  }
  arr.push(now);
  RL.set(keyId, arr);
  return { ok: true, remaining: limits.perMinute - arr.length, limit: limits.perMinute, resetSec: 60 };
}

// Standard X-RateLimit response headers (RFC 6585-adjacent, GitHub/Twitter convention).
export function rateLimitHeaders(rate: { remaining: number; limit: number; resetSec: number }): Record<string, string> {
  return {
    "x-ratelimit-limit": String(rate.limit),
    "x-ratelimit-remaining": String(Math.max(0, rate.remaining)),
    "x-ratelimit-reset": String(Math.floor(Date.now() / 1000) + rate.resetSec),
  };
}

export function checkIpRate(ip: string, category: keyof typeof ANON_LIMITS): { ok: boolean; retryAfterSec?: number; reason?: string } {
  const limits = ANON_LIMITS[category];
  const now = Date.now();
  const key = `${category}:${ip}`;
  const arr = (IP_RL.get(key) ?? []).filter((t) => now - t < 24 * 3600 * 1000);
  const inLastMinute = arr.filter((t) => now - t < 60 * 1000).length;
  const inLastHour = arr.filter((t) => now - t < 3600 * 1000).length;
  const inLastDay = arr.length;
  if (inLastMinute >= limits.perMinute) return { ok: false, retryAfterSec: 60, reason: `Rate limit: ${limits.perMinute}/min` };
  if (inLastHour >= limits.perHour) return { ok: false, retryAfterSec: 3600, reason: `Rate limit: ${limits.perHour}/hr` };
  if (inLastDay >= limits.perDay) return { ok: false, retryAfterSec: 24 * 3600, reason: `Daily quota hit — sign up for higher limits` };
  arr.push(now);
  IP_RL.set(key, arr);
  return { ok: true };
}

export function ipFromRequest(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Global daily Gemini cost ceiling — kill-switch to cap max daily spend.
// Set GEMINI_DAILY_BUDGET_USD in env to enable (e.g. 50 = shut off at $50/day).
export function checkDailyBudget(estimatedCostCents: number): { ok: boolean; reason?: string; spentCents: number; capCents: number } {
  const capUsd = Number(process.env.GEMINI_DAILY_BUDGET_USD || "0");
  if (!capUsd) return { ok: true, spentCents: DAILY_COST_CENTS.cents, capCents: 0 };
  const capCents = capUsd * 100;
  const today = new Date().toISOString().slice(0, 10);
  if (DAILY_COST_CENTS.day !== today) {
    DAILY_COST_CENTS.day = today;
    DAILY_COST_CENTS.cents = 0;
  }
  if (DAILY_COST_CENTS.cents + estimatedCostCents > capCents) {
    return { ok: false, reason: "Daily Gemini budget ceiling reached — service resumes tomorrow UTC", spentCents: DAILY_COST_CENTS.cents, capCents };
  }
  DAILY_COST_CENTS.cents += estimatedCostCents;
  return { ok: true, spentCents: DAILY_COST_CENTS.cents, capCents };
}
