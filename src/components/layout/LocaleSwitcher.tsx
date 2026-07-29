"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  current,
  onDark = false,
}: {
  current: Locale;
  /** Light-on-dark treatment for the transparent header over the home hero. */
  onDark?: boolean;
}) {
  const pathname = usePathname();

  function pathForLocale(target: Locale): string {
    const segments = pathname.split("/");
    // segments[0] is "" , segments[1] is the current locale
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    return segments.join("/") || `/${target}`;
  }

  return (
    <div className="flex items-center gap-1 font-mono text-[11px] tracking-[0.12em]">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && (
            <span className={onDark ? "text-paper/30" : "text-steel-300"}>
              /
            </span>
          )}
          <Link
            href={pathForLocale(loc)}
            aria-current={loc === current ? "true" : undefined}
            className={cn(
              "uppercase transition-colors",
              loc === current
                ? onDark
                  ? "text-accent-hot"
                  : "text-accent"
                : onDark
                  ? "text-paper/60 hover:text-paper"
                  : "text-steel-500 hover:text-ink",
            )}
          >
            {loc === "ar" ? "عربي" : localeLabels[loc].slice(0, 2)}
          </Link>
        </span>
      ))}
    </div>
  );
}
