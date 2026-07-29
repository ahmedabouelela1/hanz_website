"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/nav";
import { factoryPhotosFor } from "@/lib/factory";
import { ButtonLink } from "@/components/ui/Button";

interface FactoryFloorProps {
  locale: Locale;
  dict: Dictionary;
}

export function FactoryFloor({ locale, dict }: FactoryFloorProps) {
  const f = dict.home.factory;
  const photos = factoryPhotosFor(dict);
  const strip = [photos.colosio, photos.idra, photos.crucible];

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ paddingBlock: "var(--space-section)" }}
    >
      {/* Full-bleed immersive strip — moves on scroll */}
      <motion.div className="flex gap-2" style={{ x }}>
        {[...strip, ...strip].map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            className="relative aspect-[3/2] w-[60vw] shrink-0 overflow-hidden sm:w-[45vw] lg:w-[35vw]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 60vw, 35vw"
              className="image-grade object-cover transition-transform duration-700 hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-paper/70">
                {photo.detail}
              </p>
              <p className="mt-1 font-display text-sm font-semibold text-paper">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Text overlay */}
      <div className="mx-auto mt-12 max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {f.kicker}
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[0.95] tracking-tight text-ink">
              {f.title}
            </h2>
            <p className="mt-3 max-w-md text-steel-700">{f.lead}</p>
          </motion.div>
          <ButtonLink href={localePath(locale, "/about")} variant="outline" arrow>
            {f.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
