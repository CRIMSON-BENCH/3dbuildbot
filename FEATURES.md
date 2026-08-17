# 3DBuildBot — Features & Functional Requirements
_Last updated: 2026-08-16 · Scannable list, not spec docs._

**Legend**
- **Priority**: `P0` block launch · `P1` block enterprise revenue · `P2` growth/nice-to-have
- **Status**: `LIVE` already on Lovable · `NEW` build in Next.js · `PORT` migrate from Lovable eventually
- **Effort**: `S` <½ day · `M` ½–2 days · `L` >2 days · `XL` >1 week
- **Who has it** column = competitor benchmark

---

## 0. What's Already Live (from audit of 3dbuildbot.com)

| Feature | Route |
|---|---|
| Homepage with inline CAD drag-drop quote widget (client-side analysis) | `/` |
| Pricing page | `/pricing` |
| Industries index | `/industries` |
| 12 × industry × process × material landing pages | `/industries/on-demand-{proc}-{mat}-{ind}` |
| Auth pages | `/login`, `/signup` |
| Legal | `/terms`, `/privacy`, `/refund` |

_Total: 20 routes. No dashboard, no API, no blog, no materials pages, no cert pages, no /about, no /contact._

---

## 1. Quote Engine & CAD Interaction (the core product)

| # | Feature | Priority | Status | Effort | Who has it |
|---|---|---|---|---|---|
| 1.1 | Drag-drop CAD upload (STEP/STL/IPT/SLDPRT/X_T/CATPART/3MF/JT) | P0 | LIVE | – | All |
| 1.2 | Client-side CAD analysis (files never leave browser) | P0 | LIVE | – | Unique to 3DBB |
| 1.3 | Instant per-part quote by process/material/finish/qty | P0 | LIVE | – | All |
| 1.4 | Interactive 3D viewer (rotate/pan/zoom, wireframe toggle, section) | P0 | NEW | M | Xometry, Protolabs, Fictiv |
| 1.5 | Multi-part quote (upload folder, batch quote in one PO) | P0 | NEW | M | Xometry, Fictiv |
| 1.6 | BOM/CSV upload → auto-quote batch | P1 | NEW | L | Fictiv (partial) |
| 1.7 | Assembly upload (STEP assembly → auto-split parts) | P1 | NEW | L | Xometry, Protolabs |
| 1.8 | Locked-price guarantee for X days after quote | P0 | NEW | S | **Nobody** — wedge |
| 1.9 | Quote save & shareable link | P0 | NEW | S | Xometry, Fictiv |
| 1.10 | Quote versioning (rev A, rev B, diff view) | P1 | NEW | M | Xometry (weak), Fictiv (weak) |
| 1.11 | Bulk-order pricing tiers auto-shown (1, 10, 100, 1k, 10k) | P0 | NEW | S | Protolabs, Xometry |
| 1.12 | Currency + tax handled at checkout (US/CA/EU) | P0 | NEW | S | All |
| 1.13 | Duplicate part, reorder from history | P1 | NEW | S | All |
| 1.14 | Quote-to-PO conversion for enterprise buyers | P1 | NEW | M | Xometry, Fathom |

---

## 2. AI / DFM / Simulation ("the physics")

