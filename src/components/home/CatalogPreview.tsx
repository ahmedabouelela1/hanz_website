import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CatalogProduct } from "@/types/content";
import { localePath } from "@/lib/nav";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CatalogCard } from "@/components/catalog/CatalogCard";

interface CatalogPreviewProps {
  locale: Locale;
  dict: Dictionary;
  products: CatalogProduct[];
}

export function CatalogPreview({ locale, dict, products }: CatalogPreviewProps) {
  const c = dict.home.catalogPreview;
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading kicker={c.kicker} title={c.title} lead={c.lead} />
        <div className="hidden lg:block">
          <ButtonLink
            href={localePath(locale, "/catalog")}
            variant="ghost"
          >
            {dict.cta.viewAll}
          </ButtonLink>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <Reveal key={product.slug} delay={i * 0.06}>
            <CatalogCard
              locale={locale}
              product={product}
              index={i}
              specLabel={dict.catalog.card.spec}
            />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 lg:hidden">
        <ButtonLink href={localePath(locale, "/catalog")} variant="outline">
          {dict.cta.viewAll}
        </ButtonLink>
      </div>
    </section>
  );
}
