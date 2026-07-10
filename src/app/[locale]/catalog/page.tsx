import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { loadCatalogCategories, loadCatalogProducts } from "@/lib/content";
import { PageHeader } from "@/components/layout/PageHeader";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.catalog.hero.title, description: dict.catalog.hero.lead };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const [products, categories] = await Promise.all([
    loadCatalogProducts(),
    loadCatalogCategories(),
  ]);

  return (
    <>
      <PageHeader
        kicker={dict.catalog.hero.kicker}
        title={dict.catalog.hero.title}
        lead={dict.catalog.hero.lead}
        index="03 — Catalog"
      />
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <CatalogBrowser
          locale={locale}
          products={products}
          categories={categories}
          allLabel={dict.catalog.filters.all}
          specLabel={dict.catalog.card.spec}
          emptyLabel={dict.catalog.empty}
        />
      </section>
    </>
  );
}
