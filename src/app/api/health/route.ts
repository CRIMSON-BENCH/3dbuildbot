// Health check endpoint. Uptime monitors + Vercel monitoring hit this every 30s.
// Returns fast + cheap (no DB call by default). Add ?deep=1 to check downstream services.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const deep = url.searchParams.get("deep") === "1";
  const startedAt = Date.now();

  const checks: Record<string, { ok: boolean; ms: number; error?: string }> = {};

  // Always: process alive check
  checks.process = { ok: true, ms: 0 };

  if (deep) {
    // DB reachability
    const t0 = Date.now();
    try {
      await db.users.list();
      checks.db = { ok: true, ms: Date.now() - t0 };
    } catch (e) {
      checks.db = { ok: false, ms: Date.now() - t0, error: (e as Error).message };
    }

    // Env-var sanity
    checks.env = { ok: !!(process.env.AUTH_SECRET), ms: 0 };
  }

  const allOk = Object.values(checks).every((c) => c.ok);
  return NextResponse.json(
    {
      ok: allOk,
      version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "dev",
      env: process.env.VERCEL_ENV ?? "local",
      uptimeSec: Math.floor(process.uptime()),
      totalMs: Date.now() - startedAt,
      checks,
    },
    { status: allOk ? 200 : 503, headers: { "cache-control": "no-store" } }
  );
}
