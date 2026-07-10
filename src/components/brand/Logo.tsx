import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/nav";
import { brandAssets, siteMeta } from "@/lib/site";

interface LogoProps {
  locale: Locale;
  className?: string;
  onNavigate?: () => void;
  /** Header = compact lockup on light surfaces; footer = larger on dark ink. */
  variant?: "header" | "footer";
}

function scaledWidth(height: number, artWidth: number, artHeight: number) {
  return Math.round(height * (artWidth / artHeight));
}

/**
 * Brand lockup: gear mark + official bilingual wordmark (hanz-02).
 */
export function Logo({
  locale,
  className,
  onNavigate,
  variant = "header",
}: LogoProps) {
  const isFooter = variant === "footer";
  const { markSize, wordmarkSize } = brandAssets;
  const markHeight = isFooter ? 80 : 60;
  const markWidth = scaledWidth(markHeight, markSize.width, markSize.height);
  const wordmarkWidth = scaledWidth(
    markHeight,
    wordmarkSize.width,
    wordmarkSize.height,
  );

  return (
    <Link
      href={localePath(locale, "/")}
      onClick={onNavigate}
      className={cn(
        "group inline-flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90 sm:gap-3 lg:gap-3.5",
        className,
      )}
      aria-label={siteMeta.name}
    >
      <Image
        src={brandAssets.mark}
        alt=""
        aria-hidden
        width={markWidth}
        height={markHeight}
        priority={variant === "header"}
        className={cn(
          "shrink-0 object-contain",
          isFooter
            ? "h-20 w-auto"
            : "h-11 w-auto sm:h-12 lg:h-[60px]",
        )}
      />

      <Image
        src={brandAssets.wordmark}
        alt={siteMeta.name}
        width={wordmarkWidth}
        height={markHeight}
        priority={variant === "header"}
        className={cn(
          "w-auto object-contain object-left",
          isFooter
            ? "h-20"
            : "hidden h-11 sm:block sm:h-12 lg:h-[60px]",
        )}
      />
    </Link>
  );
}
