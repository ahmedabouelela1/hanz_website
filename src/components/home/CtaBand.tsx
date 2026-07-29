"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/nav";

interface CtaBandProps {
  locale: Locale;
  dict: Dictionary;
}

export function CtaBand({ locale, dict }: CtaBandProps) {
  const c = dict.home.ctaBand;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * 0.15;
    const dy = (e.clientY - centerY) * 0.15;
    setBtnOffset({ x: dx, y: dy });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setBtnOffset({ x: 0, y: 0 });
  }, []);

  return (
    <section
      ref={ref}
      className="px-5 sm:px-8 lg:px-12"
      style={{ paddingBlock: "var(--space-section)" }}
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden border border-ink bg-ink p-10 text-paper lg:p-20"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div aria-hidden className="absolute inset-0 blueprint-grid opacity-[0.07]" />
          <div aria-hidden className="hazard-hatch absolute inset-x-0 top-0 h-1.5 opacity-90" />

          <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-steel-400">
                {c.kicker}
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-tight text-paper">
                {c.title}
              </h2>
              <p className="mt-4 text-steel-300">{c.lead}</p>
            </div>

            <Link
              ref={btnRef}
              href={localePath(locale, "/quote")}
              className="magnetic-btn inline-flex items-center gap-3 bg-accent px-8 py-4 font-mono text-sm uppercase tracking-[0.15em] text-paper transition-all duration-300 hover:bg-accent-hot"
              style={{
                transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
              }}
            >
              {dict.cta.requestQuote}
              <span className="transition-transform duration-300 rtl:rotate-180">
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
