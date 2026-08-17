export interface Certification {
  slug: string;
  name: string;
  short: string;
  authority: string;
  scope: string;
  overview: string;
  relevantFor: string[];
  documentsIncluded: string[];
  color: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    slug: "iso-9001",
    name: "ISO 9001:2015",
    short: "ISO 9001",
    authority: "International Organization for Standardization",
    scope: "Quality management systems",
    color: "from-blue-500/15 to-blue-500/5",
    overview:
      "ISO 9001:2015 certifies that 3DBuildBot's quality management system meets internationally recognized standards for consistency, traceability, and continual improvement. Every quote, order, and shipped part is produced under an audited quality process.",
    relevantFor: ["All industries", "Enterprise procurement", "Supplier qualification"],
    documentsIncluded: ["Quality certificate on request", "Material certificate per order", "Process control records"],
  },
  {
    slug: "as9100d",
    name: "AS9100D",
    short: "AS9100D",
    authority: "SAE International / IAQG",
    scope: "Aerospace quality management",
    color: "from-slate-800/25 to-slate-800/5",
    overview:
      "AS9100D is the aerospace industry's quality standard, extending ISO 9001 with airworthiness, configuration management, and risk-based process controls specific to flight hardware, spaceflight, and defense articles.",
    relevantFor: ["Aerospace primes", "Defense contractors", "Space-hardware programs", "Any AS9100-flowdown supplier chain"],
    documentsIncluded: ["AS9102 First Article Inspection reports", "Material Test Reports (MTR)", "Certificate of Conformance", "Full configuration traceability"],
  },
  {
    slug: "itar-registered",
    name: "ITAR-Registered",
    short: "ITAR",
    authority: "US Department of State (DDTC)",
    scope: "Export-controlled defense articles",
    color: "from-red-800/25 to-red-800/5",
    overview:
      "3DBuildBot is registered with the US Department of State's Directorate of Defense Trade Controls (DDTC). All ITAR-flagged projects are processed on US soil by US persons only, with per-project access controls, watermarked previews, and audit logs. CAD data never crosses a border.",
    relevantFor: ["Defense articles on the USML", "Space-launch hardware", "Missile / munitions programs", "UAV / autonomous defense systems"],
    documentsIncluded: ["ITAR registration reference on request", "US-persons operator affidavits", "Per-project access log export", "Watermarked preview retention"],
  },
  {
    slug: "dfars-compliant",
    name: "DFARS-Compliant Metals",
    short: "DFARS",
    authority: "US Department of Defense (DFARS 252.225-7009)",
    scope: "Specialty metal country-of-origin traceability",
    color: "from-amber-800/25 to-amber-800/5",
    overview:
      "DFARS 252.225-7009 requires that specialty metals — including titanium alloys, superalloys, and specific stainless steels — be melted or produced in the United States or a qualifying country. 3DBuildBot sources DFARS-compliant material for aluminum, titanium, stainless, and Inconel machining and DMLS.",
    relevantFor: ["Any DoD prime or sub-contractor", "AS9100-flowdown supply", "Defense articles requiring specialty metals"],
    documentsIncluded: ["Material Test Reports with country-of-origin", "Mill certifications", "Chain-of-custody documentation"],
  },
  {
    slug: "iso-13485",
    name: "ISO 13485:2016 Alignment",
    short: "ISO 13485",
    authority: "International Organization for Standardization",
    scope: "Medical device quality management (aligned via partner facility)",
    color: "from-rose-500/15 to-rose-500/5",
    overview:
      "3DBuildBot supports medical device R&D with ISO 13485-aligned material handling, biocompatibility documentation, and lot traceability. For finished medical device manufacturing under ISO 13485 certification, we route to our qualified partner facility.",
    relevantFor: ["Medical device R&D", "Surgical instrument prototypes", "Biocompatible material projects", "Implant research"],
    documentsIncluded: ["Biocompatibility declarations", "Lot traceability records", "Material safety data sheets"],
  },
];

export const getCertBySlug = (slug: string) => CERTIFICATIONS.find((c) => c.slug === slug);
export const getAllCertSlugs = () => CERTIFICATIONS.map((c) => c.slug);
