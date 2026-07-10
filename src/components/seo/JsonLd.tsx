import { siteContact, siteMeta, siteUrl } from "@/lib/site";

/** Organization structured data for rich search results. */
export function OrganizationJsonLd({ tagline }: { tagline: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteMeta.name,
    url: siteUrl(),
    slogan: tagline,
    email: siteContact.email,
    telephone: siteContact.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContact.address,
      addressCountry: "EG",
    },
    sameAs: [] as string[],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
