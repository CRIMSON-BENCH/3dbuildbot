export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "3DBuildBot",
  url: "https://www.3dbuildbot.com",
  logo: "https://www.3dbuildbot.com/logo.png",
  description: "US-domiciled, ITAR-registered on-demand manufacturing: FDM, SLS, SLA, and 5-axis CNC. Instant CAD quotes with locked-price guarantee.",
  sameAs: ["https://www.linkedin.com/company/3dbuildbot"],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "3DBuildBot",
  url: "https://www.3dbuildbot.com",
  potentialAction: { "@type": "SearchAction", target: "https://www.3dbuildbot.com/search?q={query}", "query-input": "required name=query" },
};
