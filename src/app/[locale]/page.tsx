import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { loadFeaturedProducts, loadPartners } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { Capabilities } from "@/components/home/Capabilities";
import { Process } from "@/components/home/Process";
import { StatsBand } from "@/components/home/StatsBand";
import { CatalogPreview } from "@/components/home/CatalogPreview";
import { PartnersMarquee } from "@/components/home/PartnersMarquee";
import { CtaBand } from "@/components/home/CtaBand";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const [products, partners] = await Promise.all([
    loadFeaturedProducts(),
    loadPartners(),
  ]);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Capabilities dict={dict} />
      <StatsBand dict={dict} />
      <CatalogPreview locale={locale} dict={dict} products={products} />
      <Process dict={dict} />
      <PartnersMarquee dict={dict} partners={partners} />
      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
