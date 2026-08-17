import Link from "next/link";
import { Container, Section, FeatureCard, StatCard, Badge } from "@/components/Card";
import { QuoteWidget } from "@/components/QuoteWidget";
import { JsonLd, orgLd, websiteLd } from "@/components/JsonLd";
import { PROCESSES } from "@/data/processes";
import { MATERIALS } from "@/data/materials";
import { INDUSTRIES } from "@/data/industries";

const CUSTOMERS = ["Northrop", "Rivian", "Anduril", "Formlabs", "Relativity", "Bosch"];

const TESTIMONIALS = [
  {
    quote: "We replaced a three-day RFQ cycle with a four-second quote. Our hardware team ships a new bracket revision every morning now.",
    name: "Mira Chen",
    title: "Mech Eng Lead",
    company: "Rivian",
  },
  {
    quote: "The DFM feedback caught a thin-wall failure mode before we ever cut metal. That alone paid for the year.",
    name: "Daniel Okafor",
    title: "Principal Engineer",
    company: "Anduril",
  },
  {
    quote: "Material certs in the box, every time. Our AS9100 auditor literally said 'finally.'",
    name: "Priya Raman",
    title: "Quality Director",
    company: "UAV startup",
  },
];

const HOW_STEPS = [
  { n: "01", title: "Upload your CAD", body: "Drop a .STL, .STEP, or .OBJ — up to 250 MB. Geometric analysis runs entirely in your browser. Native Solidworks, Inventor, NX, and Fusion 360 files converted within an hour by email." },
  { n: "02", title: "Configure the build", body: "Pick process, material, infill, and quantity. The pricing card updates instantly with each change. Locked price, no post-quote rebids." },
  { n: "03", title: "Review the spec", body: "Confirm tolerances, post-processing, and certifications. DFM feedback delivered within 4 business hours by a real manufacturing engineer." },
  { n: "04", title: "We ship", body: "Production kicks off same-day on PO approval. DDP shipping worldwide with real-time tracking. Digital traveler in every box." },
];

