"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CatalogCategory, CatalogProduct } from "@/types/content";
import { localePath } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Kicker } from "@/components/ui/Kicker";

interface ProductShowcaseProps {
  locale: Locale;
  dict: Dictionary;
  categories: CatalogCategory[];
  products: CatalogProduct[];
}

/** How many items are visible either side of the centered one. */
const VISIBLE_SIDE = 2;
/**
 * Horizontal step between neighbours, in `cqw` — percent of the STAGE width.
 * Plain % in a transform resolves against the element's own width, which made
 * the cards bunch together instead of spanning the column.
 */
const STEP = 27;
/** Drag distance (px) that commits to a slide change. */
const SWIPE_THRESHOLD = 60;

export function ProductShowcase({
  locale,
  dict,
  categories,
  products,
}: ProductShowcaseProps) {
  const t = dict.home.productShowcase;
  const isRtl = locale === "ar";
  /** Flips every horizontal transform and the arrow direction for Arabic. */
  const dir = isRtl ? -1 : 1;

  // Only categories that actually have products — an empty tab is a dead end.
  const groups = useMemo(() => {
    const byCategory = new Map<string, CatalogProduct[]>();
    for (const p of products) {
      const key = p.category || "uncategorized";
      const bucket = byCategory.get(key);
      if (bucket) bucket.push(p);
      else byCategory.set(key, [p]);
    }

    const ordered = categories
      .filter((c) => (byCategory.get(c.slug)?.length ?? 0) > 0)
      .map((c) => ({
        slug: c.slug,
        title: c.title || c.slug,
        items: byCategory.get(c.slug) ?? [],
      }));

    // Products whose category isn't in the category list would otherwise vanish.
    const known = new Set(categories.map((c) => c.slug));
    for (const [slug, items] of byCategory) {
      if (!known.has(slug)) {
        ordered.push({ slug, title: items[0]?.categoryLabel || slug, items });
      }
    }

    return ordered;
  }, [categories, products]);

  const [activeGroup, setActiveGroup] = useState(0);
  const [index, setIndex] = useState(0);

  // Clamp if the data changes underneath us (locale switch, CMS edit).
  const safeGroup = Math.min(activeGroup, Math.max(groups.length - 1, 0));
  const items = groups[safeGroup]?.items ?? [];
  const count = items.length;
  const active = count > 0 ? ((index % count) + count) % count : 0;

  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; active: boolean }>({ x: 0, active: false });

  const go = useCallback(
    (delta: number) => {
      if (count < 2) return;
      setIndex((i) => (((i + delta) % count) + count) % count);
    },
    [count],
  );

  const selectGroup = useCallback((i: number) => {
    setActiveGroup(i);
    setIndex(0);
  }, []);

  // Horizontal trackpad swipe. deltaX only, so vertical page scrolling is never
  // hijacked.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || count < 2) return;

    let cooldown = false;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 12) return;
      e.preventDefault();
      if (cooldown) return;
      cooldown = true;
      go(e.deltaX > 0 ? dir : -dir);
      setTimeout(() => {
        cooldown = false;
      }, 320);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [count, go, dir]);

  if (groups.length === 0) return null;

  const current = items[active];

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden className="absolute inset-0 blueprint-grid opacity-[0.06]" />
      {/* Glow behind the centered part, as in the reference */}
      <div
        aria-hidden
        className="pointer-events-none absolute end-0 top-1/2 h-[60rem] w-[60rem] -translate-y-1/2 translate-x-1/4 rounded-full opacity-[0.10] blur-3xl rtl:-translate-x-1/4"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)" }}
      />

      <div
        className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"
        style={{ paddingBlock: "var(--space-section-sm)" }}
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
          {/* ── Left: category rail ─────────────────────────────── */}
          <div>
            <Kicker>{t.kicker}</Kicker>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-paper">
              {t.title}
            </h2>
            <p className="mt-4 max-w-sm text-steel-300">{t.lead}</p>

            <div
              role="tablist"
              aria-label={t.title}
              aria-orientation="vertical"
              className="mt-10 flex flex-col items-start gap-1"
            >
              {groups.map((g, i) => {
                const isCurrent = i === safeGroup;
                return (
                  <button
                    key={g.slug}
                    role="tab"
                    type="button"
                    id={`showcase-tab-${g.slug}`}
                    aria-selected={isCurrent}
                    aria-controls={`showcase-panel-${g.slug}`}
                    tabIndex={isCurrent ? 0 : -1}
                    onClick={() => selectGroup(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                        e.preventDefault();
                        selectGroup((i + 1) % groups.length);
                      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                        e.preventDefault();
                        selectGroup((i - 1 + groups.length) % groups.length);
                      }
                    }}
                    className={cn(
                      "group/cat relative py-3 text-start font-display text-xl font-semibold tracking-tight transition-colors duration-300 outline-none sm:text-2xl",
                      "focus-visible:text-paper",
                      isCurrent
                        ? "text-paper"
                        : "text-steel-500 hover:text-steel-300",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -start-4 top-1/2 h-5 w-[2px] -translate-y-1/2 bg-accent transition-all duration-300",
                        isCurrent ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {g.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right: coverflow stage ──────────────────────────── */}
          <div
            role="tabpanel"
            id={`showcase-panel-${groups[safeGroup]?.slug}`}
            aria-labelledby={`showcase-tab-${groups[safeGroup]?.slug}`}
            className="flex min-w-0 flex-col justify-center"
          >
            <div
              ref={stageRef}
              role="group"
              aria-roledescription="carousel"
              aria-label={groups[safeGroup]?.title}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  go(dir);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  go(-dir);
                }
              }}
              onPointerDown={(e) => {
                if (count < 2) return;
                drag.current = { x: e.clientX, active: true };
              }}
              onPointerUp={(e) => {
                if (!drag.current.active) return;
                const moved = e.clientX - drag.current.x;
                drag.current.active = false;
                if (Math.abs(moved) > SWIPE_THRESHOLD) go(moved < 0 ? dir : -dir);
              }}
              onPointerCancel={() => {
                drag.current.active = false;
              }}
              // inline-size container so children can offset in `cqw`.
              style={{ containerType: "inline-size" }}
              className="relative h-[15rem] touch-pan-y select-none outline-none sm:h-[19rem] lg:h-[22rem]"
            >
              {items.map((p, i) => {
                // Shortest circular distance, so the row wraps both ways.
                let offset = i - active;
                if (offset > count / 2) offset -= count;
                if (offset < -count / 2) offset += count;

                const distance = Math.abs(offset);
                if (distance > VISIBLE_SIDE) return null;

                const isCenter = offset === 0;

                return (
                  <button
                    key={p.slug}
                    type="button"
                    aria-hidden={!isCenter}
                    tabIndex={-1}
                    aria-label={t.select.replace("{title}", p.title)}
                    onClick={() => !isCenter && go(offset)}
                    // Each layer fills the stage and centres its card with flex,
                    // so nothing depends on percentage-based centring.
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out",
                      isCenter ? "cursor-default" : "cursor-pointer",
                    )}
                    style={{
                      transform: `translateX(${offset * STEP * dir}cqw) scale(${1 - distance * 0.16})`,
                      opacity: distance === 0 ? 1 : distance === 1 ? 0.62 : 0.3,
                      zIndex: 10 - distance,
                    }}
                  >
                    <span
                      className={cn(
                        "relative block aspect-[4/3] h-full overflow-hidden border transition-colors duration-500",
                        isCenter
                          ? "border-steel-700 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.75)]"
                          : "border-steel-900",
                      )}
                    >
                      <Image
                        src={p.image}
                        alt={isCenter ? p.title : ""}
                        fill
                        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 48vw, 32vw"
                        className={cn(
                          "object-cover transition-all duration-500",
                          isCenter ? "" : "grayscale",
                        )}
                        priority={isCenter && safeGroup === 0}
                      />
                      {!isCenter && (
                        <span aria-hidden className="absolute inset-0 bg-ink/25" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Caption + controls */}
            <div className="mt-6 flex items-center justify-center gap-5">
              {count > 1 && (
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t.prev}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-steel-700 text-steel-300 transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-none"
                >
                  <Arrow className="rtl:rotate-180" />
                </button>
              )}

              <div className="min-w-0 flex-1 text-center sm:flex-none sm:min-w-[16rem]">
                {current ? (
                  <>
                    {/* Announces the product as it changes, for screen readers */}
                    <p aria-live="polite" className="font-display text-lg font-semibold text-paper">
                      {current.title}
                    </p>
                    <Link
                      href={localePath(locale, `/catalog/${current.slug}`)}
                      className="link-underline mt-1 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-accent"
                    >
                      {t.viewProduct}
                    </Link>
                  </>
                ) : (
                  <p className="font-mono text-sm text-steel-400">{t.empty}</p>
                )}
              </div>

              {count > 1 && (
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t.next}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-steel-700 text-steel-300 transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-none"
                >
                  <Arrow className="rotate-180 rtl:rotate-0" />
                </button>
              )}
            </div>

            <div className="mt-8 text-center">
              <Link
                href={localePath(locale, "/catalog")}
                className="link-underline font-mono text-[11px] uppercase tracking-[0.16em] text-steel-300 transition-colors hover:text-accent"
              >
                {t.viewAll}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      aria-hidden
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
