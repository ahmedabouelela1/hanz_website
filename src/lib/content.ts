import type {
  CatalogCategory,
  CatalogProduct,
  NewsArticle,
  Partner,
} from "@/types/content";
import {
  catalogCategories,
  catalogProducts,
  newsArticles,
  partners,
} from "@/data/seed";
import { normalizeImageList, normalizeImageUrl } from "./images";
import { apiGet } from "./api";
import { cache } from "react";

function normalizeProduct(product: CatalogProduct): CatalogProduct {
  return {
    ...product,
    image: normalizeImageUrl(product.image),
    gallery: normalizeImageList(product.gallery),
  };
}

function normalizeNews(article: NewsArticle): NewsArticle {
  return {
    ...article,
    image: normalizeImageUrl(article.image),
  };
}

// Content façade. Each loader tries the Laravel API first and falls back to
// local seed data, so pages never depend on the backend being up.
// Wrapped in React cache() to dedupe within a single request/render.

export const loadCatalogCategories = cache(async (): Promise<CatalogCategory[]> => {
  const remote = await apiGet<CatalogCategory[]>("/catalog/categories");
  return remote?.length ? remote : catalogCategories;
});

export const loadCatalogProducts = cache(async (): Promise<CatalogProduct[]> => {
  const remote = await apiGet<CatalogProduct[]>("/catalog/products");
  const list = remote?.length ? remote : catalogProducts;
  return list.map(normalizeProduct);
});

export const loadFeaturedProducts = cache(async (): Promise<CatalogProduct[]> => {
  const all = await loadCatalogProducts();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, 3);
});

export const loadProductBySlug = cache(
  async (slug: string): Promise<CatalogProduct | null> => {
    const all = await loadCatalogProducts();
    return all.find((p) => p.slug === slug) ?? null;
  },
);

export const loadPartners = cache(async (): Promise<Partner[]> => {
  const remote = await apiGet<Partner[]>("/partners");
  return remote?.length ? remote : partners;
});

export const loadFeaturedPartners = cache(async (): Promise<Partner[]> => {
  const all = await loadPartners();
  const featured = all.filter((p) => p.featured);
  return featured.length ? featured : all;
});

export const loadNews = cache(async (): Promise<NewsArticle[]> => {
  const remote = await apiGet<NewsArticle[]>("/news");
  const list = remote?.length ? remote : newsArticles;
  return [...list].map(normalizeNews).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
});

export const loadFeaturedNews = cache(async (): Promise<NewsArticle[]> => {
  const all = await loadNews();
  const featured = all.filter((n) => n.featured);
  return (featured.length ? featured : all).slice(0, 3);
});

export const loadNewsBySlug = cache(
  async (slug: string): Promise<NewsArticle | null> => {
    const all = await loadNews();
    return all.find((n) => n.slug === slug) ?? null;
  },
);
