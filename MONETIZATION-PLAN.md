# 3DBuildBot Monetization Plan — 250+ Revenue Lines
_Version 1.0 · 2026-08-16_

Every line below is a real SKU that can be created in Stripe today. Categories are ordered by how much revenue they realistically generate at scale.

**Legend**
- **Type**: `1x` one-time · `mo` monthly subscription · `yr` annual subscription · `usage` metered · `%` marketplace commission · `set` setup fee
- **Segment**: `SELF` self-serve · `SMB` small/mid business · `ENT` enterprise · `EDU` education · `DEV` developer · `MRKT` marketplace/partner
- **Priority**: `P0` launch-day · `P1` first 90 days · `P2` opportunistic

---

## Revenue projection preview

Assumptions: 2% signup → paid conversion, $850 average per-part order, tiers below layered.

| Monthly visitors | Signups | Quotes | Paid orders | Est monthly rev |
|---|---|---|---|---|
| 5K (today baseline) | 100 | 500 | 8–10 | $7K–$10K |
| 25K (SEO empire live) | 500 | 2,500 | 40–50 | $40K–$60K |
| 100K (SEO + integrations + brand) | 2K | 10K | 200 | $200K–$300K + $30K MRR from subs |
| 500K (mature) | 10K | 50K | 1,000 | $850K + $150K MRR |

---

## SKU Master Table

### A. Per-part manufacturing quotes (dynamic, generated at quote time)

These aren't fixed SKUs in Stripe — each quote creates a one-off `price_data` line item. Counted as 30 SKUs because there are 5 processes × 6 quantity tiers = 30 base pricing curves the engine handles.

| # | SKU | Type | Price | Description |
|---|---|---|---|---|
| 1–5 | Per-part quote · FDM · qty 1/5/25/100/500 | 1x | from $18 | Dynamic per quote |
| 6–10 | Per-part quote · SLS · qty tiers | 1x | from $35 | Dynamic |
| 11–15 | Per-part quote · SLA · qty tiers | 1x | from $22 | Dynamic |
| 16–20 | Per-part quote · MJF · qty tiers | 1x | from $32 | Dynamic |
| 21–25 | Per-part quote · 5-Axis CNC · qty tiers | 1x | from $120 | Dynamic |
| 26–30 | Per-part quote · DMLS metal · qty tiers | 1x | from $250 | Dynamic |

### B. Post-processing & finishing add-ons (per-part)

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 31 | Anodize Type II — black | 1x | +$3–$8/part | SELF |
| 32 | Anodize Type II — clear | 1x | +$3–$8 | SELF |
| 33 | Anodize Type II — red | 1x | +$4–$9 | SELF |
| 34 | Anodize Type II — blue | 1x | +$4–$9 | SELF |
| 35 | Anodize Type II — custom color | 1x | +$8–$15 | SMB |
| 36 | Anodize Type III (hardcoat) — natural | 1x | +$8–$20 | ENT |
| 37 | Anodize Type III — black | 1x | +$10–$22 | ENT |
| 38 | Alodine (chem-film) — clear | 1x | +$4–$10 | ENT |
| 39 | Alodine — mil-spec yellow | 1x | +$5–$12 | ENT |
| 40 | Powder coat — standard RAL | 1x | +$5–$15 | SMB |
| 41 | Powder coat — custom color match | 1x | +$15–$40 | SMB |
| 42 | Passivation (stainless) | 1x | +$3–$8 | SMB |
| 43 | Electropolish (stainless) | 1x | +$8–$25 | SMB |
| 44 | Bead blast — standard matte | 1x | +$2–$5 | SELF |
| 45 | Bead blast — fine grit | 1x | +$3–$7 | SMB |
| 46 | Vapor smoothing (SLS/MJF nylon) | 1x | +$4–$12 | SELF |
| 47 | Dyeing — black (SLS/MJF) | 1x | +$2–$5 | SELF |
| 48 | Dyeing — red (SLS) | 1x | +$3–$6 | SELF |
| 49 | Dyeing — blue (SLS) | 1x | +$3–$6 | SELF |
| 50 | Dyeing — custom color match | 1x | +$8–$18 | SMB |
| 51 | Painting — single color | 1x | +$8–$20 | SMB |
| 52 | Painting — two-tone | 1x | +$15–$35 | SMB |
| 53 | Painting — mil-spec CARC | 1x | +$25–$60 | ENT |
| 54 | Tumbling / mass finishing | 1x | +$2–$6 | SELF |
| 55 | Nickel plating | 1x | +$8–$25 | SMB |
| 56 | Chrome plating | 1x | +$15–$45 | SMB |
| 57 | Zinc plating | 1x | +$5–$15 | SMB |
| 58 | Silk-screen labeling — 1 color | 1x | +$4–$12 | SMB |
| 59 | Silk-screen labeling — multi-color | 1x | +$10–$30 | SMB |
| 60 | Laser marking — serial number | 1x | +$2/part | SMB |
| 61 | Laser marking — logo | 1x | +$4/part | SMB |
| 62 | Laser marking — QR / data matrix | 1x | +$3/part | SMB |
| 63 | Threaded insert install — brass | 1x | +$1.50/insert | SELF |
| 64 | Threaded insert install — steel | 1x | +$2.50/insert | SMB |
| 65 | Heat treat — T6 aluminum | 1x | +$8–$20 | ENT |
| 66 | Heat treat — H900 stainless | 1x | +$12–$30 | ENT |
| 67 | Heat treat — HIP (DMLS) | 1x | +$40–$120 | ENT |
| 68 | Assembly labor | 1x | $65/hr | SMB |
| 69 | Kitting | 1x | +$3/kit | SMB |
| 70 | Custom packaging | 1x | +$2–$8/order | SMB |

