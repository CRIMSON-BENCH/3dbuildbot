// OAuth callback — exchanges auth-code for access token, fetches user profile,
// upserts user in db, signs them in, redirects to /dashboard.
// Supports Google + GitHub + Apple.
import { NextResponse } from "next/server";
import { loginOrCreateFromOAuth } from "@/lib/auth";

interface ProviderConfig {
  tokenUrl: string;
  userInfoUrl?: string;
  clientIdEnv: string;
  clientSecretEnv: string;
  extractProfile: (tokenResponse: any, userInfoResponse?: any) => { email: string; name: string } | null;
  extraTokenParams?: Record<string, string>;
}

const PROVIDERS: Record<string, ProviderConfig> = {
  google: {
    tokenUrl: "https://oauth2.googleapis.com/token",
    userInfoUrl: "https://openidconnect.googleapis.com/v1/userinfo",
    clientIdEnv: "GOOGLE_CLIENT_ID",
    clientSecretEnv: "GOOGLE_CLIENT_SECRET",
    extractProfile: (_t, u) => u?.email ? { email: u.email, name: u.name || u.email.split("@")[0] } : null,
  },
  github: {
    tokenUrl: "https://github.com/login/oauth/access_token",
    userInfoUrl: "https://api.github.com/user",
    clientIdEnv: "GITHUB_CLIENT_ID",
    clientSecretEnv: "GITHUB_CLIENT_SECRET",
    extractProfile: (_t, u) => u?.email ? { email: u.email, name: u.name || u.login || u.email.split("@")[0] } : null,
  },
  apple: {
    tokenUrl: "https://appleid.apple.com/auth/token",
    // Apple returns id_token (JWT with email in claims) — no separate userinfo endpoint
    clientIdEnv: "APPLE_CLIENT_ID",
    clientSecretEnv: "APPLE_CLIENT_SECRET",
    extractProfile: (t) => {
      if (!t.id_token) return null;
      try {
        const payload = JSON.parse(Buffer.from(t.id_token.split(".")[1], "base64").toString());
        return payload.email ? { email: payload.email, name: payload.name || payload.email.split("@")[0] } : null;
      } catch { return null; }
    },
  },
};

export async function GET(req: Request, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const cfg = PROVIDERS[provider];
  const url = new URL(req.url);
  const origin = url.origin;

  if (!cfg) return NextResponse.redirect(new URL("/login?error=unknown_provider", req.url));

  const code = url.searchParams.get("code");
  const providerError = url.searchParams.get("error");
  if (providerError) return NextResponse.redirect(new URL(`/login?error=oauth_denied&provider=${provider}`, req.url));
  if (!code) return NextResponse.redirect(new URL(`/login?error=missing_code&provider=${provider}`, req.url));

  const clientId = process.env[cfg.clientIdEnv];
  const clientSecret = process.env[cfg.clientSecretEnv];
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL(`/login?error=oauth_not_configured&provider=${provider}`, req.url));
  }

  try {
    // 1. Exchange auth-code for access token
    const tokenRes = await fetch(cfg.tokenUrl, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: `${origin}/api/auth/oauth/${provider}/callback`,
        ...(cfg.extraTokenParams ?? {}),
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token && !tokenData.id_token) {
      return NextResponse.redirect(new URL(`/login?error=token_exchange_failed&provider=${provider}`, req.url));
    }

    // 2. Fetch user profile (if provider has separate userinfo endpoint)
    let userInfo = undefined;
    if (cfg.userInfoUrl) {
      const userRes = await fetch(cfg.userInfoUrl, {
        headers: {
          authorization: `Bearer ${tokenData.access_token}`,
          "accept": "application/json",
          "user-agent": "3DBuildBot-OAuth", // GitHub requires user-agent
        },
      });
      userInfo = await userRes.json();

      // GitHub: email may be null on /user if user marked email private — fetch /user/emails
      if (provider === "github" && !userInfo.email) {
        const emailsRes = await fetch("https://api.github.com/user/emails", {
          headers: { authorization: `Bearer ${tokenData.access_token}`, "user-agent": "3DBuildBot-OAuth" },
        });
        const emails: Array<{ email: string; primary: boolean; verified: boolean }> = await emailsRes.json();
        const primary = emails.find((e) => e.primary && e.verified) ?? emails.find((e) => e.verified);
        if (primary) userInfo.email = primary.email;
      }
    }

    // 3. Extract normalized {email, name}
    const profile = cfg.extractProfile(tokenData, userInfo);
    if (!profile) {
      return NextResponse.redirect(new URL(`/login?error=no_email&provider=${provider}`, req.url));
    }

    // 4. Log in or create the user
    await loginOrCreateFromOAuth({ email: profile.email, name: profile.name, provider });

    // 5. Success — go to dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (e) {
    console.error(`OAuth ${provider} callback error:`, e);
    return NextResponse.redirect(new URL(`/login?error=oauth_failed&provider=${provider}`, req.url));
  }
}
