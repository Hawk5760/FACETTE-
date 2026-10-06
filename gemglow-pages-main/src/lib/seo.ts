export const SITE = "Facette & Co.";

export function pageHead(opts: { title: string; description: string; path: string; jsonLd?: object }) {
  const fullTitle = `${opts.title} | ${SITE}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: opts.description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: opts.path },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: opts.description },
    ],
    links: [{ rel: "canonical", href: opts.path }],
    scripts: opts.jsonLd
      ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", ...opts.jsonLd }) }]
      : [],
  };
}

export function breadcrumb(name: string, path: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name, item: path },
    ],
  };
}