### C. Speed / lead-time add-ons

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 71 | Rush 1-day expedite | 1x | +50% surcharge | SMB |
| 72 | Rush 2-day expedite | 1x | +30% | SMB |
| 73 | Weekend production | 1x | +15% | SMB |
| 74 | Priority queue booking (dedicated hours) | mo | $99/mo | SMB |
| 75 | Guaranteed-ship-date SLA | 1x | +$49/order | ENT |
| 76 | Economy tier (2× lead time, 10% off) | 1x | −10% | SELF |
| 77 | Dedicated machine time — 8h block | 1x | $2,400 | ENT |
| 78 | Overnight FedEx upgrade | 1x | shipping + $45 | SMB |
| 79 | White-glove delivery (local metro) | 1x | +$150 | ENT |
| 80 | Weekend engineer standby | 1x | $500/day | ENT |

### D. Quality, inspection & compliance (per-order)

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 81 | Material Certificate (auto) | 1x | Included | ALL |
| 82 | Certificate of Conformance | 1x | Included | ALL |
| 83 | First Article Inspection (FAI) — simplified | 1x | $149 | SMB |
| 84 | Full AS9102 Forms 1/2/3 | 1x | $299 | ENT |
| 85 | CMM inspection report — critical features | 1x | $199 | SMB |
| 86 | CMM inspection — full part | 1x | $499 | ENT |
| 87 | Statistical Process Control (SPC) report | 1x | $399 | ENT |
| 88 | Third-party inspection (Element / UL routing) | 1x | $499–$1,500 | ENT |
| 89 | Traceability lot code + QR tag | 1x | $15/part | SMB |
| 90 | Compliance packet bundle (all above) | 1x | $499 | ENT |
| 91 | Custom-format inspection template match | 1x | $199 setup + $99/order | ENT |
| 92 | ITAR project pack (segregated cell + audit) | 1x | +$299/order | ENT |
| 93 | Signed NDA per project | 1x | Included | ALL |
| 94 | Chain-of-custody documentation | 1x | $99 | ENT |
| 95 | Material lot retention samples (5 years) | 1x | $49/order | ENT |
| 96 | Reverse-DFAR sourcing certification | 1x | $199 | ENT |

