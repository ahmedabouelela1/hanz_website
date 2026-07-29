"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries";

export function Process({ dict }: { dict: Dictionary }) {
  const p = dict.home.process;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="process"
      className="relative scroll-mt-20 overflow-hidden px-5 sm:px-8 lg:px-12"
      style={{ paddingBlock: "var(--space-section)" }}
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section header — left-aligned, tight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {p.kicker}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-ink">
            {p.title}
          </h2>
        </motion.div>

        {/* Horizontal scroll on mobile, stacked timeline on desktop */}
        <div className="horizontal-scroll -mx-5 mt-14 gap-6 px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
          {p.steps.map((step, i) => (
            <motion.div
              key={step.no}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="group flex w-[280px] shrink-0 flex-col lg:w-auto lg:flex-row lg:items-start lg:gap-8 lg:border-l-2 lg:border-hairline lg:py-8 lg:ps-8 lg:hover:border-accent"
            >
              {/* Mobile: card style. Desktop: timeline row */}
              <div className="flex items-center gap-4 lg:w-20 lg:shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline font-mono text-sm text-steel-500 transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                  {step.no}
                </span>
              </div>
              <div className="mt-4 lg:mt-0">
                <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent-hot">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-700">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
