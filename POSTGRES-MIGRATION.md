# Vercel Postgres Migration

The app currently uses a **file-backed JSON store** (`data/db.json`) for the demo. That works locally but **cannot persist on Vercel** — serverless filesystems are read-only in production. Signups, quotes, orders will vanish on every deploy.

This file gets you from file-DB → Vercel Postgres in about **15 minutes** of hands-on work.

## Step 1 — Create the Postgres database

1. In your Vercel dashboard: **Storage → Create Database → Postgres → Neon**
2. Give it a name (e.g. `3dbuildbot-prod`), pick a region close to your users, click Create.
3. Vercel auto-attaches these env vars to any project you connect it to:
   ```
   POSTGRES_URL
   POSTGRES_PRISMA_URL
   POSTGRES_URL_NON_POOLING
   POSTGRES_USER
   POSTGRES_HOST
   POSTGRES_PASSWORD
   POSTGRES_DATABASE
   ```
4. Connect it to your `3dbuildbot` Vercel project (Database → your DB → Connect Project).

## Step 2 — Install the client

```bash
npm install --legacy-peer-deps @vercel/postgres
```

## Step 3 — Run this schema in the Vercel Postgres query editor

Copy-paste this whole block into Vercel's Postgres SQL editor and run it. It's idempotent — safe to run multiple times.

```sql
-- Users
create table if not exists users (
  id text primary key,
  email text unique not null,
  password_hash text not null,
  name text not null,
  team_id text not null,
  plan text not null default 'free',
  role text not null default 'owner',
  stripe_customer_id text,
  is_admin boolean default false,
  email_domain text,
  edu_verified boolean default false,
  us_persons_verified boolean default false,
  us_persons_verified_at bigint,
  us_persons_attestation jsonb,
  itar_operator boolean default false,
  operator_initials text,
  referral_code text,
  referred_by_id text,
  referral_credit_cents integer default 0,
  created_at bigint not null
);
create index if not exists users_team_idx on users(team_id);
create index if not exists users_referral_code_idx on users(referral_code);

-- Teams
create table if not exists teams (
  id text primary key,
  name text not null,
  owner_id text not null,
  member_ids jsonb not null default '[]'::jsonb,
  plan text not null default 'free',
  itar_enabled boolean default false,
  billing_email text,
  credit_balance integer default 0,
  approval_threshold_cents integer,
  cost_centers jsonb default '[]'::jsonb,
  net_terms jsonb,
  sso jsonb,
  coupa_shared_secret text,
  ariba_shared_secret text,
  addresses jsonb default '[]'::jsonb,
  payment_methods jsonb default '[]'::jsonb,
  created_at bigint not null
);

-- Parts
create table if not exists parts (
  id text primary key,
  owner_id text not null,
  team_id text not null,
  name text not null,
  filename text not null,
  file_size bigint not null,
  volume_cm3 real not null,
  bbox_mm jsonb not null,
  triangle_count integer,
  hash text not null,
  tags jsonb default '[]'::jsonb,
  itar_flagged boolean default false,
  thumbnail_data text,
  created_at bigint not null,
  updated_at bigint not null
);
create index if not exists parts_team_idx on parts(team_id);
create index if not exists parts_hash_idx on parts(hash);

-- Quotes
create table if not exists quotes (
  id text primary key,
  owner_id text not null,
  team_id text not null,
  part_id text,
  process text not null,
  material text not null,
  finish text,
  expedite text,
  quantity integer not null,
  unit_price_cents integer not null,
  total_price_cents integer not null,
  currency text not null default 'USD',
  lead_time_days text,
  expires_at bigint not null,
  status text not null default 'pending',
  dfm_summary text,
  dfm_issues jsonb,
  cost_drivers jsonb,
  parent_quote_id text,
  share_token text,
  batch_id text,
  po_number text,
  cost_center text,
  approved_by text,
  approved_at bigint,
  created_at bigint not null
);
create index if not exists quotes_team_idx on quotes(team_id);
create index if not exists quotes_share_idx on quotes(share_token);
create index if not exists quotes_parent_idx on quotes(parent_quote_id);

-- Orders
create table if not exists orders (
  id text primary key,
  quote_id text not null,
  owner_id text not null,
  team_id text not null,
  status text not null,
  total_paid_cents integer not null default 0,
  currency text not null default 'USD',
  po_number text,
  stripe_session_id text,
  stripe_payment_intent_id text,
  ship_address jsonb,
  itar_flagged boolean default false,
  timeline jsonb not null default '[]'::jsonb,
  tracking_carrier text,
  tracking_number text,
  expected_ship bigint,
  traceability jsonb,
  routing jsonb,
  created_at bigint not null,
  updated_at bigint not null
);
create index if not exists orders_team_idx on orders(team_id);
create index if not exists orders_status_idx on orders(status);

-- API keys
create table if not exists api_keys (
  id text primary key,
  owner_id text not null,
  team_id text not null,
  prefix text not null,
  last4 text not null,
  hash text not null,
  name text not null,
  scopes jsonb not null default '[]'::jsonb,
  last_used_at bigint,
  revoked_at bigint,
  created_at bigint not null
);
create index if not exists api_keys_hash_idx on api_keys(hash);
create index if not exists api_keys_team_idx on api_keys(team_id);

-- Audit
create table if not exists audit_events (
  id text primary key,
  team_id text not null,
  actor_id text not null,
  action text not null,
  entity text not null,
  entity_id text,
  detail text,
  ip text,
  at bigint not null
);
create index if not exists audit_team_at_idx on audit_events(team_id, at desc);

-- Invites
create table if not exists invites (
  id text primary key,
  team_id text not null,
  email text not null,
  role text not null,
  invited_by_id text not null,
  token text unique not null,
  accepted_at bigint,
  created_at bigint not null,
  expires_at bigint not null
);

-- Webhooks
create table if not exists webhooks (
  id text primary key,
  team_id text not null,
  url text not null,
  events jsonb not null,
  secret text not null,
  last_fired_at bigint,
  last_status_code integer,
  revoked_at bigint,
  created_at bigint not null
);

-- API usage
create table if not exists api_usage (
  id text primary key,
  key_id text not null,
  team_id text not null,
  endpoint text not null,
  status_code integer not null,
  at bigint not null
);
create index if not exists api_usage_key_at_idx on api_usage(key_id, at desc);

-- NDAs, Promos, Reviews, Partners, Tickets, Refunds, Content, Pricing Overrides
create table if not exists ndas ( id text primary key, quote_id text, order_id text, team_id text not null, text text not null, signed_at bigint, signer_name text, signer_email text, signer_title text, signer_ip text, created_at bigint not null );
create table if not exists promos ( id text primary key, code text unique not null, percent_off integer, amount_off_cents integer, min_spend_cents integer, uses_limit integer, uses_count integer default 0, eligible_plan_before jsonb, first_order_only boolean default false, expires_at bigint, disabled_at bigint, created_by text not null, created_at bigint not null );
create table if not exists reviews ( id text primary key, team_id text not null, order_id text, rating integer not null, title text not null, body text not null, author_name text not null, author_role text, author_company text, verified_order boolean default false, process text, material text, published_at bigint, created_at bigint not null );
create table if not exists partners ( id text primary key, name text not null, company_name text not null, contact_email text unique not null, processes jsonb default '[]'::jsonb, region text, active boolean default true, password_hash text, itar_eligible boolean default false, jobs_accepted_count integer default 0, created_at bigint not null );
create table if not exists tickets ( id text primary key, team_id text not null, subject text not null, status text not null default 'open', messages jsonb not null default '[]'::jsonb, order_id text, created_at bigint not null, updated_at bigint not null );
create table if not exists refunds ( id text primary key, order_id text not null, team_id text not null, cents integer not null, reason text not null, issued_by_id text not null, created_at bigint not null );
create table if not exists content ( slug text primary key, kind text not null, title text not null, description text, body text not null, published boolean default false, updated_by_id text, updated_at bigint not null );
create table if not exists pricing_overrides ( key text primary key, value real not null, updated_by_id text, updated_at bigint not null );
```

