# Optional Environment Variables — Add When You're Ready

The site works perfectly without any of these. Each one **silently no-ops** when unset — no errors, no crashes, just the feature stays dormant. Add them in any order, any time.

Everything below goes in **Vercel → Project → Settings → Environment Variables**.
Always check all 3 environment boxes (Production / Preview / Development) unless noted.
Redeploy after adding any batch of env vars (Deployments → ⋯ → Redeploy → uncheck build cache).

---

## Tier 1 — Recommended for beta launch

Adds real safety-nets + admin ability without needing any third-party signup beyond what you already have.

### `GEMINI_DAILY_BUDGET_USD`
- **What it enables:** Kill-switch that stops all Gemini AI calls when daily spend hits the ceiling. Belt-and-suspenders on top of the Google Cloud budget cap you already set.
- **Where to get it:** Nowhere — just pick a number. Recommended: `10` (= $10/day cap). Adjust to comfort.
- **Value format:** integer (e.g. `10`, `25`, `50`)

### `CRON_TOKEN`
- **What it enables:** Protects `/api/cron/abandoned-quotes` endpoint from being triggered by attackers to spam-email your users. Without it, the endpoint uses "dev-cron" as fallback (weak).
- **Where to get it:** Generate a random string (Terminal: `openssl rand -base64 24`, or use Safari's password generator, or pick one from a set I gave you and modify)
- **Value format:** any long random string, 24+ chars

### `ADMIN_BOOTSTRAP_TOKEN`
- **What it enables:** One-time token to promote your own account to admin on first signup. Without it, no admin exists on the site.
- **Where to get it:** Generate a random string (same method as CRON_TOKEN)
- **Value format:** any long random string, 24+ chars
- **⚠️ Special:** DELETE this env var after you've used it once to make yourself admin. Leaving it live is a security risk.

---

## Tier 2 — Real transactional email

Right now, order confirmations + contact form submissions + newsletter signups just get logged to the console. Nobody actually receives an email. To fix that:

### `RESEND_API_KEY`
- **What it enables:** All transactional emails — order confirmations, quote share links, contact-form forwarding, newsletter signups
- **Where to get it:**
  1. Sign up free at https://resend.com (3,000 emails/month free tier)
  2. Verify your `3dbuildbot.com` domain (Resend gives you DNS records to add in Namecheap)
  3. Dashboard → API Keys → Create API Key → copy the value starting with `re_...`
- **Value format:** `re_...`

### `RESEND_NEWSLETTER_AUDIENCE_ID`
- **What it enables:** Newsletter signups from the footer form get added to a Resend Audience you can then broadcast to
- **Where to get it:**
  1. In Resend dashboard → Audiences → Create Audience → name it "3DBuildBot Newsletter"
  2. Copy the Audience ID (looks like `78f2c...` UUID)
- **Value format:** UUID

---

## Tier 3 — SEO verification (do this before submitting sitemap)

### `GOOGLE_SITE_VERIFICATION`
- **What it enables:** Google Search Console verification (required to submit sitemap)
- **Where to get it:**
  1. https://search.google.com/search-console → Add property
  2. Enter `3dbuildbot.com`
  3. Choose verification method: **"HTML tag"**
  4. Google shows a `<meta name="google-site-verification" content="XXXXX" />` — copy just the `XXXXX` value (not the whole tag)
- **Value format:** ~44-char string

### `BING_SITE_VERIFICATION`
- **What it enables:** Bing Webmaster Tools verification (Bing/Yahoo indexing)
- **Where to get it:**
  1. https://www.bing.com/webmasters → Add site → `3dbuildbot.com`
  2. Choose method: **"Meta tag"**
  3. Copy the `content="..."` value only
- **Value format:** ~44-char string

---

## Tier 4 — CAD platform integrations

Turn `/api/cad/translate` and `/api/onshape/oauth` from scaffolds into working endpoints.

### `FORGE_CLIENT_ID` + `FORGE_CLIENT_SECRET`
- **What it enables:** Universal CAD viewer — accept proprietary formats (SLDPRT, CATPART, IPT, IGES, JT, X_T) by translating to STEP via Autodesk Platform Services
- **Where to get it:**
  1. https://aps.autodesk.com (formerly Forge) → Sign up (free tier includes translation)
  2. Applications → Create Application → name it "3DBuildBot Universal Viewer"
  3. Copy Client ID + Client Secret
- **Value format:** hex strings

### `ONSHAPE_CLIENT_ID` + `ONSHAPE_CLIENT_SECRET` + `ONSHAPE_REDIRECT_URL`
- **What it enables:** Onshape marketplace app — 150K+ Onshape users can right-click any part → "Get 3DBuildBot quote" without leaving Onshape
- **Where to get it:**
  1. https://dev-portal.onshape.com → Create Application
  2. App name: "3DBuildBot"
  3. Redirect URLs: `https://3dbuildbot.com/api/onshape/oauth/callback`
  4. Copy Client ID + Client Secret
  5. Set `ONSHAPE_REDIRECT_URL` env var to `https://3dbuildbot.com/api/onshape/oauth/callback` (same URL)
- **Value format:** UUIDs

---

## Tier 5 — Notifications + error tracking (optional but nice)

### `SLACK_SIGNING_SECRET`
- **What it enables:** If you set up a Slack app to receive order notifications, this verifies incoming Slack requests are legit
- **Where to get it:** Slack app config → Basic Information → Signing Secret
- **Value format:** hex string
- **Skip if:** You're not using Slack notifications

### Sentry error tracking (custom variable)
- **What it enables:** Runtime errors on production get sent to Sentry so you can debug real user issues
- **Where to get it:**
  1. Sign up free at https://sentry.io (5k errors/month free tier)
  2. Create Next.js project
  3. Copy the DSN URL (looks like `https://abc123@o12345.ingest.sentry.io/67890`)
  4. Follow their Next.js integration guide to wire up
- **Env var name:** varies by their SDK setup instructions
- **Value format:** URL

---

## When you're done adding env vars

1. Redeploy: Vercel → Deployments → ⋯ on top row → Redeploy → uncheck "Use existing Build Cache"
2. Verify: visit `https://3dbuildbot.com/api/health?deep=1` — should return `{"ok": true, ...}` with all checks green

## What's already set (from initial setup — do NOT re-add these)

| ✅ Already added | Where you got it |
|---|---|
| `GEMINI_API_KEY` | https://aistudio.google.com/app/apikey |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Webhooks → 3dbuildbot-production → Signing secret |
| `AUTH_SECRET` | Generated (Safari password suggest / openssl / self-made) |
| `POSTGRES_*`, `DATABASE_URL`, `PG*` | Auto-added by Neon integration |
| `NEON_*`, `VITE_NEON_AUTH_URL` | Auto-added by Neon integration |
