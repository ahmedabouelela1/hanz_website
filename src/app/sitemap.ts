import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";
import { loadCatalogProducts, loadNews } from "@/lib/content";

const STATIC_ROUTES = [
  "",
  "/about",
  "/catalog",
  "/partners",
  "/news",
  "/contact",
  "/quote",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const [products, news] = await Promise.all([
    loadCatalogProducts(),
    loadNews(),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${base}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
      });
    }
    for (const product of products) {
      entries.push({
        url: `${base}/${locale}/catalog/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const article of news) {
      entries.push({
        url: `${base}/${locale}/news/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