| # | Feature | Priority | Status | Effort | Model | Who has it |
|---|---|---|---|---|---|---|
| 2.1 | Auto DFM report per part (wall thickness, thin features, undercuts, orientation) | P0 | NEW | L | Gemini Pro + geometry libs | Xometry, Protolabs (both weak) |
| 2.2 | Cost-driver heatmap on 3D viewer (this fillet = $12, tight tolerance = $34) | P0 | NEW | L | Gemini Pro | **Nobody** — wedge |
| 2.3 | Tolerance-stack analysis (per-feature achievable tolerance by process) | P1 | NEW | M | Rules engine | Nobody structured |
| 2.4 | Draft-angle & moldability check (if injection molding added) | P2 | NEW | M | Rules | Protolabs (best) |
| 2.5 | Overhang / support-material estimator (FDM/SLA) | P1 | NEW | M | Rules | Some (weak) |
| 2.6 | Material-selection wizard (8 Qs → ranked shortlist) | P1 | NEW | M | Gemini Pro | Nobody |
| 2.7 | Design-for-cost redesign suggestions (3 alternates at lower price) | P1 | NEW | L | Gemini Pro + vision | Nobody |
| 2.8 | CAD version-diff assistant (plain-English change list + re-quote delta) | P2 | NEW | M | Gemini Pro | Nobody |
| 2.9 | Reverse-engineer from photo (4 photos + coin → dimensioned sketch → STEP) | P2 | NEW | XL | Gemini Vision Pro | Nobody — new category |
| 2.10 | Auto-generate 2D GD&T drawing from STEP | P2 | NEW | L | Gemini Pro + CAD API | Nobody structured |
| 2.11 | STEP → assembly BOM extraction with make-vs-buy suggestion | P2 | NEW | L | Gemini Pro | Nobody |
| 2.12 | Thermal / structural FEA lite (Gemini-guided setup, real solver via 3rd-party API) | P2 | NEW | XL | Gemini Pro + SimScale/Onshape API | Nobody in this segment |
| 2.13 | STL/STEP repair (mesh healing, gap closing) | P1 | NEW | M | Netfabb-style lib or 3rd-party | Xometry (silent) |
| 2.14 | Public tolerance calculator (marketing tool, no login) | P1 | NEW | S | Rules + Gemini | Nobody |
| 2.15 | Public cost estimator (dimensions only, no CAD) | P1 | NEW | S | Gemini Flash | Nobody |
| 2.16 | AI-drafted plain-English part description for shop instructions | P2 | NEW | S | Gemini Flash | Nobody |

---

## 3. User Accounts & Dashboard

| # | Feature | Priority | Status | Effort | Who has it |
|---|---|---|---|---|---|
| 3.1 | Email + password signup / login | P0 | LIVE | – | All |
| 3.2 | Google + Apple SSO | P0 | NEW | S | Most |
| 3.3 | Dashboard: active quotes, orders in production, shipped orders | P0 | NEW | M | All |
| 3.4 | Order timeline / status tracking (queued → machining → QC → shipped) | P0 | NEW | M | Xometry, Fictiv (best) |
| 3.5 | Real-time production photos (per-part QC images) | P1 | NEW | M | RapidDirect |
| 3.6 | Downloadable invoices, packing slips, material certs | P0 | NEW | S | All |
| 3.7 | Part vault (persistent CAD library with search + tags) | P0 | NEW | M | Fictiv (best), Xometry |
| 3.8 | Reorder from vault in 2 clicks | P0 | NEW | S | Fictiv |
| 3.9 | Address book (multiple ship-to + bill-to) | P0 | NEW | S | All |
| 3.10 | Payment methods on file (Stripe card, ACH, NET-30 for approved) | P0 | NEW | S | All |
| 3.11 | Order notifications (email + optional SMS + optional Slack) | P0 | NEW | S | All |
| 3.12 | Password reset, account deletion, GDPR export | P0 | NEW | S | All (legal req) |

---

## 4. Teams & Enterprise Access

| # | Feature | Priority | Status | Effort | Who has it |
|---|---|---|---|---|---|
| 4.1 | Team workspace (shared vault, quotes visible to teammates) | P1 | NEW | L | Xometry (Teamspace), Fictiv |
| 4.2 | Roles: viewer, quoter, approver, admin | P1 | NEW | M | Xometry |
| 4.3 | Approval workflows (quotes >$X need manager approval) | P1 | NEW | M | Xometry, Fictiv |
| 4.4 | SSO / SAML / SCIM provisioning (Okta, Azure AD, Google Workspace) | P1 | NEW | L | Xometry (enterprise only) |
| 4.5 | Audit log (who quoted, ordered, approved, when) | P1 | NEW | M | Xometry |
| 4.6 | Cost centers / project codes attached to orders | P2 | NEW | M | Xometry |
| 4.7 | Team-level analytics (spend by process, by material, by user) | P2 | NEW | M | Xometry, Fictiv |

---

## 5. Procurement Integrations (the wallet)

