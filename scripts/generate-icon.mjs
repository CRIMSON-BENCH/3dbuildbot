// Generate the 1024x1024 App Store icon as an SVG that we then convert to PNG.
// Design: dark slate background, blue gradient rounded square, bold "3D" wordmark.
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUT_DIR = join(process.cwd(), "ios/App/App/Assets.xcassets/AppIcon.appiconset");
mkdirSync(OUT_DIR, { recursive: true });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="highlight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.20)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <rect width="1024" height="512" fill="url(#highlight)"/>
  <text x="512" y="640" text-anchor="middle" font-family="-apple-system, SF Pro Display, Helvetica, Arial, sans-serif" font-weight="900" font-size="440" fill="#ffffff" letter-spacing="-30">3D</text>
  <text x="512" y="780" text-anchor="middle" font-family="ui-monospace, SF Mono, Menlo, monospace" font-weight="600" font-size="60" fill="rgba(255,255,255,0.85)" letter-spacing="8">BUILDBOT</text>
</svg>`;

writeFileSync(join(OUT_DIR, "AppIcon.svg"), svg);
console.log("Wrote AppIcon.svg. Convert to PNG with:");
console.log(`  cd "${OUT_DIR}"`);
console.log(`  qlmanage -t -s 1024 -o . AppIcon.svg && mv AppIcon.svg.png AppIcon-512@2x.png`);
console.log("Or use an online SVG-to-PNG converter (e.g. cloudconvert.com) at 1024x1024.");
