import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { CatalogProduct } from "@/types/content";
import { localePath } from "@/lib/nav";

interface CatalogCardProps {
  locale: Locale;
  product: CatalogProduct;
  index: number;
  specLabel: string;
}

export function CatalogCard({
  locale,
  product,
  index,
  specLabel,
}: CatalogCardProps) {
  return (
    <Link
      href={localePath(locale, `/catalog/${product.slug}`)}
      className="group relative flex flex-col border border-hairline bg-surface-2 transition-colors duration-300 hover:border-ink"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="image-grade object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-0 top-0 bg-paper px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-ink">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          {product.categoryLabel}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink">
          {product.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-steel-700">
          {product.summary}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500">
            {product.specs[0]?.value
              ? `${specLabel}: ${product.specs[0].value}`
              : product.categoryLabel}
          </span>
          <span className="font-mono text-lg text-ink transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
