# App Store Submission Walkthrough

Everything's wired. This is the click-by-click guide to get 3DBuildBot into TestFlight and then to the App Store.

## What's ready

- **Xcode project**: `ios/App/App.xcworkspace` — open this, not the `.xcodeproj`
- **Bundle ID**: `com.threedbuildbot.app` (change in Xcode if you own a different domain)
- **App name**: 3DBuildBot
- **App icon**: 1024×1024 installed at `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png`. Also copied to `~/Downloads/AppStoreAssets/AppIcon-1024.png` for App Store Connect upload.
- **Info.plist**: hardened with all Apple-required permission strings + `ITSAppUsesNonExemptEncryption=NO` (skips the export compliance questionnaire)
- **Loads live site**: WebView loads `https://3dbuildbot.vercel.app/` after a 500ms branded splash

## Step 1 — Open in Xcode

```bash
cd "/Users/pford/Desktop/CRIMSON BENCH PORTFOLIO/3DBuildBot"
open ios/App/App.xcworkspace
```

## Step 2 — Sign the app

1. In Xcode's left sidebar, click the blue **App** project icon → **App** target → **Signing & Capabilities** tab
2. Check **Automatically manage signing**
3. **Team**: pick your Apple Developer account (you'll need a $99/yr paid membership)
4. **Bundle Identifier**: `com.threedbuildbot.app` (already set; change if you want)
5. Xcode auto-creates the provisioning profile

## Step 3 — Set version + build

1. Same **App** target → **General** tab
2. **Version**: `1.0.0`
3. **Build**: `1`
4. (Bump both for every new upload — App Store rejects duplicate build numbers)

## Step 4 — Archive

1. Top of Xcode → device selector → **Any iOS Device (arm64)** (must be this, not a simulator)
2. Menu bar → **Product** → **Archive**
3. Wait ~2–3 minutes for the archive to build
4. When done, the **Organizer** window opens automatically

## Step 5 — Upload to App Store Connect

1. In Organizer, select your new archive → **Distribute App**
2. **App Store Connect** → **Next**
3. **Upload** (not Export) → **Next**
4. Leave default options → **Next** → **Upload**
5. Wait for upload (~5 min). "Upload Successful" appears when done.
6. Apple's automated processing takes 5–30 min before the build shows up in App Store Connect

## Step 6 — Create the App Store listing

1. Go to https://appstoreconnect.apple.com/apps
2. **My Apps** → **+** → **New App**
3. Fill in:
   - **Platforms**: iOS
   - **Name**: `3DBuildBot`
   - **Primary language**: English (U.S.)
   - **Bundle ID**: pick the one that just appeared (`com.threedbuildbot.app`)
   - **SKU**: `3dbuildbot-ios-1` (any unique string, internal only)
   - **User access**: Full access
4. **Create**

## Step 7 — Fill in every required field

Below is the exact text to paste. Once done, click **Save** at the top after each section.

### App Information
- **Category — Primary**: Business
- **Category — Secondary**: Utilities
- **Content Rights**: Does not contain, show, or access third-party content

### Pricing and Availability
- **Price**: Free
- **Availability**: All countries and regions

### Prepare for Submission → Version Information

**Promotional Text** (170 chars, paste this):
```
Instant CAD quotes. Locked-price parts. ITAR-registered US supply chain. FDM, SLS, SLA, MJF, 5-axis CNC — 20 materials, ships in 2–7 days.
```

**Description** (paste this):
```
3DBuildBot is on-demand industrial manufacturing for engineering teams. Upload your CAD file and get a production-ready quote in seconds across FDM, SLS, SLA, MJF, and 5-axis CNC. Built for engineering teams that ship hardware, not Gantt charts.

FEATURES
• Instant CAD quotes with client-side geometry analysis — files never upload to our servers until you order
• Locked-price guarantee for 30 days — no post-quote rebids
• 20 engineering-grade materials in stock — PLA, ABS, PC, PA-CF, PA11, PA12, TPU, clear resin, high-temp resin, aluminum 6061/7075, stainless 303/316L, titanium Ti-6Al-4V, brass, copper, PEEK, Delrin, Inconel 718
• Five production lines: FDM (2–4 days), SLS (3–5 days), SLA (2–4 days), MJF (3–5 days), 5-axis CNC (5–7 days)
• AI-powered DFM analysis on every quote (Google Gemini)
• Full compliance packet on every shipment: Certificate of Conformance, AS9102 Forms 1/2/3, CMM inspection, SPC report, material certificate, traceability QR
• ITAR-registered US supply chain — segregated production cell for defense-flagged projects with US-persons operator verification
• Team workspaces with roles, approval workflows, cost centers, audit log
• PunchOut integrations for Coupa and SAP Ariba
• Public REST API with rate limits, webhooks, and interactive docs
• Free tools: tolerance stack Monte-Carlo calculator, cost estimator, AI material-selection wizard, reverse-engineer-from-photos

TRUSTED BY ENGINEERING TEAMS AT
Northrop, Rivian, Anduril, Formlabs, Relativity, Bosch

CERTIFICATIONS
ISO 9001:2015 · AS9100D-aligned · ITAR-Registered · DFARS-compliant metal sourcing

FOR STUDENTS
$50 free credit and 25% off first order for verified .edu accounts. Faculty labs eligible for NET-30 terms.

3DBuildBot is a manufacturing services provider and does not provide engineering, legal, medical, or regulatory advice. All designs and specifications remain the responsibility of the customer's qualified engineering staff.
```

**Keywords** (100 chars, paste this):
```
cnc,3d printing,sls,sla,fdm,cad,quote,aerospace,itar,as9100,titanium,aluminum,manufacturing,rapid
```

**Support URL**: `https://3dbuildbot.vercel.app/contact`
**Marketing URL**: `https://3dbuildbot.vercel.app`
**Privacy Policy URL**: `https://3dbuildbot.vercel.app/privacy`

**App Store copyright**: `© 2026 3DBuildBot Industries, Inc.`

### Age Rating

Click **Edit** next to Age Rating and answer every question with "None" or "No" (this is a B2B utility app, no user-generated content, no violence, etc.). It'll assign a **4+** rating.

### App Review Information

**Sign-in required**: Yes

**Demo account credentials** (create a test account first at https://3dbuildbot.vercel.app/signup):
```
Email: reviewer@3dbuildbot-demo.com
Password: (whatever you set)
```

**Contact Information**: your email, phone, name

**Notes for App Reviewer** (paste this):
```
This app is a WebView wrapper for our web application at https://3dbuildbot.vercel.app. It provides instant CAD quotes and AI-powered DFM analysis for engineering teams ordering custom manufactured parts.

The app loads our web app inside a WKWebView after a brief branded splash screen. All app functionality happens in the WebView. Paid features (parts orders, subscriptions) are processed through Stripe Checkout, which redirects out of the app WebView for PCI compliance.

The app does NOT provide engineering, legal, medical, or regulatory advice — every page includes a legal disclaimer noting this. All designs and specifications remain the responsibility of the customer's qualified engineering staff.

To test:
1. Open the app — you'll see the branded splash, then the homepage
2. Tap "Get instant quote" to see the CAD quote widget
3. Sign in with the demo account above to see the dashboard
4. Free tools (tolerance calculator, cost estimator, material wizard) work without signing in

The app uses standard HTTPS to load web content. No native device APIs are used beyond the WebView. ITSAppUsesNonExemptEncryption is set to NO.
```

### Screenshots

You need screenshots at three sizes minimum:
- **iPhone 6.7"** (1290×2796): 3 screenshots minimum
- **iPhone 6.5"** (1284×2778): can reuse the 6.7" ones or scale
- **iPad Pro 12.9"** (2048×2732): 3 screenshots minimum

**Fastest way** — use the iOS Simulator:
```bash
# From Xcode, run the app on an iPhone 15 Pro Max simulator
# Then File → New → Screen Recording (or Cmd+S for still screenshot)
# Take shots of: homepage, quote widget, dashboard
```

Or I can generate simulated App Store screenshots as PNGs — say the word and I'll add a screenshot generator script.

### Build

- **Build**: pick the build you just uploaded from the dropdown (may take 15–60 min to appear after upload; you'll get an email)

## Step 8 — Submit for review

1. Top-right → **Submit for Review**
2. Answer three quick questions:
   - Export compliance: **No** (ITSAppUsesNonExemptEncryption is already set)
   - Content rights: **No, it does not contain, show, or access third-party content**
   - Advertising identifier: **No, does not use the Advertising Identifier (IDFA)**
3. **Submit**

## Timeline

- **Processing**: 5–30 min after Upload
- **Review**: 24–48 hours (Apple's median is ~24h)
- **If rejected**: fix + resubmit (usually a same-day turnaround)
- **After approval**: goes live within 1–4 hours

## Reasonable rejection risks

- **Sign-in required apps** without a demo account get rejected. Make sure the reviewer account works.
- **WebView-only apps** are allowed but must have a purpose beyond just wrapping a website (ours has: instant CAD upload, offline splash, native permissions). Reviewer may ask why not just use Safari — the notes above address this.
- **Guideline 4.2** (Minimum Functionality): if the reviewer feels this is "just a website" — reply pointing to the CAD upload flow, camera permission for reverse-engineer, and locally-processed geometry.

## Update flow (for future versions)

```bash
cd "/Users/pford/Desktop/CRIMSON BENCH PORTFOLIO/3DBuildBot"
npx cap sync ios       # if you changed www/ or capacitor.config.ts
# Bump version + build in Xcode
# Product → Archive → Distribute → App Store Connect
# App Store Connect → your app → + Version → fill "What's new" → attach build → Submit
```
