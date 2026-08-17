// Onshape OAuth 2.0 kickoff.
// Set ONSHAPE_CLIENT_ID + ONSHAPE_CLIENT_SECRET after publishing an app in the Onshape Dev Portal (https://dev-portal.onshape.com).
// After user grants access, callback exchanges code → access token → we can pull STEP files from their Onshape workspaces.

import { NextResponse } from "next/server";

const CLIENT_ID = process.env.ONSHAPE_CLIENT_ID;
const REDIRECT = process.env.ONSHAPE_REDIRECT_URL || "https://www.3dbuildbot.com/api/onshape/oauth/callback";

export async function GET(req: Request) {
  if (!CLIENT_ID) {
    return NextResponse.redirect(new URL("/integrations/onshape?error=onshape_not_configured", req.url));
  }
  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT,
    scope: "OAuth2Read OAuth2ReadPII",
    state: Math.random().toString(36).slice(2),
  });
  return NextResponse.redirect(`https://oauth.onshape.com/oauth/authorize?${params.toString()}`);
}
