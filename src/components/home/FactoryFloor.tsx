import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/nav";
import { factoryPhotosFor } from "@/lib/factory";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface FactoryFloorProps {
  locale: Locale;
  dict: Dictionary;
}

export function FactoryFloor({ locale, dict }: FactoryFloorProps) {
  const f = dict.home.factory;
  const photos = factoryPhotosFor(dict);
  const strip = [photos.colosio, photos.idra, photos.crucible];

  return (
    <section className="border-y border-hairline bg-surface">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading kicker={f.kicker} title={f.title} lead={f.lead} />
          <Reveal delay={0.08} className="shrink-0">
            <ButtonLink
              href={localePath(locale, "/about")}
              variant="outline"
              arrow
            >
              {f.cta}
            </ButtonLink>
          </Reveal>
        </div>

        {/* Editorial strip — not a card grid: one continuous plant view */}
        <div className="mt-14 grid grid-cols-1 gap-px border border-hairline bg-hairline lg:grid-cols-3">
          {strip.map((photo, i) => (
            <Reveal key={photo.src} delay={0.06 * i}>
              <figure className="group relative aspect-[4/3] overflow-hidden bg-ink/5">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="image-grade object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/70 via-ink/25 to-transparent px-4 pb-4 pt-16">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/70">
                      {photo.detail}
                    </p>
                    <p className="mt-0.5 font-display text-sm font-semibold text-paper">
                      {photo.caption}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-accent">
                    0{i + 1}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