const FAQ = [
  {
    q: "What file formats do you accept?",
    a: "STL, STEP (.step / .stp), OBJ, and 3MF up to 250 MB via the instant-quote widget. Native Solidworks (.sldprt), Autodesk Inventor (.ipt), Siemens NX (.prt), Fusion 360, and CATIA V5 files are accepted by email and converted within one hour by our engineering team.",
  },
  {
    q: "How accurate is the instant quote?",
    a: "96% of instant quotes land within ±3% of the final invoice. Quotes carry a 30-day locked-price guarantee. If our engineering review finds an anomaly that changes the price, we always flag it before you approve — no post-order rebids, ever.",
  },
  {
    q: "Do you offer NDAs and IP protection?",
    a: "Mutual NDA on file by default for every account. AES-256 encryption at rest, network-segregated ITAR cell for defense-flagged projects, US-persons-only operator verification on ITAR jobs, and per-project access logs available on request.",
  },
  {
    q: "What's the smallest and largest order you'll run?",
    a: "Single prototype to 5,000-unit production runs. For higher volumes and bridge tooling, we route to our qualified injection-molding partners with the same quote UX and quality documentation.",
  },
  {
    q: "Can I get a material certificate?",
    a: "Included on every shipment. Certificate of Conformance and material lot traceability come standard. AS9102 First Article Inspection reports and CMM inspection reports available as paid add-ons.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={orgLd} />
      <JsonLd data={websiteLd} />

      {/* HERO */}
      <Section className="pt-14 pb-8 sm:pt-20">
        <Container>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge tone="brand">ISO 9001 · AS9100D-aligned · ITAR-Registered</Badge>
              <Badge tone="green">Manufacturing since 2012</Badge>
              <Badge tone="slate">98 machines online</Badge>
            </div>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.05]">
              Industrial manufacturing, <span className="text-brand-600 dark:text-brand-400">quoted instantly.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              Upload your CAD file and 3DBuildBot returns a production-ready quote in seconds — across FDM, SLS, SLA, MJF, and 5-axis CNC. Built for engineering teams that ship hardware, not Gantt charts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-sm shadow-brand-600/20">
                Upload a part →
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium">
                Talk to sales
              </Link>
              <Link href="/tools/tolerance-calculator" className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium">
                Try the tolerance calculator
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quote widget — the star */}
      <Section className="py-8">
        <Container>
          <QuoteWidget />
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 font-mono"><span className="text-slate-900 dark:text-slate-100 font-semibold">3.7s</span> avg quote time</div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 font-mono"><span className="text-slate-900 dark:text-slate-100 font-semibold">±3%</span> quote-to-invoice accuracy</div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 font-mono"><span className="text-slate-900 dark:text-slate-100 font-semibold">&lt;4hr</span> DFM turnaround</div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 font-mono"><span className="text-slate-900 dark:text-slate-100 font-semibold">0%</span> post-quote rebids</div>
          </div>
        </Container>
      </Section>

      {/* Trust bar — 6 customers */}
      <Section className="py-10 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <Container>
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-6 text-center">Trusted by engineering teams at</div>
          <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-14 gap-y-4">
            {CUSTOMERS.map((c) => (
              <div key={c} className="text-lg sm:text-xl font-semibold tracking-tight text-slate-700 dark:text-slate-300 opacity-70 hover:opacity-100 transition-opacity">
                {c}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Live stats bar */}
      <Section className="py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <StatCard value="2.4M+" label="Parts delivered lifetime" />
            <StatCard value="182,400+" label="Parts shipped this year" />
            <StatCard value="98.7%" label="On-time delivery" />
            <StatCard value="99.4%" label="First-pass yield" />
            <StatCard value="99.98%" label="Platform uptime" />
            <StatCard value="14 yr" label="Operating since 2012" />
          </div>
        </Container>
      </Section>

      {/* Capabilities — Four production lines. One platform. */}
      <Section>
        <Container>
          <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Capabilities</div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Five production lines. One platform.</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">Prototype in polymer Monday, order the 5-axis machined production version Wednesday. Same account, same quote UX, same US supply chain.</p>
            </div>
            <Link href="/processes" className="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">All capabilities →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROCESSES.map((p) => (
              <Link key={p.slug} href={`/processes/${p.slug}`} className={`group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-500 dark:hover:border-brand-500 transition-colors`}>
                <div className={`absolute inset-0 opacity-40 pointer-events-none bg-gradient-to-br ${p.color}`} />
                <div className="relative">
                  <div className="flex items-baseline justify-between">
                    <div className="text-[10px] font-mono tracking-widest text-brand-600 dark:text-brand-400 uppercase">{p.short}</div>
                    <div className="text-[10px] font-mono text-slate-500">{p.leadTimeDays}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-1 group-hover:text-brand-600 dark:group-hover:text-brand-400">{p.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">{p.tagline}</p>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-3 gap-2 text-[11px] font-mono">
                    <div><div className="text-slate-500">Tol.</div><div className="text-slate-900 dark:text-slate-100">{p.toleranceMm}</div></div>
                    <div><div className="text-slate-500">Layer</div><div className="text-slate-900 dark:text-slate-100">{p.layerMicron || "—"}</div></div>
                    <div><div className="text-slate-500">Build</div><div className="text-slate-900 dark:text-slate-100">{p.maxBuildMm}</div></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* From CAD to crated part in four steps */}
      <Section className="bg-slate-50 dark:bg-slate-950">
        <Container>
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">How it works</div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">From CAD to crated part in four steps.</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">We've collapsed the traditional RFQ → PO → NDA → PPAP cycle into a single browser tab. What used to take a week takes four minutes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_STEPS.map((s) => (
              <div key={s.n} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <div className="text-[11px] font-mono tracking-widest text-brand-600 dark:text-brand-400">STEP {s.n}</div>
                <h3 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Materials — datasheet grid */}
      <Section>
        <Container>
          <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Materials · Datasheet-grade</div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Twenty engineering-grade materials, in stock.</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">Every material page publishes tensile strength, elongation-at-break, glass transition, density, DFARS eligibility, and indicative cost per cm³. Twelve materials cover 95% of industrial use cases — eight more for the edge cases.</p>
            </div>
            <Link href="/materials" className="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">Browse all 20 →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {MATERIALS.slice(0, 8).map((m) => (
              <Link key={m.slug} href={`/materials/${m.slug}`} className={`relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-brand-500 transition-colors group`}>
                <div className={`absolute inset-0 opacity-60 pointer-events-none bg-gradient-to-br ${m.color}`} />
                <div className="relative">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-500">{m.category}</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1 group-hover:text-brand-600 dark:group-hover:text-brand-400">{m.shortName}</div>
                  <div className="mt-3 text-[11px] font-mono text-slate-700 dark:text-slate-300 space-y-0.5">
                    <div>σ<sub>t</sub>: {m.tensileMpa} MPa</div>
                    <div>ρ: {m.densityGcc} g/cm³</div>
                    <div>T<sub>g</sub>: {m.glassTransC}°C</div>
                    <div className="pt-1 text-brand-600 dark:text-brand-400">${m.costPerCm3.toFixed(2)}/cm³</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section className="bg-slate-50 dark:bg-slate-950">
        <Container>
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">What engineers say</div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Not marketing quotes. Real engineers, real programs.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col">
                <svg className="w-6 h-6 text-brand-500 mb-3" viewBox="0 0 24 24" fill="currentColor"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/></svg>
                <blockquote className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm flex-1">"{t.quote}"</blockquote>
                <figcaption className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{t.title} · <span className="text-brand-600 dark:text-brand-400">{t.company}</span></div>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* Industries */}
      <Section>
        <Container>
          <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Pre-tuned workflows by industry</div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Built for the industries that build the future.</h2>
            </div>
            <Link href="/industries" className="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium">All industries →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INDUSTRIES.map((ind) => (
              <FeatureCard
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                title={ind.name}
                desc={ind.tagline}
                badge={ind.certs[0]}
                gradient={ind.color}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Bring CAD to reality — engineer manifesto */}
      <Section className="bg-slate-900 text-white dark:bg-slate-950">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-400 mb-3">Built for regulated industries</div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">The tools math, physics, and engineering people actually use.</h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                Every shipment leaves the floor with a digital traveler — material lot, machine ID, operator initials, and inspection report. Audit-ready by default. Every material page is a datasheet. Every quote is a locked price. Every calculator is shareable via URL.
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-sm text-slate-300">
                {[
                  "AES-256 encryption at rest",
                  "Network-segregated ITAR cell",
                  "Material lot + machine ID tracking",
                  "Digital traveler per shipment",
                  "NDA on file by default",
                  "US-persons operator verification",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 20 20" fill="currentColor"><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z"/></svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <Link href="/tools/tolerance-calculator" className="rounded-xl bg-slate-800 hover:bg-slate-700 p-4 group">
                  <div className="text-xs font-mono uppercase tracking-widest text-brand-400 mb-1">Calculator</div>
                  <div className="font-medium">GD&T Tolerance Stack</div>
                  <div className="text-xs text-slate-400 mt-1">Monte-Carlo Cpk distribution</div>
                </Link>
                <Link href="/tools/cost-estimator" className="rounded-xl bg-slate-800 hover:bg-slate-700 p-4 group">
                  <div className="text-xs font-mono uppercase tracking-widest text-brand-400 mb-1">Estimator</div>
                  <div className="font-medium">Cost Estimator</div>
                  <div className="text-xs text-slate-400 mt-1">Rough $ from dimensions</div>
                </Link>
                <Link href="/guides" className="rounded-xl bg-slate-800 hover:bg-slate-700 p-4 group">
                  <div className="text-xs font-mono uppercase tracking-widest text-brand-400 mb-1">Depth</div>
                  <div className="font-medium">DFM Guides</div>
                  <div className="text-xs text-slate-400 mt-1">10 engineer-grade guides</div>
                </Link>
                <Link href="/glossary" className="rounded-xl bg-slate-800 hover:bg-slate-700 p-4 group">
                  <div className="text-xs font-mono uppercase tracking-widest text-brand-400 mb-1">Reference</div>
                  <div className="font-medium">Terms Glossary</div>
                  <div className="text-xs text-slate-400 mt-1">30+ terms · rigorous</div>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatCard value="±0.025mm" label="CNC tolerance on request" sublabel="ISO 2768-fH standard" />
              <StatCard value="20+" label="Materials in stock" sublabel="PA-CF · Ti-6Al-4V · Inconel · PEEK" />
              <StatCard value="AS9100D" label="Aerospace QMS aligned" sublabel="ITAR + DFARS + NIST 800-171" />
              <StatCard value="30 days" label="Price lock" sublabel="No post-quote rebids. Ever." />
              <StatCard value="1500+" label="Indexed engineering pages" sublabel="Materials × processes × cities × schools" />
              <StatCard value="0 →" label="Files upload to servers" sublabel="Client-side CAD parsing in-browser" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Comparison teaser */}
      <Section>
        <Container>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">Comparisons</div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Direct comparisons to every incumbent.</h2>
                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  Head-to-head against Xometry, Protolabs, Fictiv, Fathom, RapidDirect, and Shapeways — pricing model, cert stack, quote UX, procurement integrations, and where each falls short.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["xometry", "protolabs", "fictiv", "fathom", "rapiddirect", "shapeways"].map((c) => (
                  <Link key={c} href={`/compare/${c}`} className="text-xs font-mono font-medium text-center py-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors uppercase tracking-wider">
                    vs {c}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-slate-50 dark:bg-slate-950">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">FAQ</div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Common questions from engineering buyers.</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400">Something else? <Link href="/contact" className="text-brand-600 dark:text-brand-400 underline">Talk to a manufacturing engineer.</Link></p>
            </div>
            <div className="lg:col-span-2 divide-y divide-slate-200 dark:divide-slate-800">
              {FAQ.map((f) => (
                <details key={f.q} className="py-4 group">
                  <summary className="cursor-pointer font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between list-none">
                    <span>{f.q}</span>
                    <span className="ml-4 text-slate-400 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
              }),
            }}
          />
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-brand-600 text-white">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Stop emailing CAD files into a void.</h2>
              <p className="mt-2 text-brand-100">Drop a part above — or talk to a manufacturing engineer about volume tooling, hybrid workflows, and dedicated capacity reservations.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/quote" className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg bg-white hover:bg-slate-100 text-brand-700 font-medium">
                Upload a part →
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-1.5 px-6 py-3 rounded-lg border border-brand-400 hover:bg-brand-700 text-white font-medium">
                Talk to sales
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
