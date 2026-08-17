# Clerk Auth Setup — 5-minute wire-up

Clerk is fully integrated in the code. The site currently runs on the legacy
bcrypt/JWT auth until you add Clerk keys. The moment you add
`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY` to Vercel and redeploy,
`/login` and `/signup` auto-redirect to Clerk's polished pre-built UI at
`/sign-in` and `/sign-up`, and Google/GitHub/Apple/Passkey/Magic-link all work
out of the box.

## What's already done in the code

- `middleware.ts` — Clerk middleware protects `/dashboard`, `/admin`,
  `/partner/jobs`, `/itar-workspace`. Falls back to no-op if Clerk not set up.
- `src/app/layout.tsx` — wrapped in `<ClerkProvider>` when configured; falls
  back to plain shell otherwise.
- `src/app/sign-in/[[...sign-in]]/page.tsx` — Clerk's `<SignIn />` component.
- `src/app/sign-up/[[...sign-up]]/page.tsx` — Clerk's `<SignUp />` component.
- `src/app/api/webhooks/clerk/route.ts` — receives Clerk user.created /
  user.updated / user.deleted events and syncs them into your Neon `db.users`
  table so orders/quotes/teams stay in sync.
- `src/lib/auth.ts getCurrentUser()` — reads Clerk session first; creates the
  local `db.users` shadow record on first login. All existing dashboard/admin
  routes keep working with zero changes.

## Your steps

### 1. Sign up + create a Clerk app (2 min)

1. Go to https://clerk.com → **Sign up** (use your work email)
2. On the "Create application" screen:
   - **App name:** `3DBuildBot`
   - **Sign-in options:** enable **Email**, **Google**, **GitHub**, **Passkey**
     (skip Apple for now — needs paid Apple Dev account, add later)
3. Click **Create application** → land in the dashboard

### 2. Copy the API keys (30 seconds)

On the dashboard's "API Keys" or "Get Started" page you'll see:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Copy both values.

### 3. Add to Vercel (1 min)

Vercel → project settings → Environment Variables → Add:

- **Key:** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` **Value:** `pk_test_...` — check all 3 env boxes
- **Key:** `CLERK_SECRET_KEY` **Value:** `sk_test_...` — check all 3 env boxes

Save.

### 4. Set up the user-sync webhook (2 min)

This is what keeps orders/teams working — Clerk tells our DB when a user
signs up so we can create their team + user record.

1. In Clerk dashboard → **Webhooks** (left sidebar) → **Add Endpoint**
2. **Endpoint URL:** `https://www.3dbuildbot.com/api/webhooks/clerk`
3. **Message Filtering:** subscribe to `user.created`, `user.updated`, `user.deleted`
4. Click **Create**
5. On the created webhook's detail page, look for **Signing Secret** — copy the
   value (starts with `whsec_...`)
6. Back to Vercel env vars → Add:
   - **Key:** `CLERK_WEBHOOK_SECRET` **Value:** `whsec_...` (the value from step 5)

### 5. Redeploy Vercel

Deployments → ⋯ on top row → **Redeploy** → uncheck "Use existing Build Cache"

Wait ~3 min.

### 6. Test

Visit https://www.3dbuildbot.com/signup — you should land on Clerk's polished
pre-built signup UI with Google + GitHub + email options. Sign up with any
method → land on `/dashboard` fully logged in.

## Customization

The Clerk UI already matches your brand (uses the `#3b82f6` blue via
`ClerkProvider appearance` config in `layout.tsx`). To tweak further:

- Colors, typography, borders: https://clerk.com/docs/customization/appearance
- Custom domain (e.g. `accounts.3dbuildbot.com`): Clerk dashboard → **Domains**
- Custom emails: **Emails** section → override subject/body/from-address

## Going to production keys

Clerk gives you **test keys** by default (`pk_test_...` / `sk_test_...`).
These work great for development + small-scale beta. When you're ready:

1. Clerk dashboard → **API Keys** → look for **Production instance**
2. Follow their prompts to verify your domain + set up production
3. Copy the new `pk_live_...` / `sk_live_...` keys
4. Update Vercel env vars → redeploy

Test keys are limited to 100 users. Production keys have the 10K free tier.

## Migration path — legacy accounts

Since you confirmed **zero real users** currently in the legacy system, no
migration needed. All new signups go through Clerk. The legacy bcrypt code
stays in `src/lib/auth.ts` as dead code but doesn't hurt anything.

If you ever DID have legacy users and want to migrate them to Clerk, use
Clerk's Backend API: `POST /v1/users` with the email + name for each
existing user. They'll get a "reset your password" email from Clerk.

## Cost check for your 13 sites

- **Free tier:** unlimited apps, 50,000 MRU per app, all Clerk UI features
- **13 beta apps → $0/month total** (all stay on free)
- Only when ONE app crosses 50,000 monthly active users does it become $20/mo
- Realistically you're looking at $0 for the first 12-18 months

Same steps above work for setting up Clerk in each of your other 12 sites —
each is a separate "application" inside your one Clerk account.
