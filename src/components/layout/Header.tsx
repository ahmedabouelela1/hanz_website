"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath, navRoutes } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === localePath(locale, href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-paper">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[76px] lg:px-12">
        <Logo locale={locale} onNavigate={() => setOpen(false)} />

        <nav className="hidden items-center gap-8 lg:flex">
          {navRoutes.map((route) => (
            <Link
              key={route.key}
              href={localePath(locale, route.href)}
              className={cn(
                "link-underline font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                isActive(route.href)
                  ? "text-accent"
                  : "text-steel-700 hover:text-ink",
              )}
            >
              {dict.nav[route.key as keyof typeof dict.nav]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LocaleSwitcher current={locale} />
          <Link
            href={localePath(locale, "/quote")}
            className="group inline-flex items-center gap-2 bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-accent"
          >
            {dict.nav.quote}
            <span className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180">
              →
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? dict.nav.close : dict.nav.menu}
          aria-expanded={open}
          className="relative z-50 grid h-10 w-10 place-items-center lg:hidden"
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={cn(
                "h-px w-6 bg-ink transition-all duration-300",
                open && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-ink transition-all duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-ink transition-all duration-300",
                open && "-translate-y-[7px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-hairline bg-paper lg:hidden",
          "transition-[max-height] duration-500 ease-in-out",
          open ? "max-h-[80vh]" : "max-h-0 border-transparent",
        )}
      >
        <nav className="flex flex-col px-5 py-4 sm:px-8">
          {navRoutes.map((route, i) => (
            <Link
              key={route.key}
              href={localePath(locale, route.href)}
              className={cn(
                "flex items-center justify-between border-b border-hairline/70 py-4 font-display text-xl transition-colors",
                isActive(route.href) ? "text-accent" : "text-ink",
              )}
            >
              <span>{dict.nav[route.key as keyof typeof dict.nav]}</span>
              <span className="font-mono text-[11px] text-steel-400">
                0{i + 1}
              </span>
            </Link>
          ))}
          <div className="mt-6 flex items-center justify-between">
            <LocaleSwitcher current={locale} />
            <Link
              href={localePath(locale, "/quote")}
              className="inline-flex items-center gap-2 bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper"
            >
              {dict.nav.quote} <span className="rtl:rotate-180">→</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