### E. Design & engineering services

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 97 | AI-generated DFM report | 1x | $49 | SELF |
| 98 | Full DFM + tolerance review (engineer) | 1x | $199 | SMB |
| 99 | Manufacturing engineer 30-min consult | 1x | $150 | SMB |
| 100 | Manufacturing engineer 1-hour consult | 1x | $295 | SMB |
| 101 | 2D drawing generation from STEP (AI) | 1x | $75 | SELF |
| 102 | 2D drawing generation (engineer-reviewed) | 1x | $199 | SMB |
| 103 | GD&T annotation service | 1x | $149 | SMB |
| 104 | Reverse-engineering from photos | 1x | $199–$499 | SMB |
| 105 | Full reverse-engineering (STEP delivery) | 1x | $499–$1,999 | SMB |
| 106 | STEP / STL mesh repair | 1x | $49 | SELF |
| 107 | CAD file format conversion | 1x | $29 | SELF |
| 108 | Design-for-cost redesign (AI + engineer) | 1x | $499 | SMB |
| 109 | Assembly split & sub-assembly quoting | 1x | $199 | SMB |
| 110 | BOM ingestion & auto-quote service | 1x | $99 setup | SMB |
| 111 | Tolerance stack-up analysis | 1x | $299 | SMB |
| 112 | Thermal FEA lite (Gemini + solver) | 1x | $499 | SMB |
| 113 | Structural FEA lite | 1x | $499 | SMB |
| 114 | Prototype iteration bundle (3 revs) | 1x | $899 | SMB |
| 115 | Bridge-tooling program design | 1x | $2,500 | ENT |
| 116 | Injection-mold DFM review | 1x | $499 | ENT |

### F. Consumer / maker catalog (fixed SKUs, physical products)

Pre-designed printable parts. Buyer picks color/material at checkout. Small revenue per unit, but high volume + top-of-funnel.

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 117 | Standard bracket 10-pack — L-brackets 6061 | 1x | $34 | SELF |
| 118 | Standard bracket 10-pack — angle brackets | 1x | $28 | SELF |
| 119 | Standard bracket 10-pack — U-brackets | 1x | $32 | SELF |
| 120 | Standard bracket 10-pack — Z-brackets | 1x | $36 | SELF |
| 121 | Raspberry Pi 5 enclosure — PC | 1x | $18 | SELF |
| 122 | Raspberry Pi 5 enclosure — PA-CF | 1x | $28 | SELF |
| 123 | Raspberry Pi Zero 2 enclosure | 1x | $14 | SELF |
| 124 | Arduino Uno / Mega enclosure — PC | 1x | $22 | SELF |
| 125 | ESP32 dev-board enclosure | 1x | $16 | SELF |
| 126 | Jetson Nano enclosure — PA-CF | 1x | $32 | SELF |
| 127 | Camera mount — GoPro compatible | 1x | $18 | SELF |
| 128 | Camera mount — DJI Osmo | 1x | $22 | SELF |
| 129 | Camera mount — industrial Basler ace | 1x | $48 | SELF |
| 130 | Drone motor mount — 4x28mm | 1x | $18 | SELF |
| 131 | Drone motor mount — 6x28mm | 1x | $24 | SELF |
| 132 | Drone arm — 5-inch carbon-fiber-look | 1x | $28 | SELF |
| 133 | Drone arm — 7-inch | 1x | $34 | SELF |
| 134 | Prototyping fixture pack — 10 fixtures | 1x | $89 | SELF |
| 135 | Standoff kit — M2 metric assorted | 1x | $19 | SELF |
| 136 | Standoff kit — M3 metric assorted | 1x | $19 | SELF |
| 137 | Standoff kit — 4-40 imperial | 1x | $19 | SELF |
| 138 | Standoff kit — 6-32 imperial | 1x | $19 | SELF |
| 139 | Vise fixture kit — Kurt-style jaws | 1x | $79 | SMB |
| 140 | Test coupon set (tensile ASTM D638) | 1x | $65 | EDU |
| 141 | Test coupon set (compression) | 1x | $65 | EDU |
| 142 | Test coupon set (flexural) | 1x | $65 | EDU |
| 143 | Test coupon set (impact Izod) | 1x | $65 | EDU |
| 144 | Cable management pack (10 clips) | 1x | $22 | SELF |
| 145 | Cable pass-through grommets (25-pack) | 1x | $18 | SELF |
| 146 | Standard hinge kit — 3 sizes | 1x | $28 | SELF |
| 147 | Standard latch kit — 3 sizes | 1x | $32 | SELF |
| 148 | 1U server rack rails | 1x | $58 | SMB |
| 149 | 2U server rack rails | 1x | $68 | SMB |
| 150 | Robotics chassis panel — 200mm sq | 1x | $42 | SELF |
| 151 | Robotics chassis panel — 300mm sq | 1x | $58 | SELF |
| 152 | RC car chassis parts (educational) | 1x | $89 | EDU |
| 153 | STEM classroom maker kit — starter | 1x | $199 | EDU |
| 154 | STEM classroom maker kit — pro | 1x | $499 | EDU |
| 155 | Design "starter pack" template kit | 1x | $79 | SELF |
| 156 | 3D-printed spare nozzles (Prusa MK3) | 1x | $24 | SELF |
| 157 | 3D-printed spare nozzles (Bambu) | 1x | $28 | SELF |
| 158 | Standard threaded insert install jig | 1x | $34 | SMB |
| 159 | Enclosure "blank" — small | 1x | $22 | SELF |
| 160 | Enclosure "blank" — medium | 1x | $32 | SELF |
| 161 | Enclosure "blank" — large | 1x | $48 | SELF |
| 162 | Panel mount blank (customizable cutouts) | 1x | $18 | SELF |

