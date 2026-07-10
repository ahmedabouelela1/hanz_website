// Domain content types shared by the public site.
// These mirror the hanz Laravel API resource shapes (Src\Domain\*\Http\Resources),
// so the content loaders can swap from local seed to the API without touching pages.

import type { Locale } from "@/i18n/config";

/** A field the CMS stores per-locale: { en, ar }. */
export type Localized = Partial<Record<Locale, string>>;

export interface CatalogCategory {
  slug: string;
  title: string;
}

export interface CatalogProduct {
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  specs: { label: string; value: string }[];
  applications: string[];
  featured: boolean;
}

export interface Partner {
  slug: string;
  name: string;
  sector: string;
  logo: string;
  featured: boolean;
  blurb: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  readMinutes: number;
  featured: boolean;
}
