// Global site constants. These can later be sourced from the Laravel
// "Settings" domain; keeping them here means the site works with no backend.

export const siteContact = {
  email: "info@hanzindustry.com",
  phone: "+20 128 342 6487",
  phoneHref: "+201283426487",
  address: "Industrial Zone, Plot 24, 6th of October City, Giza, Egypt",
  mapQuery: "6th of October City Industrial Zone",
};

export const siteMeta = {
  name: "hanz Industry",
  domain: "https://www.hanzindustry.com",
  twitter: "@hanzindustry",
};

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
