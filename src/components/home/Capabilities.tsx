"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries";

export function Capabilities({ dict }: { dict: Dictionary }) {
  const c = dict.home.capabilities;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative px-5 sm:px-8 lg:px-12"
      style={{ paddingBlock: "var(--space-section)" }}
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Asymmetric header — title takes 2/3, lead pushed right */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr] lg:items-end">
          <div>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-4 h-[2px] bg-accent"
            />
            <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-ink">
              {c.title}
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-steel-700 lg:text-end rtl:lg:text-start">
            {c.lead}
          </p>
        </div>

        {/* Staggered editorial layout — NOT a symmetric grid */}
        <div className="mt-20 space-y-0">
          {c.items.map((item, i) => (
            <motion.article
              key={item.no}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              className="group grid grid-cols-1 items-baseline gap-4 border-t border-hairline py-10 lg:grid-cols-[80px_1fr_1.5fr] lg:gap-8 lg:py-12"
            >
              <span className="font-mono text-sm text-steel-500 transition-colors duration-300 group-hover:text-accent">
                {item.no}
              </span>
              <h3 className="font-display text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-accent-hot lg:text-2xl">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-steel-700 lg:text-base">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
