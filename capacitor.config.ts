import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.threedbuildbot.app",
  appName: "3DBuildBot",
  webDir: "www",
  server: {
    // Load the live production site inside the WebView.
    // When testing a preview build, swap this to your Vercel preview URL.
    url: "https://3dbuildbot.vercel.app",
    cleartext: false,
    allowNavigation: [
      "3dbuildbot.com",
      "*.3dbuildbot.com",
      "3dbuildbot.vercel.app",
      "*.vercel.app",
      "*.stripe.com",
      "checkout.stripe.com",
      "*.google.com",
      "accounts.google.com",
      "*.apple.com",
      "*.microsoft.com",
      "cal.com",
      "*.cal.com",
    ],
  },
  ios: {
    contentInset: "always",
    backgroundColor: "#020617", // slate-950 to match dark hero
    limitsNavigationsToAppBoundDomains: false,
    scheme: "3DBuildBot",
  },
};

export default config;
