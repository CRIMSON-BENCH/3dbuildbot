# OAuth Provider Setup — Google, GitHub, Apple

The buttons + backend code are already deployed. Each provider stays dormant
(button just fails gracefully with "oauth_not_configured" error) until you
create an OAuth app at each provider's dev console and add the client ID +
secret to Vercel env vars.

**Callback URL for all providers:** `https://www.3dbuildbot.com/api/auth/oauth/[provider]/callback`

Substitute `[provider]` with `google`, `github`, or `apple` depending on which
provider you're setting up. When setting up in each provider's console, register
BOTH:
- `https://www.3dbuildbot.com/api/auth/oauth/google/callback` (production)
- `https://3dbuildbot.vercel.app/api/auth/oauth/google/callback` (Vercel preview)

---

## 🔵 Google OAuth (do this first — most users have Google)

**Time:** ~10 minutes

1. Go to https://console.cloud.google.com/apis/credentials
2. Create/select a project (call it "3DBuildBot")
3. Click **+ CREATE CREDENTIALS → OAuth client ID**
4. If prompted to configure consent screen first:
   - **User Type:** External
   - **App name:** 3DBuildBot
   - **Support email:** hello@3dbuildbot.com (or your email)
   - **Logo:** upload your logo (optional but recommended)
   - **Authorized domains:** `3dbuildbot.com`
   - **Developer contact:** your email
   - **Scopes:** click Add or Remove Scopes → check `.../auth/userinfo.email` and `.../auth/userinfo.profile` and `openid`
   - **Test users:** add your own email (during testing) — publish later for public
5. Back to **Create OAuth client ID**:
   - **Application type:** Web application
   - **Name:** 3DBuildBot Production
   - **Authorized JavaScript origins:**
     - `https://www.3dbuildbot.com`
     - `https://3dbuildbot.com`
     - `https://3dbuildbot.vercel.app`
   - **Authorized redirect URIs:**
     - `https://www.3dbuildbot.com/api/auth/oauth/google/callback`
     - `https://3dbuildbot.com/api/auth/oauth/google/callback`
     - `https://3dbuildbot.vercel.app/api/auth/oauth/google/callback`
6. Click **CREATE** → copy the Client ID and Client Secret shown

**In Vercel Env Vars:**
- `GOOGLE_CLIENT_ID` = the ID from step 6
- `GOOGLE_CLIENT_SECRET` = the secret from step 6

Both should be checked for all 3 environments (Production / Preview / Development).

---

## ⚫ GitHub OAuth (best for engineering audience)

**Time:** ~5 minutes

1. Go to https://github.com/settings/developers
2. Click **OAuth Apps** in left sidebar → **New OAuth App** (top right)
3. Fill in:
   - **Application name:** 3DBuildBot
   - **Homepage URL:** `https://www.3dbuildbot.com`
   - **Application description:** "Instant CAD quotes for engineers. FDM, SLS, SLA, MJF, 5-axis CNC. ITAR-registered US supply chain."
   - **Authorization callback URL:** `https://www.3dbuildbot.com/api/auth/oauth/github/callback`
4. Click **Register application**
5. On the created app's page, copy the **Client ID** shown
6. Click **Generate a new client secret** → copy the value immediately (shown only once)

**In Vercel Env Vars:**
- `GITHUB_CLIENT_ID` = Client ID from step 5
- `GITHUB_CLIENT_SECRET` = value from step 6

Add secondary callback URL for Vercel preview deployments (optional):
- Back on the GitHub OAuth app settings → add a second app entry OR use "Redirect URLs" if available. Simpler: just have separate GitHub OAuth apps for production vs preview.

---

## 🍎 Apple Sign In (required for iOS App Store)

**Time:** ~30 minutes (requires paid Apple Developer account — $99/year)

**Prerequisite:** You need an Apple Developer account. Sign up at https://developer.apple.com

1. Go to https://developer.apple.com/account/resources/identifiers/list
2. Click **+** to create a new **App ID**:
   - Description: "3DBuildBot"
   - Bundle ID: `com.threedbuildbot.app` (must match Capacitor config)
   - Capabilities: check **Sign In with Apple**
3. Create a new **Services ID** (also in Identifiers list):
   - Description: "3DBuildBot Web Sign In"
   - Identifier: `com.threedbuildbot.web` (this is what goes in `APPLE_CLIENT_ID`)
   - Check **Sign In with Apple** → Configure:
     - Primary App ID: select the one from step 2
     - **Domains:** `www.3dbuildbot.com`, `3dbuildbot.com`
     - **Return URLs:** `https://www.3dbuildbot.com/api/auth/oauth/apple/callback`
4. Create a **Key**:
   - Go to Keys section, click **+**
   - Name: "3DBuildBot Sign In with Apple"
   - Check **Sign In with Apple** → Configure → select the App ID from step 2
   - Download the `.p8` file (only downloadable once — save it!)
   - Note the **Key ID** (10 characters)
5. Find your **Team ID** (top right of Apple Developer portal, 10 characters)
6. Generate a client secret (JWT signed with the .p8 key):
   - Apple's client secret is dynamic — must be regenerated every 6 months
   - Use https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens for the algorithm
   - Or use a Node script: `npm install jsonwebtoken` then sign with your Team ID + Key ID + Services ID
   - Alternatively, use the `apple-signin-auth` npm package to generate at runtime

**In Vercel Env Vars:**
- `APPLE_CLIENT_ID` = Services ID from step 3 (e.g. `com.threedbuildbot.web`)
- `APPLE_CLIENT_SECRET` = the generated JWT (6-month lifespan — set a reminder to rotate)

**⚠️ Apple is the most complex** — if you're not shipping an iOS app in the next 6 months, defer Apple sign-in until you actually need it. Google + GitHub cover 95%+ of users.

---

## Testing your OAuth setup

After adding env vars + redeploying:

1. Visit https://www.3dbuildbot.com/signup
2. Click the provider button (Google / GitHub / Apple)
3. You'll be redirected to that provider's login screen
4. Log in + approve permissions
5. Redirect back to `/dashboard` (logged in as new account)

**If it fails with "oauth_not_configured"** → env vars not set or spelled wrong
**If it fails with "token_exchange_failed"** → client secret wrong, or callback URL doesn't match what you registered
**If it fails with "no_email"** → provider didn't return an email (rare — usually happens with private GitHub profiles; user needs to make email public or verify a primary email)

---

## Cost

All three providers are **free** for our expected volume:
- Google: free, no rate limit for OAuth logins
- GitHub: free, no rate limit
- Apple: $99/year Apple Developer account (only if you want Apple Sign In)

---

## Recommended launch order

1. **Now:** Google (10 min setup, covers 90%+ of users)
2. **This week:** GitHub (5 min setup, huge win for engineering audience)
3. **When you launch iOS app:** Apple (required by App Store review if the iOS app has any sign-in flow)
