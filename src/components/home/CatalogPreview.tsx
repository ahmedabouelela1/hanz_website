"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CatalogProduct } from "@/types/content";
import { localePath } from "@/lib/nav";
import { ButtonLink } from "@/components/ui/Button";
import { CatalogCard } from "@/components/catalog/CatalogCard";

interface CatalogPreviewProps {
  locale: Locale;
  dict: Dictionary;
  products: CatalogProduct[];
}

export function CatalogPreview({ locale, dict, products }: CatalogPreviewProps) {
  const c = dict.home.catalogPreview;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative px-5 sm:px-8 lg:px-12"
      style={{ paddingBlock: "var(--space-section)" }}
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Header with CTA on same line */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
            >
              {c.kicker}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-ink"
            >
              {c.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-md text-steel-700"
            >
              {c.lead}
            </motion.p>
          </div>
          <ButtonLink href={localePath(locale, "/catalog")} variant="ghost">
            {dict.cta.viewAll}
          </ButtonLink>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
            >
              <CatalogCard
                locale={locale}
                product={product}
                index={i}
                specLabel={dict.catalog.card.spec}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
