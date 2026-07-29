import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { loadFeaturedProducts, loadPartners } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { Capabilities } from "@/components/home/Capabilities";
import { Process } from "@/components/home/Process";
import { StatsBand } from "@/components/home/StatsBand";
import { CatalogPreview } from "@/components/home/CatalogPreview";
import { FactoryFloor } from "@/components/home/FactoryFloor";
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
    loadFeaturedProducts(locale),
    loadPartners(locale),
  ]);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <div id="capabilities"><Capabilities dict={dict} /></div>
      <div id="stats"><StatsBand dict={dict} /></div>
      <div id="catalog"><CatalogPreview locale={locale} dict={dict} products={products} /></div>
      <Process dict={dict} />
      <div id="factory"><FactoryFloor locale={locale} dict={dict} /></div>
      <div id="partners"><PartnersMarquee dict={dict} partners={partners} /></div>
      <div id="cta"><CtaBand locale={locale} dict={dict} /></div>
    </>
  );
}
