// Global site constants. These can later be sourced from the Laravel
// "Settings" domain; keeping them here means the site works with no backend.

export const siteContact = {
  email: "info@hanzindustry.com",
  phone: "+20 128 342 6487",
  phoneHref: "+201283426487",
  // TODO(client): confirm the exact plot / street in Obour City.
  address: "Industrial Zone, Obour City, Qalyubia, Egypt",
  mapQuery: "Obour City Industrial Zone",
};

export const siteMeta = {
  name: "hanz Industry",
  domain: "https://www.hanzindustry.com",
  twitter: "@hanzindustry",
};

/**
 * Verified company facts, from the client company profile.
 * Founded 1986 as Rameskey Factory in Sadat City; relocated to Obour City and
 * renamed Hanz Industry in 2015.
 */
export const companyFacts = {
  foundingDate: "1986",
  formerName: "Rameskey Factory",
  founder: "Mohamed Saad Mohamed",
  chairman: "Hussein Mohamed Saad",
  city: "Obour City",
  region: "Qalyubia",
  /** Die casting machine tonnage range on the floor today. */
  machineTonnage: "100–500 tons",
} as const;

export const brandAssets = {
  /** Gear emblem — transparent background. */
  mark: "/brand/logo-mark.png",
  markSize: { width: 1056, height: 1044 },
  /** Bilingual wordmark (Arabic + English) from hanz-02 master. */
  wordmark: "/brand/logo-wordmark.png",
  wordmarkSize: { width: 1539, height: 537 },
} as const;

export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? siteMeta.domain
  );
}