| # | Feature | Priority | Status | Effort | Who has it |
|---|---|---|---|---|---|
| 5.1 | Coupa PunchOut (cXML) | P1 | NEW | XL | Xometry |
| 5.2 | SAP Ariba PunchOut (cXML) | P1 | NEW | XL | Xometry |
| 5.3 | Microsoft Dynamics 365 connector | P2 | NEW | L | Xometry |
| 5.4 | NetSuite connector (SuiteApp) | P2 | NEW | L | Nobody in mfg |
| 5.5 | Odoo connector | P2 | NEW | M | Nobody |
| 5.6 | PO upload + auto-match to quote | P1 | NEW | M | All (basic) |
| 5.7 | NET-30 / NET-60 credit terms application flow | P1 | NEW | M | Fathom, Xometry |
| 5.8 | Vendor onboarding kit (W-9, COI, banking setup for buyer's procurement dept) | P1 | NEW | S | Fathom |

---

## 6. Public API & Developer

| # | Feature | Priority | Status | Effort | Who has it |
|---|---|---|---|---|---|
| 6.1 | REST API: instant quote endpoint | P1 | NEW | L | Xometry (only) |
| 6.2 | REST API: order create, status, cancel | P1 | NEW | L | Xometry |
| 6.3 | REST API: part vault CRUD | P2 | NEW | M | Xometry |
| 6.4 | Webhooks (order status, quote expiry, shipment) | P1 | NEW | M | Xometry |
| 6.5 | API key management + rate limits + usage dashboard | P1 | NEW | M | Xometry |
| 6.6 | Public API docs site (OpenAPI + interactive tester) | P1 | NEW | M | Xometry |
| 6.7 | Onshape marketplace app (quote from Onshape) | P2 | NEW | L | Nobody |
| 6.8 | Fusion 360 add-in | P2 | NEW | L | Nobody |
| 6.9 | SolidWorks add-in | P2 | NEW | L | Nobody |
| 6.10 | Slack app: /quote command + notification bot | P2 | NEW | M | Nobody |
| 6.11 | MS Teams app | P2 | NEW | M | Nobody |

---

## 7. Quality, Inspection & Compliance

| # | Feature | Priority | Status | Effort | Who has it |
|---|---|---|---|---|---|
| 7.1 | Material certificate delivery (auto per order) | P0 | NEW | S | All |
| 7.2 | Certificate of Conformance (auto PDF) | P0 | NEW | S | All |
| 7.3 | First Article Inspection (FAI) add-on ($) | P1 | NEW | M | Xometry, Fictiv, Fathom |
| 7.4 | AS9102 form set generation | P1 | NEW | M | Fathom, Xometry |
| 7.5 | CMM inspection report add-on ($) | P1 | NEW | M | Xometry, Fictiv |
| 7.6 | Statistical process control report | P2 | NEW | M | Fathom |
| 7.7 | Traceability lot code + QR tag on each part | P2 | NEW | M | Nobody in a slick way |
| 7.8 | Auto-stitched compliance packet per order (cert + FAI + CoC + traceability) | P1 | NEW | M | Nobody smooth |

---

## 8. ITAR / Defense Workspace (a big wedge)

| # | Feature | Priority | Status | Effort | Who has it |
|---|---|---|---|---|---|
| 8.1 | ITAR-flagged project mode (US-only servers, US-persons-only access) | P1 | NEW | L | Xometry (enterprise only) |
| 8.2 | Per-project ACL + audit trail | P1 | NEW | M | Xometry |
| 8.3 | Watermarked CAD previews + no-download shares | P1 | NEW | M | Nobody |
| 8.4 | CMMC-aligned account requirements + attestation | P1 | NEW | M | Xometry (has CMMC L2) |
| 8.5 | Signed NDA-per-quote workflow (upload NDA, e-sign, tied to quote id) | P1 | NEW | M | Fictiv (weak) |
| 8.6 | US-persons operator verification at machine | P1 | NEW | M | Fathom |
| 8.7 | DFARS-compliant metal sourcing tag on materials | P1 | NEW | S | Xometry, Fathom |
| 8.8 | ITAR/AS9100 landing page with cert downloads | P1 | NEW | S | Stratasys Direct |

---

## 9. Payments, Billing & Invoicing

| # | Feature | Priority | Status | Effort | Who has it |
|---|---|---|---|---|---|
| 9.1 | Stripe Checkout (card, Apple Pay, Google Pay) | P0 | NEW | S | All |
| 9.2 | Stripe ACH / bank debit | P1 | NEW | S | Xometry |
| 9.3 | Stripe Subscriptions (buyer plans, API plans) | P0 | NEW | S | Xometry |
| 9.4 | Stripe invoicing (NET-30 send, dunning) | P1 | NEW | S | All |
| 9.5 | Credit limit + auto-hold for over-limit orders | P1 | NEW | M | Xometry, Fathom |
| 9.6 | PO number attached to invoice line items | P1 | NEW | S | All |
| 9.7 | Refund / partial credit workflow (with reason codes) | P0 | NEW | S | All |
| 9.8 | Tax handling: US sales tax by ship-to state (via Stripe Tax) | P0 | NEW | S | All |
| 9.9 | International: VAT / GST / EORI handling | P2 | NEW | M | Xometry |

---

## 10. Post-Processing & Add-ons (revenue extenders)

| # | Feature | Priority | Status | Effort | Who has it |
|---|---|---|---|---|---|
| 10.1 | Anodize Type II + Type III selectable in quote | P0 | NEW | S | All |
| 10.2 | Powder coat, alodine, passivation, painting | P0 | NEW | S | All |
| 10.3 | Bead blast, tumbling, vapor smoothing | P0 | NEW | S | All |
| 10.4 | Laser marking / serial numbering | P1 | NEW | S | Xometry, Protolabs |
| 10.5 | Threaded insert install | P1 | NEW | S | Xometry |
| 10.6 | Heat treat (H900, T6, etc.) | P1 | NEW | S | Fathom |
| 10.7 | Assembly labor line-item | P1 | NEW | M | Fathom, Xometry |
| 10.8 | Rush 1-day / 2-day / weekend expedite | P0 | NEW | S | Xometry, Protolabs |
| 10.9 | Economy tier (10% off for 2× lead time) | P1 | NEW | S | JawsTec (only) — steal this |

---

## 11. Marketing & SEO Infrastructure

| # | Feature | Priority | Status | Effort | Who has it |
|---|---|---|---|---|---|
| 11.1 | Blog CMS (MDX in-repo, no external CMS) | P0 | NEW | S | All |
| 11.2 | Long-form guide/resource hub | P0 | NEW | S | Protolabs (best), Sculpteo, Fictiv |
| 11.3 | Materials pages (per material: props, tolerances, costs, uses) | P0 | NEW | M | Xometry, Protolabs, Craftcloud |
| 11.4 | Process pages (per process: capabilities, tolerances, materials, guides) | P0 | NEW | M | All |
| 11.5 | Process × Material combo pages (programmatic) | P0 | NEW | M | Xometry (best) |
| 11.6 | Industry vertical pages (aero, med, EV, robotics, semi, MRO) | P0 | LIVE (12 combos) | S | Xometry, Fictiv, Protolabs |
| 11.7 | State pages (50 + DC) | P0 | NEW | S | Hubs |
| 11.8 | City × service pages (100 metros × 4 processes ≈ 400) | P0 | NEW | S (programmatic) | Hubs, Shapeways |
| 11.9 | Full "27K city × service × material" long-tail matrix | P1 | NEW | M | Nobody attempts this |
| 11.10 | Comparison pages: 3DBB vs Xometry / Protolabs / Fictiv / Shapeways | P0 | NEW | S | Everyone writes these against everyone |
| 11.11 | Certification landing pages (ISO 9001, AS9100D, ITAR, DFARS) | P0 | NEW | S | Protolabs, Fathom |
| 11.12 | Glossary (200+ terms — GD&T, tolerances, materials, processes) | P1 | NEW | S | Nobody big has this |
| 11.13 | Case studies (5+ named customers) | P1 | NEW | M | Fathom, Fictiv |
| 11.14 | Downloadable Design Essentials PDFs per process (lead magnets) | P1 | NEW | M | Protolabs (biggest asset) |
| 11.15 | Interactive tolerance calculator (public, no login) | P1 | NEW | S | Nobody |
| 11.16 | Interactive cost estimator (public, no login) | P1 | NEW | S | Nobody |
| 11.17 | Sitemap.xml auto-generated for all pages | P0 | NEW | S | All (baseline) |
| 11.18 | JSON-LD structured data on every page (correct schema per type) | P0 | NEW | S | Xometry, Protolabs |
| 11.19 | Programmatic OpenGraph images per page | P1 | NEW | S | Few |
| 11.20 | Multi-language: EN + optional DE/FR/ES/JP with hreflang | P2 | NEW | L | Craftcloud, Materialise |

---

## 12. Growth & Conversion

| # | Feature | Priority | Status | Effort | Who has it |
|---|---|---|---|---|---|
| 12.1 | Referral program (give $X get $X credit) | P1 | NEW | M | Nobody big |
| 12.2 | First-order discount (Stripe promo code integration) | P0 | NEW | S | Xometry ("save up to 50%") |
| 12.3 | Volume-tier auto-discount at quote time | P0 | NEW | S | Protolabs, Xometry |
| 12.4 | Email drip: quote saved but not ordered → 3-touch nurture | P0 | NEW | S | All |
| 12.5 | Cart abandonment recovery (Stripe + email) | P0 | NEW | S | Some |
| 12.6 | Live chat (Intercom / Crisp / Front) | P0 | NEW | S | All |
| 12.7 | Book-a-call scheduler (Cal.com self-hosted or Calendly embed) | P1 | NEW | S | Fathom (best) |
| 12.8 | Reviews & testimonials block (structured data → SERP stars) | P1 | NEW | S | Fictiv, Fathom |
| 12.9 | Trust bar (customer logos: Rivian, Anduril, Northrop, Bosch) | P0 | NEW | S | Fathom, Fictiv |
| 12.10 | Live-status "farm capacity" widget (queue depth per material) | P2 | NEW | M | Nobody |

---

## 13. Admin / Ops (internal, not customer-facing)

| # | Feature | Priority | Status | Effort |
|---|---|---|---|---|
| 13.1 | Admin dashboard: today's orders, quotes, revenue | P0 | NEW | M |
| 13.2 | Order routing (assign to internal print farm vs partner shop) | P0 | NEW | M |
| 13.3 | Partner-shop portal (accept/reject jobs, upload photos, mark shipped) | P1 | NEW | L |
| 13.4 | Manual quote override (engineer edits AI quote before customer sees) | P0 | NEW | S |
| 13.5 | Customer support inbox (Front / Intercom integrated) | P0 | NEW | S |
| 13.6 | Refund + credit issuance UI | P0 | NEW | S |
| 13.7 | Pricing rules editor (per material $/cm³, machine fees, min charges) | P0 | NEW | M |
| 13.8 | User admin (impersonate, comp orders, unlock NET terms) | P0 | NEW | S |
| 13.9 | Content admin (edit blog / guides / materials without deploy) | P1 | NEW | M |
| 13.10 | Analytics: funnel from visit → quote → order → repeat | P0 | NEW | S (PostHog) |

---

## 14. Nice-to-Haves (deprioritized)

| # | Feature | Priority | Effort | Notes |
|---|---|---|---|---|
| 14.1 | Consumer catalog: pre-designed brackets, enclosures, GoPro mounts | P2 | L | Secondary funnel from your "hybrid" answer |
| 14.2 | User-generated marketplace (creators sell designs, 30% take) | P2 | XL | Post-Shapeways-bankruptcy opportunity but heavy build |
| 14.3 | White-label / reseller program (partner API, custom-brand quote widget) | P2 | L | Wholesale channel |
| 14.4 | Mobile app (iOS/Android wrapper of web app) | P2 | M | Steps 13–19 of your original template |
| 14.5 | Sponsored listings (partner shops pay for featured placement) | P2 | S | Only after we have real traffic |
| 14.6 | Educational courses & certifications ($) | P2 | L | Cheap-ish content play |

---

## Summary count by priority

- **P0 (block launch)**: ~40 features
- **P1 (block enterprise revenue)**: ~40 features
- **P2 (growth / nice-to-have)**: ~30 features

**Realistic first release (all P0 only)** = a genuinely competitive digital-native manufacturing platform. That's maybe 3–6 focused build sessions in Next.js.

**All P0 + P1** = full enterprise-ready platform capable of taking Fortune 500 procurement wallets. Additional 4–8 sessions.

**P2** = everything else, done opportunistically.

---

## Open questions before we start building

1. Which existing Lovable pages do you want to LEAVE alone forever vs eventually port? (The 12 industry pages are actually pretty good; homepage + quote widget too.)
2. Auth choice: Clerk (fastest, ~$25/mo at 1K MAU), NextAuth (free, more work), or Supabase Auth (free tier)?
3. Database: Supabase (Postgres + auth + storage bundled) or Neon Postgres + separate services? Supabase is faster to ship.
4. AI: Gemini as directed. Confirm you're OK with Gemini being called from Next.js API routes (server-side, key never exposed).
5. Payment: Stripe confirmed. OK to also enable Stripe Tax + ACH out of the gate?
6. Should ITAR mode be built into v1, or deferred to a later phase? (It's the biggest wedge but also the most compliance overhead.)
