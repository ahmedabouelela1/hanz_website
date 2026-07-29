import type {
  CatalogCategory,
  CatalogProduct,
  NewsArticle,
  Partner,
} from "@/types/content";
import type { Locale } from "@/i18n/config";
import {
  catalogCategories,
  catalogProducts,
  newsArticles,
  partners,
} from "@/data/seed";
import {
  localizeCategories,
  localizeNews as localizeNewsAr,
  localizePartners,
  localizeProducts,
} from "@/data/seed.ar";
import { normalizeImageList, normalizeImageUrl } from "./images";
import { apiFetch, apiGet } from "./api";
import { cache } from "react";

function normalizeProduct(product: Partial<CatalogProduct>): CatalogProduct {
  const specs = Array.isArray(product.specs)
    ? product.specs
        .filter((s): s is { label: string; value: string } => !!s && typeof s === "object")
        .map((s) => ({
          label: String(s.label ?? ""),
          value: String(s.value ?? ""),
        }))
    : [];

  const applications = Array.isArray(product.applications)
    ? product.applications.map((a) => String(a ?? "")).filter(Boolean)
    : [];

  return {
    slug: product.slug ?? "",
    category: product.category ?? "",
    categoryLabel: product.categoryLabel ?? "",
    title: product.title ?? "",
    summary: product.summary ?? "",
    description: product.description ?? "",
    image: normalizeImageUrl(product.image ?? ""),
    gallery: normalizeImageList(product.gallery ?? []),
    specs,
    applications,
    featured: Boolean(product.featured),
  };
}

function normalizeNews(article: Partial<NewsArticle>): NewsArticle {
  return {
    slug: article.slug ?? "",
    title: article.title ?? "",
    excerpt: article.excerpt ?? "",
    body: article.body ?? "",
    image: normalizeImageUrl(article.image ?? ""),
    category: article.category ?? "",
    author: article.author ?? "",
    publishedAt: article.publishedAt ?? "",
    readMinutes: Number(article.readMinutes) || 0,
    featured: Boolean(article.featured),
  };
}

function normalizePartner(partner: Partial<Partner>): Partner {
  return {
    slug: partner.slug ?? "",
    name: partner.name ?? "",
    sector: partner.sector ?? "",
    logo: partner.logo ?? "",
    featured: Boolean(partner.featured),
    blurb: partner.blurb ?? "",
  };
}

function normalizeCategory(category: Partial<CatalogCategory>): CatalogCategory {
  return {
    slug: category.slug ?? "",
    title: category.title ?? "",
  };
}

// Content façade. Each loader tries the Laravel API first and falls back to
// local seed data only when the fetch fails (null), so an intentional empty
// CMS list stays empty. Wrapped in React cache() — keyed by locale.
//
// The offline seed is authored in English; data/seed.ar.ts overlays Arabic by
// slug for the ar locale. With the API up, ?locale= drives bilingual fields.

export const loadCatalogCategories = cache(
  async (locale: Locale = "en"): Promise<CatalogCategory[]> => {
    const remote = await apiGet<CatalogCategory[]>("/catalog/categories", { locale });
    if (remote !== null) return remote.map(normalizeCategory);
    const seed = catalogCategories.map(normalizeCategory);
    return locale === "ar" ? localizeCategories(seed) : seed;
  },
);

export const loadCatalogProducts = cache(
  async (locale: Locale = "en"): Promise<CatalogProduct[]> => {
    const remote = await apiGet<CatalogProduct[]>("/catalog/products", { locale });
    if (remote !== null) return remote.map(normalizeProduct);
    const seed = catalogProducts.map(normalizeProduct);
    return locale === "ar" ? localizeProducts(seed) : seed;
  },
);

export const loadFeaturedProducts = cache(
  async (locale: Locale = "en"): Promise<CatalogProduct[]> => {
    const all = await loadCatalogProducts(locale);
    const featured = all.filter((p) => p.featured);
    return (featured.length ? featured : all).slice(0, 3);
  },
);

export const loadProductBySlug = cache(
  async (slug: string, locale: Locale = "en"): Promise<CatalogProduct | null> => {
    const remote = await apiFetch<CatalogProduct>(
      `/catalog/products/${encodeURIComponent(slug)}`,
      { locale },
    );
    if (remote.ok) return normalizeProduct(remote.data);

    // Only a positive "not found" from a healthy API means the product is gone.
    // A timeout or 5xx must not 404 a page that exists.
    if (remote.reason === "missing") return null;

    const seed = catalogProducts.map(normalizeProduct);
    const localized = locale === "ar" ? localizeProducts(seed) : seed;
    return localized.find((p) => p.slug === slug) ?? null;
  },
);

export const loadPartners = cache(async (locale: Locale = "en"): Promise<Partner[]> => {
  const remote = await apiGet<Partner[]>("/partners", { locale });
  if (remote !== null) return remote.map(normalizePartner);
  const seed = partners.map(normalizePartner);
  return locale === "ar" ? localizePartners(seed) : seed;
});

export const loadFeaturedPartners = cache(
  async (locale: Locale = "en"): Promise<Partner[]> => {
    const all = await loadPartners(locale);
    const featured = all.filter((p) => p.featured);
    return featured.length ? featured : all;
  },
);

export const loadNews = cache(async (locale: Locale = "en"): Promise<NewsArticle[]> => {
  const remote = await apiGet<NewsArticle[]>("/news", { locale });
  const seed = newsArticles.map(normalizeNews);
  const list =
    remote !== null
      ? remote.map(normalizeNews)
      : locale === "ar"
        ? localizeNewsAr(seed)
        : seed;
  return [...list].sort((a, b) =>
    (b.publishedAt || "").localeCompare(a.publishedAt || ""),
  );
});

export const loadFeaturedNews = cache(
  async (locale: Locale = "en"): Promise<NewsArticle[]> => {
    const all = await loadNews(locale);
    const featured = all.filter((n) => n.featured);
    return (featured.length ? featured : all).slice(0, 3);
  },
);

export const loadNewsBySlug = cache(
  async (slug: string, locale: Locale = "en"): Promise<NewsArticle | null> => {
    const remote = await apiFetch<NewsArticle>(`/news/${encodeURIComponent(slug)}`, {
      locale,
    });
    if (remote.ok) return normalizeNews(remote.data);

    // Same rule as products: a backend blip must not turn a live article into
    // a 404 that ISR then caches for the whole revalidate window.
    if (remote.reason === "missing") return null;

    const seed = newsArticles.map(normalizeNews);
    const localized = locale === "ar" ? localizeNewsAr(seed) : seed;
    return localized.find((n) => n.slug === slug) ?? null;
  },
);
