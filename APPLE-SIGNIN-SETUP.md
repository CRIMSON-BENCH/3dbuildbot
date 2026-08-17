# Apple Sign-In via Clerk — Step-by-Step

Since we're using Clerk, Apple Sign-In setup is **much simpler** than doing it
manually. Clerk auto-generates and rotates the client secret JWT (Apple requires
this to change every 6 months — Clerk handles it for you).

**Prerequisites:**
- Paid Apple Developer account (you have this ✓)
- Clerk app already configured with `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` +
  `CLERK_SECRET_KEY` set (do this first per CLERK-SETUP.md)

## Time: ~20 minutes total

- Apple Developer Portal: 15 minutes
- Clerk Dashboard: 5 minutes

---

## Part 1: Apple Developer Portal (15 min)

### 1a. Get your Clerk return URL first (30 sec)

Before jumping into Apple's portal, grab the return URL Clerk needs Apple to
know about:

1. Open https://dashboard.clerk.com
2. Select your **3DBuildBot** application
3. Left sidebar → **User & Authentication** → **Social Connections**
4. Find **Apple** in the list → click it → click **Enable**
5. A configuration panel opens. **DO NOT close it** — copy the value labeled
   **"Return URL"** (looks like `https://clerk.your-app-name.com/v1/oauth_callback`
   or `https://[your-app].clerk.accounts.dev/v1/oauth_callback`)
6. Also note the field labels: **Apple Services ID**, **Apple Team ID**, **Apple Key ID**, **Private Key (.p8)** — you'll fill these in Part 2

Keep this Clerk tab open. Move to Apple Developer portal in a new tab.

### 1b. Create an App ID (2 min)

1. Go to https://developer.apple.com/account/resources/identifiers/list
2. Click **+** (top of the list, next to "Identifiers")
3. Select **App IDs** → Continue
4. Select **App** → Continue
5. Fill in:
   - **Description:** `3DBuildBot`
   - **Bundle ID:** `com.threedbuildbot.app` (must match Capacitor config)
6. Scroll down to **Capabilities** → check ✅ **Sign In with Apple**
7. Click **Continue** → **Register**

### 1c. Create a Services ID (this is the "Client ID") (3 min)

1. Back to https://developer.apple.com/account/resources/identifiers/list
2. Click **+** → select **Services IDs** → Continue
3. Fill in:
   - **Description:** `3DBuildBot Web Sign-In`
   - **Identifier:** `com.threedbuildbot.signin` (this becomes your **Apple Services ID** in Clerk)
4. Click **Continue** → **Register**
5. Click on the newly-created Services ID to open its settings
6. Check ✅ **Sign In with Apple** → click **Configure**
7. In the popup:
   - **Primary App ID:** select `3DBuildBot` (the one from step 1b)
   - **Domains and Subdomains:** paste the Clerk return URL domain (just the host — e.g. `clerk.your-app-name.com` or `[your-app].clerk.accounts.dev`)
   - **Return URLs:** paste the full Clerk return URL from step 1a
   - Also add your custom domain:
     - Domain: `accounts.3dbuildbot.com` (optional — for custom Clerk domain later)
     - Return URL: leave blank for now (Clerk handles it)
8. Click **Save** → **Continue** → **Save**

### 1d. Create the Sign-In-with-Apple Key (2 min)

1. Left sidebar → **Keys** (not "Identifiers")
2. Click **+** to create a new key
3. Fill in:
   - **Key Name:** `3DBuildBot Sign In with Apple`
4. Check ✅ **Sign In with Apple** → click **Configure**
5. **Primary App ID:** select `3DBuildBot`
6. Click **Save** → **Continue** → **Register**
7. On the confirmation page, click **Download** — save the `.p8` file somewhere safe. **⚠️ You can only download this ONCE.** If you lose it, you have to delete the key and start over.
8. **Copy the Key ID** shown on this page (10 characters like `A1B2C3D4E5`) — you'll need it in Clerk

### 1e. Get your Team ID (30 sec)

1. Top right of Apple Developer portal, click your name/team → **Membership**
2. Or go to https://developer.apple.com/account
3. Find **Team ID** (10 characters like `AB12CD34EF`) — copy it

---

## Part 2: Paste into Clerk (5 min)

Back in the Clerk dashboard tab you left open (User & Authentication → Social
Connections → Apple):

Fill in the 4 fields:

| Clerk field | Value | Where it came from |
|---|---|---|
| **Apple Services ID** | `com.threedbuildbot.signin` | Part 1c step 3 |
| **Apple Team ID** | `AB12CD34EF` (yours) | Part 1e |
| **Apple Key ID** | `A1B2C3D4E5` (yours) | Part 1d step 8 |
| **Private Key (.p8)** | Click Upload → select the .p8 file | Part 1d step 7 |

Click **Save** at the bottom.

## Part 3: Test (1 min)

1. Wait ~30 seconds for Clerk to activate the connection
2. Visit https://www.3dbuildbot.com/sign-in (or /sign-up)
3. You should now see **"Continue with Apple"** button alongside Google + GitHub
4. Click it → Apple Sign-In flow → land on `/dashboard` fully signed in

---

## For your iOS app

When you build the iOS Capacitor app for App Store submission:

1. In Xcode → your app target → **Signing & Capabilities** → click **+ Capability** → add **Sign In with Apple**
2. Xcode auto-links it to your App ID from Part 1b
3. The iOS Clerk SDK (or the WebView, since Capacitor renders the site) will
   pick up the Apple Sign-In you configured here
4. App Store reviewers test that Apple Sign-In works — since it's real, they'll approve

## Rotation reminder

**Apple's private key doesn't expire.** But Apple requires the client_secret
JWT that Clerk generates from your .p8 to be regenerated every 6 months.
**Clerk does this automatically** — you don't have to touch anything. This
was the biggest pain point of manual Apple Sign-In and Clerk fully solves it.

## Cost

- Apple Developer account: $99/year (you already have this ✓)
- Clerk Apple Sign-In: free (included in all Clerk tiers)
- No per-user or per-login fees from Apple

## Troubleshooting

**"invalid_client" error:** The Services ID doesn't match. Make sure the
Apple Services ID field in Clerk exactly matches the identifier you set in
Part 1c step 3.

**"invalid_grant" error:** The return URL in Apple's Services ID config
doesn't match the one Clerk expects. Double-check they're identical (including
`https://` and no trailing slash).

**Apple button doesn't appear on sign-in page:** Give it 60 seconds for
Clerk to propagate, then hard-refresh (Cmd+Shift+R). If still missing, check
Clerk dashboard → Social Connections → Apple → make sure toggle is Enabled.
