"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { CatalogCategory, CatalogProduct } from "@/types/content";
import { cn } from "@/lib/utils";
import { CatalogCard } from "./CatalogCard";

interface CatalogBrowserProps {
  locale: Locale;
  products: CatalogProduct[];
  categories: CatalogCategory[];
  allLabel: string;
  specLabel: string;
  emptyLabel: string;
}

export function CatalogBrowser({
  locale,
  products,
  categories,
  allLabel,
  specLabel,
  emptyLabel,
}: CatalogBrowserProps) {
  const [active, setActive] = useState<string>("all");
  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category === active);

  const tabs = [{ slug: "all", title: allLabel }, ...categories];

  return (
    <div>
      {/* filter rail */}
      <div className="flex flex-wrap gap-2 border-b border-hairline pb-6">
        {tabs.map((tab) => {
          const isActive = active === tab.slug;
          return (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setActive(tab.slug)}
              className={cn(
                "border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                isActive
                  ? "border-ink bg-ink text-paper"
                  : "border-hairline text-steel-700 hover:border-ink hover:text-ink",
              )}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center font-mono text-sm text-steel-500">
          {emptyLabel}
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <CatalogCard
              key={product.slug}
              locale={locale}
              product={product}
              index={i}
              specLabel={specLabel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
