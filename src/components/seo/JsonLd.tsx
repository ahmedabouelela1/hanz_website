import { companyFacts, siteContact, siteMeta, siteUrl } from "@/lib/site";

/** Organization structured data for rich search results. */
export function OrganizationJsonLd({ tagline }: { tagline: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    additionalType: "https://schema.org/Manufacturer",
    name: siteMeta.name,
    alternateName: companyFacts.formerName,
    url: siteUrl(),
    slogan: tagline,
    description:
      "Egyptian manufacturer of precision aluminum and zinc (Zamak) die-cast components for buses, minibuses, railway, and industrial applications. Founded 1986.",
    foundingDate: companyFacts.foundingDate,
    founder: { "@type": "Person", name: companyFacts.founder },
    email: siteContact.email,
    telephone: siteContact.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContact.address,
      addressLocality: companyFacts.city,
      addressRegion: companyFacts.region,
      addressCountry: "EG",
    },
    knowsAbout: [
      "Aluminum die casting",
      "Zinc die casting",
      "Zamak alloy",
      "High-pressure die casting",
      "Commercial vehicle components",
    ],
    sameAs: [] as string[],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
