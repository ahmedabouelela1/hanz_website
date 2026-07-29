"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/nav";
import { ButtonLink } from "@/components/ui/Button";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  const h = dict.home.hero;
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-ink">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? {} : { y: imageY, scale: imageScale }}
      >
        <Image
          src="/factory/hero-cinematic.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[55%_30%] saturate-[0.65] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-ink/22" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/15 to-transparent rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 blueprint-grid-invert opacity-50" />
      </motion.div>

      {/* Content — asymmetric, pushed left */}
      <motion.div
        className="relative flex min-h-[100svh] items-end pb-[12vh] lg:items-center lg:pb-0"
        style={prefersReduced ? {} : { y: textY, opacity }}
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6 h-[2px] bg-accent-hot"
            />

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-accent-hot"
            >
              {h.kicker}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 font-display text-[clamp(2.25rem,5.6vw,4.5rem)] font-bold leading-[0.94] tracking-tight text-paper"
            >
              {h.titleLine1}
              <br />
              <span className="text-accent-hot">{h.titleAccent}</span>
              <br />
              {h.titleLine2}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8 max-w-md text-base leading-relaxed text-paper/70 lg:text-lg"
            >
              {h.lead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <ButtonLink
                href={localePath(locale, "/quote")}
                variant="solid-invert"
              >
                {dict.cta.requestQuote}
              </ButtonLink>
              <ButtonLink
                href={localePath(locale, "/catalog")}
                variant="outline-invert"
              >
                {dict.cta.viewCatalog}
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="absolute bottom-[12vh] end-8 hidden flex-col gap-10 lg:flex lg:end-12"
          >
            {[
              { value: h.stat1Value, label: h.stat1Label },
              { value: h.stat2Value, label: h.stat2Label },
              { value: h.stat3Value, label: h.stat3Label },
            ].map((s) => (
              <div key={s.label} className="text-end rtl:text-start">
                <div className="font-display text-3xl font-bold text-paper">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/45">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 border-t border-paper/10">
        <div className="mx-auto flex max-w-[1440px] items-center gap-8 overflow-hidden px-5 py-3 sm:px-8 lg:px-12">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-hot">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent-hot" />
            {h.live}
          </span>
          <div className="flex gap-6 overflow-hidden">
            {h.ribbon.map((item: string) => (
              <span
                key={item}
                className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/50"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
