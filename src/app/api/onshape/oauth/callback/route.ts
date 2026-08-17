// Onshape OAuth callback — exchange code for access token.
// After token exchange, the user is authenticated with 3DBuildBot AND we can call Onshape's REST API on their behalf
// to pull STEP files of any part in their workspace.
import { NextResponse } from "next/server";

const CLIENT_ID = process.env.ONSHAPE_CLIENT_ID;
const CLIENT_SECRET = process.env.ONSHAPE_CLIENT_SECRET;
const REDIRECT = process.env.ONSHAPE_REDIRECT_URL || "https://www.3dbuildbot.com/api/onshape/oauth/callback";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) return NextResponse.redirect(new URL("/integrations/onshape?error=missing_code", req.url));
  if (!CLIENT_ID || !CLIENT_SECRET) return NextResponse.redirect(new URL("/integrations/onshape?error=onshape_not_configured", req.url));

  const tokenRes = await fetch("https://oauth.onshape.com/oauth/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
  const data = await tokenRes.json();
  if (!data.access_token) return NextResponse.redirect(new URL("/integrations/onshape?error=token_exchange_failed", req.url));

  // TODO: persist data.access_token + data.refresh_token in db.users record for the current signed-in user
  // (or issue an auto-signup with their Onshape profile if new).
  // For now, redirect to a success page.
  return NextResponse.redirect(new URL("/integrations/onshape?success=1", req.url));
}
