"use client";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const nav = {
  Capabilities: [
    { label: "FDM 3D Printing", href: "/processes/fdm", desc: "Thermoplastics · 2–4 days" },
    { label: "SLS 3D Printing", href: "/processes/sls", desc: "Production nylon · 3–5 days" },
    { label: "SLA 3D Printing", href: "/processes/sla", desc: "Optical resin · 2–4 days" },
    { label: "MJF 3D Printing", href: "/processes/mjf", desc: "HP production nylon" },
    { label: "5-Axis CNC", href: "/processes/cnc-machining", desc: "±0.025mm · ITAR-eligible" },
  ],
  Materials: [
    { label: "Nylons (PA-CF · PA11 · PA12 · TPU)", href: "/materials?cat=nylon", desc: "Production 3DP" },
    { label: "Aluminum (6061 · 7075)", href: "/materials?cat=aluminum", desc: "Machined + anodized" },
    { label: "Titanium (Ti-6Al-4V)", href: "/materials/titanium-ti6al4v", desc: "ITAR · biocompat" },
    { label: "Stainless (303 · 316L)", href: "/materials?cat=stainless", desc: "Marine + medical" },
    { label: "Inconel · PEEK · Delrin", href: "/materials?cat=advanced", desc: "Superalloys + engineering polymers" },
    { label: "All 20 materials →", href: "/materials", desc: "" },
  ],
  Industries: [
    { label: "Aerospace & Defense", href: "/industries/aerospace-defense", desc: "AS9100D · ITAR" },
    { label: "Robotics", href: "/industries/robotics", desc: "End-effectors · chassis" },
    { label: "Electric Vehicles", href: "/industries/electric-vehicles", desc: "Battery + interior" },
    { label: "Medical Devices", href: "/industries/medical", desc: "Biocompat + ISO 13485" },
    { label: "Electronics", href: "/industries/electronics", desc: "Enclosures + brackets" },
    { label: "Industrial & MRO", href: "/industries/industrial", desc: "Reverse-eng from photo" },
  ],
  Resources: [
    { label: "DFM & Design Guides", href: "/guides", desc: "10+ engineer-grade guides" },
    { label: "Materials Datasheets", href: "/materials", desc: "20 materials, real data" },
    { label: "Tolerance Calculator", href: "/tools/tolerance-calculator", desc: "GD&T Monte-Carlo · shareable" },
    { label: "Cost Estimator", href: "/tools/cost-estimator", desc: "No login required" },
    { label: "Material Wizard (AI)", href: "/tools/material-wizard", desc: "Gemini-ranked recommendations" },
    { label: "Design Essentials PDFs", href: "/design-essentials", desc: "Free DFM guides per process" },
    { label: "Reverse-engineer from photo", href: "/tools/reverse-engineer", desc: "Gemini Vision AI" },
    { label: "Physics & math solvers", href: "/tools/solvers", desc: "Beam · Reynolds · torque · thermal + 10 more" },
    { label: "Standard parts library", href: "/parts", desc: "Free CAD for fasteners, bearings, motors + custom quotes" },
    { label: "Reviews", href: "/reviews", desc: "Verified customer reviews" },
    { label: "Book a call", href: "/book-a-call", desc: "30 min with an engineer" },
    { label: "Integrations", href: "/integrations", desc: "Onshape · Fusion · Slack · Teams" },
    { label: "For prototypers →", href: "/for-prototypers", desc: "Hardware startups · students · makers" },
    { label: "For job shops →", href: "/for-shops", desc: "Partner network · keep 70%" },
    { label: "Glossary", href: "/glossary", desc: "Terms every engineer needs" },
    { label: "Certifications", href: "/certifications", desc: "ISO 9001 · AS9100D · ITAR" },
  ],
  Compare: [
    { label: "vs Xometry", href: "/compare/xometry", desc: "Take-rate + rebids" },
    { label: "vs Protolabs", href: "/compare/protolabs", desc: "Price + speed" },
    { label: "vs Fictiv", href: "/compare/fictiv", desc: "ITAR gap" },
    { label: "vs Fathom", href: "/compare/fathom", desc: "UX + self-serve" },
    { label: "vs RapidDirect", href: "/compare/rapiddirect", desc: "US supply chain" },
    { label: "vs Shapeways", href: "/compare/shapeways", desc: "5-axis CNC gap" },
  ],
};

export function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="inline-flex h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 items-center justify-center text-white font-bold text-sm shadow-md shadow-brand-500/30">3D</span>
            <span className="font-semibold tracking-tight text-slate-900 dark:text-slate-100">3DBuildBot</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setOpen(null)}>
            {Object.entries(nav).map(([label, items]) => (
              <div key={label} className="relative" onMouseEnter={() => setOpen(label)}>
                <button className="px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  {label}
                </button>
                {open === label && (
                  <div className="absolute left-0 top-full pt-2 w-[500px] animate-fade-in">
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-2 grid grid-cols-2 gap-1">
                      {items.map((it) => (
                        <Link key={it.href} href={it.href} className="flex flex-col rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-slate-800 group">
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400">{it.label}</span>
                          {it.desc && <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{it.desc}</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="hidden sm:inline-block px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Sign in</Link>
          <Link href="/quote" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium shadow-sm shadow-brand-600/20 transition-colors">
            Get instant quote
          </Link>
          <button onClick={() => setMobile((m) => !m)} className="lg:hidden p-2 -mr-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M3 5h14v2H3zm0 4h14v2H3zm0 4h14v2H3z" /></svg>
          </button>
        </div>
      </div>
      {mobile && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-3 space-y-3">
          {Object.entries(nav).map(([label, items]) => (
            <details key={label} className="group">
              <summary className="text-sm font-semibold py-2 cursor-pointer">{label}</summary>
              <div className="pl-3 space-y-1 pb-2">
                {items.map((it) => (
                  <Link key={it.href} href={it.href} onClick={() => setMobile(false)} className="block text-sm py-1.5 text-slate-600 dark:text-slate-400">
                    {it.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
          <Link href="/login" onClick={() => setMobile(false)} className="block text-sm py-2">Sign in</Link>
        </div>
      )}
    </header>
  );
}
