// Global Organization + WebSite structured data — enables Google Sitelinks + brand search box.
export function JsonLdOrg() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "3DBuildBot",
      url: "https://www.3dbuildbot.com",
      logo: "https://www.3dbuildbot.com/icon.png",
      description: "On-demand manufacturing platform: instant CAD quotes, US-made parts, ITAR-ready across FDM, SLS, SLA, MJF, DMLS, and 5-axis CNC.",
      sameAs: [
        "https://github.com/CRIMSON-BENCH/3dbuildbot",
      ],
      areaServed: "Worldwide",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "https://www.3dbuildbot.com",
      name: "3DBuildBot",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.3dbuildbot.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
