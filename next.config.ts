import type { NextConfig } from "next";

// Security headers applied to every route. Baseline hardening — no
// third-party scripts allowed except the explicit allow-list.
// Adjust CSP `script-src` if you add analytics/tag-manager beyond Vercel.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live https://js.stripe.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://api.stripe.com https://generativelanguage.googleapis.com wss://vercel.live",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // remove X-Powered-By: Next.js
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      // API responses shouldn't be cached by intermediaries
      { source: "/api/(.*)", headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }] },
    ];
  },
  async redirects() {
    return [
      // Legacy Lovable URL patterns — 307-redirect anything we can guess to the new equivalents.
      { source: "/index", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/services", destination: "/", permanent: true },
      { source: "/get-quote", destination: "/quote", permanent: true },
      { source: "/quote-request", destination: "/quote", permanent: true },
      { source: "/rfq", destination: "/quote", permanent: true },
      { source: "/upload", destination: "/quote", permanent: true },
      { source: "/materials-list", destination: "/materials", permanent: true },
      { source: "/capabilities", destination: "/processes/fdm", permanent: true },
      { source: "/cnc", destination: "/processes/cnc-machining", permanent: true },
      { source: "/3d-printing", destination: "/processes/fdm", permanent: true },
      { source: "/schools", destination: "/education/universities", permanent: true },
      { source: "/universities", destination: "/education/universities", permanent: true },
      { source: "/education", destination: "/for-education", permanent: true },
      { source: "/blog-post/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/posts/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
