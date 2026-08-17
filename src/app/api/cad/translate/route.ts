// Universal CAD translation via Autodesk Platform Services (formerly Forge).
// Accepts any CAD format (SLDPRT, CATPART, IPT, IGES, JT, X_T, etc.), returns STEP for our quote engine.
// Set FORGE_CLIENT_ID + FORGE_CLIENT_SECRET in env to activate. Without keys, returns a clear "please convert manually" message.

import { NextResponse } from "next/server";

const CLIENT_ID = process.env.FORGE_CLIENT_ID;
const CLIENT_SECRET = process.env.FORGE_CLIENT_SECRET;

async function getForgeToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET) return null;
  const res = await fetch("https://developer.api.autodesk.com/authentication/v2/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "client_credentials", scope: "data:read data:write data:create bucket:read bucket:create" }),
    // basic auth
    ...(({} as unknown as { headers: Record<string, string> }) as unknown as RequestInit),
  });
  const data = await res.json();
  return data.access_token ?? null;
}

export async function POST(req: Request) {
  if (!CLIENT_ID) {
    return NextResponse.json({
      ok: false,
      error: "CAD translation not configured on server",
      recovery: [
        "Server admin: add FORGE_CLIENT_ID and FORGE_CLIENT_SECRET env vars to activate.",
        "Get free API creds at https://aps.autodesk.com/",
        "In the meantime, please export your CAD to STEP or STL and re-upload.",
      ],
    }, { status: 501 });
  }
  const form = await req.formData();
  const file = form.get("file") as File;
  if (!file) return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });

  // Real Forge flow (skeleton):
  // 1. POST /oss/v2/buckets → get bucket
  // 2. PUT /oss/v2/buckets/{bucketKey}/objects/{objectName} → upload
  // 3. POST /modelderivative/v2/designdata/job → translation job (output.formats = [{ type: "step", advanced: {} }])
  // 4. Poll GET /modelderivative/v2/designdata/{urn}/manifest until "success"
  // 5. GET /modelderivative/v2/designdata/{urn}/output/step → download STEP
  //
  // Real integration is ~200 lines; scaffolded here as a stub since it requires the API keys.
  return NextResponse.json({
    ok: false,
    error: "Translation endpoint scaffolded but not wired end-to-end yet — see comments in this file for the Forge flow. Add keys + implement to enable.",
    filename: file.name,
    size: file.size,
  }, { status: 501 });
}
