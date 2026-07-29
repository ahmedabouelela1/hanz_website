"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/nav";
import { cn } from "@/lib/utils";

interface SideToolbarProps {
  locale: Locale;
  dict: { sideNav: Record<string, string> };
}

/** Fallback if the fixed header can't be measured (it is h-[68px] / lg:h-[76px]). */
const HEADER_FALLBACK = 76;
/** Breathing room left between the header and the top of the section we scrolled to. */
const SCROLL_GAP = 16;
/**
 * The scroll-spy line sits a little below where a clicked section lands, so the
 * section you just clicked always reads as active. Must stay > SCROLL_GAP.
 */
const ANCHOR_TOLERANCE = 24;
/** Programmatic scrolls are considered finished after this long without a scroll event. */
const SETTLE_MS = 120;
/** Hard ceiling on the spy lock, in case the smooth scroll never moves (already in place). */
const LOCK_MAX_MS = 1200;

/**
 * Listed in page order. The spy re-sorts by real DOM position on mount, so this
 * array staying in sync with `[locale]/page.tsx` is a nicety, not a correctness
 * requirement — an out-of-order entry used to make the rail highlight the wrong
 * button.
 */
const sections = [
  {
    id: "capabilities",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <circle cx="12" cy="12" r="3.1" />
        <path d="M19.1 14.8a1.6 1.6 0 0 0 .32 1.77l.06.06a1.94 1.94 0 1 1-2.75 2.75l-.06-.06a1.6 1.6 0 0 0-1.77-.32 1.6 1.6 0 0 0-.97 1.47v.17a1.94 1.94 0 1 1-3.88 0v-.09a1.6 1.6 0 0 0-1.03-1.46 1.6 1.6 0 0 0-1.77.32l-.06.06a1.94 1.94 0 1 1-2.75-2.75l.06-.06a1.6 1.6 0 0 0 .32-1.77 1.6 1.6 0 0 0-1.47-.97h-.17a1.94 1.94 0 1 1 0-3.88h.09a1.6 1.6 0 0 0 1.46-1.03 1.6 1.6 0 0 0-.32-1.77l-.06-.06a1.94 1.94 0 1 1 2.75-2.75l.06.06a1.6 1.6 0 0 0 1.77.32h.08a1.6 1.6 0 0 0 .97-1.47v-.17a1.94 1.94 0 1 1 3.88 0v.09a1.6 1.6 0 0 0 .97 1.46 1.6 1.6 0 0 0 1.77-.32l.06-.06a1.94 1.94 0 1 1 2.75 2.75l-.06.06a1.6 1.6 0 0 0-.32 1.77v.08a1.6 1.6 0 0 0 1.47.97h.17a1.94 1.94 0 1 1 0 3.88h-.09a1.6 1.6 0 0 0-1.46.97Z" />
      </svg>
    ),
  },
  {
    id: "catalog",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 3H8l-2 4h12l-2-4Z" />
      </svg>
    ),
  },
  {
    id: "process",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" />
      </svg>
    ),
  },
  {
    id: "factory",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="M2 20V8l7 4V8l7 4V4h6v16H2Z" />
      </svg>
    ),
  },
  {
    id: "partners",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="m11 17 2 2a1 1 0 0 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 0 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a2 2 0 0 0 1.4.2L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14l6.5 6.5a1 1 0 0 0 3-3" /><path d="M3 4h8" />
      </svg>
    ),
  },
  {
    id: "cta",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" />
      </svg>
    ),
  },
];

const sectionById = new Map(sections.map((s) => [s.id, s]));

function headerOffset() {
  const header = document.querySelector("header");
  return header instanceof HTMLElement && header.offsetHeight > 0
    ? header.offsetHeight
    : HEADER_FALLBACK;
}

