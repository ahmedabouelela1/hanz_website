"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/nav";
import { cn } from "@/lib/utils";

interface SideToolbarProps {
  locale: Locale;
  dict: { nav: Record<string, string>; home: { factory: { kicker: string } } };
}

const sections = [
  {
    id: "capabilities",
    label: "Capabilities",
    labelAr: "القدرات",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <circle cx="12" cy="12" r="3.1" />
        <path d="M19.1 14.8a1.6 1.6 0 0 0 .32 1.77l.06.06a1.94 1.94 0 1 1-2.75 2.75l-.06-.06a1.6 1.6 0 0 0-1.77-.32 1.6 1.6 0 0 0-.97 1.47v.17a1.94 1.94 0 1 1-3.88 0v-.09a1.6 1.6 0 0 0-1.03-1.46 1.6 1.6 0 0 0-1.77.32l-.06.06a1.94 1.94 0 1 1-2.75-2.75l.06-.06a1.6 1.6 0 0 0 .32-1.77 1.6 1.6 0 0 0-1.47-.97h-.17a1.94 1.94 0 1 1 0-3.88h.09a1.6 1.6 0 0 0 1.46-1.03 1.6 1.6 0 0 0-.32-1.77l-.06-.06a1.94 1.94 0 1 1 2.75-2.75l.06.06a1.6 1.6 0 0 0 1.77.32h.08a1.6 1.6 0 0 0 .97-1.47v-.17a1.94 1.94 0 1 1 3.88 0v.09a1.6 1.6 0 0 0 .97 1.46 1.6 1.6 0 0 0 1.77-.32l.06-.06a1.94 1.94 0 1 1 2.75 2.75l-.06.06a1.6 1.6 0 0 0-.32 1.77v.08a1.6 1.6 0 0 0 1.47.97h.17a1.94 1.94 0 1 1 0 3.88h-.09a1.6 1.6 0 0 0-1.46.97Z" />
      </svg>
    ),
  },
  {
    id: "process",
    label: "Process",
    labelAr: "العملية",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" />
      </svg>
    ),
  },
  {
    id: "factory",
    label: "Factory",
    labelAr: "المصنع",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="M2 20V8l7 4V8l7 4V4h6v16H2Z" />
      </svg>
    ),
  },
  {
    id: "catalog",
    label: "Products",
    labelAr: "المنتجات",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 3H8l-2 4h12l-2-4Z" />
      </svg>
    ),
  },
  {
    id: "partners",
    label: "Partners",
    labelAr: "الشركاء",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="m11 17 2 2a1 1 0 0 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 0 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a2 2 0 0 0 1.4.2L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14l6.5 6.5a1 1 0 0 0 3-3" /><path d="M3 4h8" />
      </svg>
    ),
  },
  {
    id: "cta",
    label: "Get a Quote",
    labelAr: "عرض سعر",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" />
      </svg>
    ),
  },
];

export function SideToolbar({ locale }: SideToolbarProps) {
  const pathname = usePathname();
  const isHome = pathname === localePath(locale, "/");
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setVisible(window.scrollY > 350);
      const ids = sections.map((s) => s.id);
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          current = id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (!isHome) return null;

  const isAr = locale === "ar";

  return (
    <aside
      className={cn(
        "fixed end-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-0.5 pe-4 transition-all duration-500 xl:flex",
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
      )}
    >
      {/* Top line */}
      <div className="mx-auto mb-3 h-8 w-px bg-gradient-to-b from-transparent to-ink/20" />

      {sections.map((item) => {
        const isCurrent = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollTo(item.id)}
            className="group/tb flex items-center gap-0 overflow-hidden"
          >
            {/* Label — slides in on hover */}
            <span
              className={cn(
                "max-w-0 overflow-hidden whitespace-nowrap pe-0 font-mono text-[10px] font-medium uppercase tracking-[0.14em] opacity-0 transition-all duration-300 group-hover/tb:max-w-[12rem] group-hover/tb:pe-3 group-hover/tb:opacity-100",
                isCurrent ? "text-accent" : "text-ink",
              )}
            >
              {isAr ? item.labelAr : item.label}
            </span>
            {/* Icon pill */}
            <span
              className={cn(
                "relative grid h-11 w-11 shrink-0 place-items-center border backdrop-blur-sm transition-all duration-300",
                isCurrent
                  ? "border-accent bg-accent text-paper shadow-[0_0_12px_rgba(221,79,16,0.35)]"
                  : "border-ink/15 bg-paper/90 text-steel-500 group-hover/tb:border-accent group-hover/tb:text-accent",
              )}
            >
              {item.icon}
              {/* Active pip */}
              {isCurrent && (
                <span className="absolute -start-1 top-1/2 h-2.5 w-0.5 -translate-y-1/2 bg-accent" />
              )}
            </span>
          </button>
        );
      })}

      {/* Bottom line */}
      <div className="mx-auto mt-3 h-8 w-px bg-gradient-to-t from-transparent to-ink/20" />
    </aside>
  );
}
