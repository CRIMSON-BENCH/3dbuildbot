// Build info endpoint — useful for support tickets ("what version did you see this on?")
// and for the /status page. Fast + no DB call.
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "dev",
    fullSha: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    branch: process.env.VERCEL_GIT_COMMIT_REF ?? "local",
    env: process.env.VERCEL_ENV ?? "local",
    region: process.env.VERCEL_REGION ?? null,
    deployedAt: process.env.VERCEL_GIT_COMMIT_AUTHOR_DATE ?? null,
    node: process.version,
  }, { headers: { "cache-control": "no-store" } });
}