export function SideToolbar({ locale, dict }: SideToolbarProps) {
  const pathname = usePathname();
  const isHome = pathname === localePath(locale, "/");
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");
  /** Ids that actually exist on the page, in real DOM order. */
  const [order, setOrder] = useState<string[]>(() => sections.map((s) => s.id));

  // While a click-driven scroll is animating, the spy would otherwise light up
  // every section we fly past. Pin the target until the scroll settles.
  const lockedTo = useRef<string | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxLockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const releaseLock = useCallback(() => {
    lockedTo.current = null;
    if (settleTimer.current) clearTimeout(settleTimer.current);
    if (maxLockTimer.current) clearTimeout(maxLockTimer.current);
    settleTimer.current = null;
    maxLockTimer.current = null;
  }, []);

  useEffect(() => {
    if (!isHome) return;

    // Sort by live position so the rail order always matches the page order,
    // and drop any section that isn't rendered (no dead buttons).
    const measure = () =>
      sections
        .map((s) => {
          const el = document.getElementById(s.id);
          return el ? { id: s.id, top: el.getBoundingClientRect().top } : null;
        })
        .filter((s): s is { id: string; top: number } => s !== null)
        .sort((a, b) => a.top - b.top);

    const sync = () => {
      const present = measure();
      setOrder((prev) => {
        const next = present.map((s) => s.id);
        return prev.length === next.length && prev.every((id, i) => id === next[i])
          ? prev
          : next;
      });

      setVisible(window.scrollY > 350);

      if (lockedTo.current) return;

      const doc = document.documentElement;
      const atBottom =
        window.scrollY + window.innerHeight >= doc.scrollHeight - 2;

      // The last section can be too short to ever cross the anchor line, so
      // bottoming out counts as reaching it.
      if (atBottom && present.length > 0) {
        setActive(present[present.length - 1].id);
        return;
      }

      // Same line the click scroll targets, so click and highlight agree.
      const anchor = headerOffset() + ANCHOR_TOLERANCE;
      let current = "";
      for (const s of present) {
        if (s.top <= anchor) current = s.id;
      }
      setActive(current);
    };

    let frame = 0;
    const onScroll = () => {
      if (lockedTo.current) {
        if (settleTimer.current) clearTimeout(settleTimer.current);
        settleTimer.current = setTimeout(releaseLock, SETTLE_MS);
      }
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        sync();
      });
    };

    // Any manual scroll input hands control straight back to the spy, even
    // mid-animation.
    const onManualScroll = () => {
      if (!lockedTo.current) return;
      releaseLock();
      sync();
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("wheel", onManualScroll, { passive: true });
    window.addEventListener("touchstart", onManualScroll, { passive: true });
    window.addEventListener("keydown", onManualScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      releaseLock();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onManualScroll);
      window.removeEventListener("touchstart", onManualScroll);
      window.removeEventListener("keydown", onManualScroll);
    };
  }, [isHome, releaseLock]);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      // Clear a previous lock before arming a new one, so rapid clicks don't
      // leave the first target pinned.
      releaseLock();
      lockedTo.current = id;
      setActive(id);
      maxLockTimer.current = setTimeout(releaseLock, LOCK_MAX_MS);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = Math.max(
        0,
        window.scrollY + el.getBoundingClientRect().top - headerOffset() - SCROLL_GAP,
      );
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    },
    [releaseLock],
  );

  if (!isHome) return null;

  return (
    <nav
      aria-label={dict.sideNav.label}
      aria-hidden={!visible}
      className={cn(
        "fixed end-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-0.5 pe-4 transition-all duration-500 xl:flex",
        visible
          ? "translate-x-0 opacity-100"
          : // In RTL the rail is pinned left, so it has to slide out to the left.
            "pointer-events-none translate-x-full opacity-0 rtl:-translate-x-full",
      )}
    >
      {/* Top line */}
      <div className="mx-auto mb-3 h-8 w-px bg-gradient-to-b from-transparent to-ink/20" />

      {order.map((id) => {
        const item = sectionById.get(id);
        if (!item) return null;
        const label = dict.sideNav[id] ?? id;
        const isCurrent = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            aria-label={label}
            aria-current={isCurrent ? "true" : undefined}
            tabIndex={visible ? undefined : -1}
            className="group/tb flex items-center gap-0 overflow-hidden outline-none"
          >
            {/* Label — slides in on hover or keyboard focus */}
            <span
              aria-hidden="true"
              className={cn(
                "max-w-0 overflow-hidden whitespace-nowrap pe-0 font-mono text-[10px] font-medium uppercase tracking-[0.14em] opacity-0 transition-all duration-300",
                "group-hover/tb:max-w-[12rem] group-hover/tb:pe-3 group-hover/tb:opacity-100",
                "group-focus-visible/tb:max-w-[12rem] group-focus-visible/tb:pe-3 group-focus-visible/tb:opacity-100",
                isCurrent ? "text-accent" : "text-steel-700",
              )}
            >
              {label}
            </span>
            {/* Icon pill */}
            <span
              className={cn(
                "relative grid h-11 w-11 shrink-0 place-items-center border backdrop-blur-sm transition-all duration-300",
                "group-focus-visible/tb:ring-2 group-focus-visible/tb:ring-accent group-focus-visible/tb:ring-offset-2 group-focus-visible/tb:ring-offset-paper",
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
    </nav>
  );
}