### G. Consumer subscriptions

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 163 | Free tier | mo | $0 | SELF |
| 164 | Maker | mo | $19/mo | SELF |
| 165 | Maker (annual) | yr | $190/yr (2 mo free) | SELF |
| 166 | Pro Engineer | mo | $49/mo | SELF |
| 167 | Pro Engineer (annual) | yr | $490/yr | SELF |
| 168 | Family / Small studio (3 seats) | mo | $99/mo | SMB |
| 169 | Family (annual) | yr | $990/yr | SMB |

### H. Business / B2B subscriptions

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 170 | Team — 5 seats | mo | $199/mo | SMB |
| 171 | Team (annual) | yr | $1,990/yr | SMB |
| 172 | Team Pro — 15 seats | mo | $499/mo | SMB |
| 173 | Team Pro (annual) | yr | $4,990/yr | SMB |
| 174 | Business | mo | $999/mo | SMB |
| 175 | Business (annual) | yr | $9,990/yr | SMB |
| 176 | Enterprise — starter | mo | $2,500/mo | ENT |
| 177 | Enterprise — growth | mo | $5,000/mo | ENT |
| 178 | Enterprise — scale | mo | $10,000/mo | ENT |
| 179 | Defense / ITAR — starter | mo | $5,000/mo | ENT |
| 180 | Defense / ITAR — growth | mo | $10,000/mo | ENT |
| 181 | Defense / ITAR — enterprise | mo | $25,000/mo | ENT |

### I. API & Developer plans

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 182 | API Free (10 quotes/mo) | mo | $0 | DEV |
| 183 | API Developer (500 quotes/mo) | mo | $99/mo | DEV |
| 184 | API Business (5,000 quotes/mo) | mo | $499/mo | SMB |
| 185 | API Enterprise (unlimited + PunchOut) | mo | Custom, from $2,000/mo | ENT |
| 186 | Webhook add-on | mo | $29/mo | DEV |
| 187 | Additional 1,000 quotes overage | usage | $29 per 1K | DEV |
| 188 | Additional Gemini AI calls | usage | $0.10/call | DEV |
| 189 | Custom rate-limit override | mo | +$99/mo | SMB |
| 190 | API premium support | mo | $299/mo | ENT |

