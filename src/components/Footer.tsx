import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-6 gap-8 text-sm">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 items-center justify-center text-white font-bold text-sm">3D</span>
            <span className="font-semibold">3DBuildBot</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-3">Instant CAD quotes. US-made. ITAR-registered. From engineering CAD to shipped parts in 2–7 days.</p>
          <p className="text-xs text-slate-500 dark:text-slate-500">ISO 9001:2015 · AS9100D · ITAR-Registered · DFARS-Compliant</p>
        </div>
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Processes</div>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li><Link href="/processes/fdm" className="hover:text-brand-600 dark:hover:text-brand-400">FDM</Link></li>
            <li><Link href="/processes/sls" className="hover:text-brand-600 dark:hover:text-brand-400">SLS</Link></li>
            <li><Link href="/processes/sla" className="hover:text-brand-600 dark:hover:text-brand-400">SLA</Link></li>
            <li><Link href="/processes/mjf" className="hover:text-brand-600 dark:hover:text-brand-400">MJF</Link></li>
            <li><Link href="/processes/cnc-machining" className="hover:text-brand-600 dark:hover:text-brand-400">5-Axis CNC</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Industries</div>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li><Link href="/industries/aerospace-defense" className="hover:text-brand-600 dark:hover:text-brand-400">Aerospace & Defense</Link></li>
            <li><Link href="/industries/robotics" className="hover:text-brand-600 dark:hover:text-brand-400">Robotics</Link></li>
            <li><Link href="/industries/electric-vehicles" className="hover:text-brand-600 dark:hover:text-brand-400">EV</Link></li>
            <li><Link href="/industries/medical" className="hover:text-brand-600 dark:hover:text-brand-400">Medical</Link></li>
            <li><Link href="/industries/electronics" className="hover:text-brand-600 dark:hover:text-brand-400">Electronics</Link></li>
            <li><Link href="/industries/industrial" className="hover:text-brand-600 dark:hover:text-brand-400">Industrial / MRO</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Resources</div>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li><Link href="/guides" className="hover:text-brand-600 dark:hover:text-brand-400">DFM Guides</Link></li>
            <li><Link href="/materials" className="hover:text-brand-600 dark:hover:text-brand-400">Materials</Link></li>
            <li><Link href="/tools/tolerance-calculator" className="hover:text-brand-600 dark:hover:text-brand-400">Tolerance calculator</Link></li>
            <li><Link href="/tools/cost-estimator" className="hover:text-brand-600 dark:hover:text-brand-400">Cost estimator</Link></li>
            <li><Link href="/glossary" className="hover:text-brand-600 dark:hover:text-brand-400">Glossary</Link></li>
            <li><Link href="/certifications" className="hover:text-brand-600 dark:hover:text-brand-400">Certifications</Link></li>
            <li><Link href="/api-docs" className="hover:text-brand-600 dark:hover:text-brand-400">API docs</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Company</div>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li><Link href="/about" className="hover:text-brand-600 dark:hover:text-brand-400">About</Link></li>
            <li><Link href="/pricing" className="hover:text-brand-600 dark:hover:text-brand-400">Pricing</Link></li>
            <li><Link href="/for-education" className="hover:text-brand-600 dark:hover:text-brand-400">For education</Link></li>
            <li><Link href="/for-shops" className="hover:text-brand-600 dark:hover:text-brand-400 font-medium text-brand-600 dark:text-brand-400">For job shops →</Link></li>
            <li><Link href="/contact" className="hover:text-brand-600 dark:hover:text-brand-400">Contact</Link></li>
            <li><Link href="/terms" className="hover:text-brand-600 dark:hover:text-brand-400">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-600 dark:hover:text-brand-400">Privacy</Link></li>
            <li><Link href="/refund" className="hover:text-brand-600 dark:hover:text-brand-400">Refund</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-xs text-slate-500 dark:text-slate-500 space-y-2">
          <p>© 2026 3DBuildBot. All rights reserved.</p>
          <p><span className="font-medium">Legal disclaimer:</span> 3DBuildBot is a manufacturing services provider and does not provide engineering, legal, medical, or regulatory certification advice. Quotes and technical guidance are for informational purposes; all designs and specifications remain the responsibility of the customer's qualified engineering staff. Certifications listed reflect the operating status of 3DBuildBot facilities; individual orders may require additional documentation available on request.</p>
        </div>
      </div>
    </footer>
  );
}
