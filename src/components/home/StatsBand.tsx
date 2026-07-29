"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries";

/** Parse values like "99.4%", "2.1M", "48h". Returns null for non-numeric (e.g. "ISO 9001"). */
function parseStat(value: string): {
  target: number;
  decimals: number;
  suffix: string;
} | null {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const raw = match[1];
  return {
    target: parseFloat(raw),
    decimals: raw.includes(".") ? raw.split(".")[1].length : 0,
    suffix: match[2],
  };
}

function CountUp({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const parsed = parseStat(value);

    if (!inView || !parsed) {
      setDisplay(value);
      return;
    }

    const { target, decimals, suffix } = parsed;
    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = target * eased;
      setDisplay(
        (decimals > 0 ? current.toFixed(decimals) : String(Math.round(current))) +
          suffix,
      );
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, value]);

  return <span className="whitespace-nowrap">{display}</span>;
}

export function StatsBand({ dict }: { dict: Dictionary }) {
  const s = dict.home.stats;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink text-paper"
      style={{ paddingBlock: "var(--space-section-sm)" }}
    >
      <div aria-hidden className="absolute inset-0 blueprint-grid opacity-[0.06]" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-0">
          {s.items.map((item, i) => {
            const isNumeric = Boolean(parseStat(item.value));
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative flex flex-col justify-end lg:border-l lg:border-steel-700 lg:px-8 lg:first:border-l-0 lg:first:ps-0"
              >
                <div
                  className={
                    isNumeric
                      ? "font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-none tracking-tight text-paper"
                      : "font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-none tracking-tight text-paper"
                  }
                >
                  <CountUp value={item.value} inView={inView} />
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-steel-400">
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
