// Simple in-memory sliding-window rate limiter, keyed by API key.
const RL: Map<string, number[]> = new Map();

const PLAN_LIMITS: Record<string, { perMinute: number; perDay: number }> = {
  free: { perMinute: 10, perDay: 100 },
  maker: { perMinute: 30, perDay: 1000 },
  pro: { perMinute: 60, perDay: 5000 },
  team: { perMinute: 120, perDay: 20000 },
  business: { perMinute: 300, perDay: 100000 },
  enterprise: { perMinute: 1000, perDay: Number.POSITIVE_INFINITY },
  defense: { perMinute: 1000, perDay: Number.POSITIVE_INFINITY },
};

export function checkRate(keyId: string, plan: string = "free"): { ok: boolean; retryAfterSec?: number; remaining: number } {
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.free;
  const now = Date.now();
  const arr = (RL.get(keyId) ?? []).filter((t) => now - t < 60000);
  if (arr.length >= limits.perMinute) {
    return { ok: false, retryAfterSec: Math.ceil((arr[0] + 60000 - now) / 1000), remaining: 0 };
  }
  arr.push(now);
  RL.set(keyId, arr);
  return { ok: true, remaining: limits.perMinute - arr.length };
}
