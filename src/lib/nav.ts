import type { Locale } from "@/i18n/config";

/** Build a locale-prefixed path, e.g. localePath("ar", "/catalog") -> "/ar/catalog". */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

export const navRoutes = [
  { key: "about", href: "/about" },
  { key: "catalog", href: "/catalog" },
  { key: "partners", href: "/partners" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
] as const;
