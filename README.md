# 3DBuildBot

**Industrial manufacturing, quoted instantly.**

On-demand CAD-to-part platform for engineering teams. Upload a STEP or STL, get a
locked-price quote in seconds across FDM · SLS · SLA · MJF · 5-axis CNC. AS9100D-aligned,
ITAR-registered US supply chain.

Live: https://www.3dbuildbot.com

## Stack

- Next.js 15 App Router · React 19 · TypeScript strict
- Tailwind CSS · dark-mode-first
- File-backed JSON DB with automatic Postgres switchover (`@vercel/postgres`)
- Bcrypt + jose JWT session cookies (HTTP-only)
- Google Gemini 2.5 (Flash + Pro Vision) with rate-limit + budget guards
- Stripe checkout · subscriptions · webhooks
- Three.js CAD viewer + occt-import-js WASM for STEP parsing
- jsPDF for compliance packet generation (CoC · AS9102 · CMM · material cert)
- Capacitor iOS wrapper

## 4,282 static pages

Programmatic SEO covers:
- 20 engineering materials · 5 processes · 20 process×material combos
- 6 industries · 6 competitor comparisons · 5 certifications
- 50 DFM/materials guides · 30 glossary terms · 25 blog posts · 50 puzzles
- 493 US cities · 500 international cities · 51 states
- 2,082 universities/colleges/CCs · 20 STEM high schools
- 650 standard hardware parts (fasteners, bearings, motors, standoffs, inserts)
- 14 physics/math/machining solvers · 60 machines · 6 buyer personas

## Development

```bash
npm install --legacy-peer-deps
npm run dev
```

Requires `.env.local` — see `.env.example`.

## Production deploy

Auto-deploys to Vercel on push to `main`. Environment variables set in Vercel dashboard.

## Security

- Report vulnerabilities: security@3dbuildbot.com (see `/.well-known/security.txt`)
- Dependabot enabled for weekly npm updates + immediate CVE patches
- Rate-limited on all AI + auth endpoints (see `src/lib/rate-limit.ts`)
- CSP + HSTS + X-Frame-Options headers on all routes

## License

Proprietary. All rights reserved.