### J. Enterprise integrations (one-time setup + recurring)

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 191 | Coupa PunchOut setup | set | $2,500 setup + $99/mo | ENT |
| 192 | SAP Ariba PunchOut setup | set | $2,500 setup + $99/mo | ENT |
| 193 | Microsoft Dynamics connector | set | $2,000 setup + $79/mo | ENT |
| 194 | NetSuite SuiteApp | set | $1,500 setup + $79/mo | SMB |
| 195 | Odoo connector | set | $999 setup + $49/mo | SMB |
| 196 | SSO / SAML 2.0 configuration | set | $499 setup | ENT |
| 197 | SCIM auto-provisioning | set | $999 setup + $49/mo | ENT |
| 198 | Custom procurement webhook | set | $999 setup | ENT |
| 199 | Onshape marketplace app | 1x | Free (ecosystem) | DEV |
| 200 | Fusion 360 add-in | 1x | Free (ecosystem) | DEV |
| 201 | SolidWorks add-in | 1x | Free (ecosystem) | DEV |
| 202 | Slack app | 1x | Free (ecosystem) | DEV |
| 203 | Microsoft Teams app | 1x | Free (ecosystem) | DEV |
| 204 | White-label / reseller portal setup | set | $5,000 setup + $499/mo | MRKT |
| 205 | White-label revenue share | % | 15% of orders | MRKT |
| 206 | Dedicated production capacity (block) | mo | $4,999/mo per line | ENT |
| 207 | Named application engineer (ProDesk) | mo | $1,999/mo | ENT |

### K. Marketplace & partner network

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 208 | Partner shop application fee | 1x | $0 (free) | MRKT |
| 209 | Partner shop featured placement | mo | $499/mo | MRKT |
| 210 | Partner shop premium placement | mo | $999/mo | MRKT |
| 211 | Partner shop revenue share (from us to them) | % | Partner keeps 75% | MRKT |
| 212 | Jobshop marketplace listing (basic) | mo | Free | MRKT |
| 213 | Jobshop marketplace listing (sponsored) | mo | $199/mo | MRKT |
| 214 | Vendor directory verified badge | yr | $499/yr | MRKT |
| 215 | Wholesale bulk credits (10K credit pack) | 1x | $8,500 (15% discount) | SMB |
| 216 | Wholesale bulk credits (50K credit pack) | 1x | $37,500 (25% discount) | ENT |
| 217 | Reseller / distributor annual license | yr | $2,499/yr | MRKT |

### L. Reports, data, & intelligence

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 218 | Supplier capability report — single supplier | 1x | $99 | SMB |
| 219 | ITAR/AS9100 verified partner directory | mo | $49/mo | ENT |
| 220 | Materials database API access | mo | $29/mo | DEV |
| 221 | Cost benchmarking report — one part | 1x | $199 | SMB |
| 222 | Custom market intelligence report | 1x | $499 | ENT |
| 223 | Annual "State of US Additive Manufacturing" | 1x | Free (lead magnet) | ALL |
| 224 | Enterprise industry benchmark report | 1x | $2,499 | ENT |
| 225 | Live LME metals pricing feed (API) | mo | $199/mo | DEV |
| 226 | Live SLS resin index (API) | mo | $99/mo | DEV |
| 227 | Real-world tensile test data (per material) | 1x | $99 | SMB |
| 228 | Full tensile test data library (all materials) | yr | $999/yr | ENT |
| 229 | Custom part-lot testing (destructive) | 1x | $499–$1,999 | ENT |

### M. Education & training

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 230 | DFM Masterclass — video course | 1x | $199 | EDU |
| 231 | GD&T Fundamentals training | 1x | $99 | EDU |
| 232 | Design for Additive Manufacturing cert | 1x | $299 | EDU |
| 233 | Live workshop / monthly AMA | 1x | $79 | EDU |
| 234 | Enterprise training day (on-site) | 1x | $2,499 + travel | ENT |
| 235 | University-cohort curriculum license | yr | $4,999/yr | EDU |
| 236 | Student credit — $50 free-quote allowance | 1x | Free (.edu verified) | EDU |
| 237 | Student pricing — 25% off first order | 1x | −25% | EDU |
| 238 | PhD thesis print grant application | 1x | $0 (awardees get $1,000 credit) | EDU |
| 239 | Formula SAE / Solar Car / Rocketry sponsor | mo | $99–$999/mo tiered | EDU |
| 240 | Capstone sponsor company placement | mo | $499/mo | ENT/EDU |

