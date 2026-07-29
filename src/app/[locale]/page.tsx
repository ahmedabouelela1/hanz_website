import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  loadCatalogCategories,
  loadCatalogProducts,
  loadPartners,
} from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { Capabilities } from "@/components/home/Capabilities";
import { Process } from "@/components/home/Process";
import { StatsBand } from "@/components/home/StatsBand";
import { ProductShowcase } from "@/components/home/ProductShowcase";
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
  const [categories, products, partners] = await Promise.all([
    loadCatalogCategories(locale),
    loadCatalogProducts(locale),
    loadPartners(locale),
  ]);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <div id="capabilities" className="scroll-mt-20">
        <Capabilities dict={dict} />
      </div>
      <div id="factory" className="scroll-mt-20">
        <FactoryFloor locale={locale} dict={dict} />
      </div>
      <div id="stats" className="scroll-mt-20">
        <StatsBand dict={dict} />
      </div>
      <div id="catalog" className="scroll-mt-20">
        <ProductShowcase
          locale={locale}
          dict={dict}
          categories={categories}
          products={products}
        />
      </div>
      <div id="process" className="scroll-mt-20">
        <Process dict={dict} />
      </div>
      <div id="partners" className="scroll-mt-20">
        <PartnersMarquee dict={dict} partners={partners} />
      </div>
      <div id="cta" className="scroll-mt-20">
        <CtaBand locale={locale} dict={dict} />
      </div>
    </>
  );
}