## Step 4 — Swap the DB layer

Rename `src/lib/db.ts` to `src/lib/db-file.ts` (keeps it around for local demo), then create a new `src/lib/db.ts` that uses `@vercel/postgres`. The API surface is unchanged — every call site keeps working.

A drop-in Postgres implementation of the same `db` API surface will live at `src/lib/db-postgres.ts` (write it in your next session — it's a mechanical translation of ~800 lines and easier to do in a dedicated pass).

For today, the pragmatic path is:

**Option A (fastest to deploy):** deploy as-is with file-DB. Users can sign up + demo the flow but data won't persist across function invocations. Good for a preview link to show the team.

**Option B (production-ready):** dedicate one session to writing `db-postgres.ts` and swapping the export in `db.ts`. About 800 lines of straight SQL translation.

## Step 5 — Env vars in Vercel

Under Project → Settings → Environment Variables, add:

```
AUTH_SECRET             = <run: openssl rand -hex 32>
GEMINI_API_KEY          = <from aistudio.google.com/apikey>
STRIPE_SECRET_KEY       = sk_test_... (or sk_live_...)
STRIPE_PUBLISHABLE_KEY  = pk_test_...
STRIPE_WEBHOOK_SECRET   = whsec_...
RESEND_API_KEY          = re_... (optional, for email drip)
CRON_TOKEN              = <any 32+ char string>
ADMIN_BOOTSTRAP_TOKEN   = <any 32+ char string>
```

Redeploy after adding env vars (Deployments → ... → Redeploy).

## Step 6 — Bootstrap admin

After first user signup on the live site, promote them to admin:

```bash
curl -X POST https://your-vercel-domain/api/admin/promote \
  -H "content-type: application/json" \
  -d '{"email":"you@yourcompany.com","token":"<your-ADMIN_BOOTSTRAP_TOKEN>"}'
```

Log out, log in — sidebar now shows the "admin" badge.