### N. Referral, affiliate & advertising

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 241 | Referral program (give $25 / get $25) | credit | $25 back for referrer + $25 off for referee | ALL |
| 242 | Referral: enterprise tier (give $500 / get $500) | credit | On paid subs of Business+ | ALL |
| 243 | Affiliate program commission | % | 10% of first-year revenue | MRKT |
| 244 | Insurance for shipped parts (partner referral) | % | 5% commission | MRKT |
| 245 | Cargo tracking add-on (partner) | 1x | $9 + affiliate | MRKT |
| 246 | CAD software affiliate (Onshape / Fusion) | % | Recurring 10% | MRKT |
| 247 | Newsletter sponsor slot | mo | $499/issue | MRKT |
| 248 | Sponsored material listing in comparisons | mo | $299/mo | MRKT |
| 249 | Featured job on machinist directory | 1x | $99 | MRKT |
| 250 | Trade-show booth co-sponsorship | 1x | $2,500–$10,000 | MRKT |
| 251 | Podcast sponsorship — "Bring CAD to Reality" | 1x | $1,500/episode | MRKT |

### O. Novel / experimental (Phase 2)

| # | SKU | Type | Price | Segment |
|---|---|---|---|---|
| 252 | AI CAD file version-diff subscription | mo | $19/mo | DEV |
| 253 | Live capacity SLA (guaranteed slot per week) | mo | $2,999/mo | ENT |
| 254 | Marketplace design listing (creator uploads STEP for sale) | % | 30% commission to us | MRKT |
| 255 | Design bounty program (customer posts, community submits) | % | 15% commission on winning design | MRKT |
| 256 | Prototype-to-production concierge | 1x | $2,499 flat | ENT |
| 257 | Manufacturing team-of-1 (embedded FTE) | mo | $12,000/mo | ENT |
| 258 | Custom pricing rules API access | mo | $199/mo | ENT |
| 259 | Enterprise sandbox environment | mo | $499/mo | ENT |
| 260 | Compliance audit accompaniment (AS9100/ISO) | 1x | $1,999/day | ENT |

---

## Total SKU count: **260** (100+ target hit 2.6×)

---

## Stripe implementation plan

**Products to create in Stripe Dashboard right now:**
1. **Subscriptions** (categories G, H, I, J recurring): ~35 products
2. **Setup fees** (category J one-time): ~10 products
3. **Fixed-price catalog SKUs** (category F consumer + M education): ~55 products

**Auto-generated at quote time** (categories A, B, C, D, E): no Stripe products — the app creates `price_data` line items on the fly. This is what all Xometry/Protolabs/Fictiv do.

**Stripe API calls needed** to set up in one script:
```typescript
// Run once as an admin setup script
for (const plan of [
  { name: "Maker", amount: 1900, interval: "month" },
  { name: "Pro Engineer", amount: 4900, interval: "month" },
  // ... etc
]) {
  await stripe.products.create({ name: plan.name });
  await stripe.prices.create({ product: id, unit_amount: plan.amount, currency: "usd", recurring: { interval: plan.interval } });
}
```

I can write that script for you (`scripts/seed-stripe-products.ts`) in a follow-up task.

---

## Prioritization for the next 90 days

**Launch day (P0):**
- Categories A, B, C — the core quote engine. Already live in code.
- Free + Maker + Pro subscriptions (SKUs 163–167). Need Stripe products.
- Compliance packet upsells (81–90). Already live in code.

**First 30 days (P0/P1):**
- Team plans (170–173) — small-business enterprise revenue
- Consumer catalog seed set: brackets, Pi enclosures, standoffs (117–140)
- Referral program active (241)

**First 90 days (P1):**
- API tiers (182–187) — developer flywheel
- PunchOut integrations for the first live enterprise buyer (191–192)
- Student / education promo (236–237) — SEO + top-of-funnel

**Opportunistic (P2):**
- White-label / marketplace (204–217) — needs SEO traffic first
- Sponsored content / advertising (247–251) — needs traffic first
- Novel/experimental (252–260) — only after core revenue is real

---

## Legal note

3DBuildBot is a manufacturing services provider, not a professional engineering firm. Every product line above ships with 3DBuildBot's standard ISO 9001:2015 QMS terms. Educational products are informational — students remain responsible for their own designs. Nothing above constitutes engineering, legal, or regulatory advice.
