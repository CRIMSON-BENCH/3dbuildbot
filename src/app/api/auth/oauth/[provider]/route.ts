// OAuth provider scaffold. Google / Apple / GitHub / Microsoft.
// When `${PROVIDER}_CLIENT_ID` is set, redirects to real OAuth. Otherwise redirects back with a friendly setup note.
import { NextResponse } from "next/server";

const PROVIDERS = {
  google: {
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    scope: "openid email profile",
    envKey: "GOOGLE_CLIENT_ID",
  },
  apple: {
    authUrl: "https://appleid.apple.com/auth/authorize",
    scope: "name email",
    envKey: "APPLE_CLIENT_ID",
  },
  github: {
    authUrl: "https://github.com/login/oauth/authorize",
    scope: "user:email",
    envKey: "GITHUB_CLIENT_ID",
  },
  microsoft: {
    authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    scope: "openid email profile",
    envKey: "MICROSOFT_CLIENT_ID",
  },
} as const;

export async function GET(req: Request, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const p = PROVIDERS[provider as keyof typeof PROVIDERS];
  if (!p) return NextResponse.redirect(new URL("/login?error=unknown_provider", req.url));

  const clientId = process.env[p.envKey];
  if (!clientId) {
    return NextResponse.redirect(new URL(`/login?error=oauth_not_configured&provider=${provider}`, req.url));
  }

  const origin = new URL(req.url).origin;
  const params2 = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${origin}/api/auth/oauth/${provider}/callback`,
    response_type: "code",
    scope: p.scope,
    state: Math.random().toString(36).slice(2),
  });
  return NextResponse.redirect(`${p.authUrl}?${params2.toString()}`);
}
