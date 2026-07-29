import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import { factoryPhotosFor } from "@/lib/factory";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface FacilityGalleryProps {
  dict: Dictionary;
}

export function FacilityGallery({ dict }: FacilityGalleryProps) {
  const f = dict.about.facility;
  const photos = factoryPhotosFor(dict);
  const featured = photos.colosio;
  const side = [photos.idra, photos.comapress];
  const mid = [photos.crucible, photos.comapressPanel, photos.muller];
  const bottom = [photos.italpress, photos.stamping];

  return (
    <section className="border-y border-hairline bg-surface">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading kicker={f.kicker} title={f.title} lead={f.lead} />

        {/* Asymmetric plant mosaic — hero bay + supporting cells */}
        <div className="mt-14 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4">
          <Reveal className="lg:col-span-7">
            <figure className="group relative aspect-[16/10] overflow-hidden border border-hairline">
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="image-grade object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/75 via-ink/30 to-transparent px-5 pb-5 pt-20">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
                    {featured.detail}
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-ink">
                    {featured.caption}
                  </p>
                </div>
                <span className="font-mono text-[10px] tracking-[0.16em] text-accent">
                  01
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:col-span-5 lg:flex lg:flex-col lg:gap-4">
            {side.map((photo, i) => (
              <Reveal key={photo.src} delay={0.08 * (i + 1)} className="min-h-0 flex-1">
                <figure className="group relative aspect-[4/3] h-full min-h-[200px] overflow-hidden border border-hairline lg:aspect-auto lg:min-h-[240px]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="image-grade object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-4 pb-4 pt-14">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
                      {photo.detail}
                    </p>
                    <p className="mt-0.5 font-display text-sm font-semibold text-ink">
                      {photo.caption}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {mid.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={0.1 + i * 0.05}
              className="lg:col-span-4"
            >
              <figure className="group relative aspect-[4/3] overflow-hidden border border-hairline">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="image-grade object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent px-4 pb-4 pt-14">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
                      {photo.detail}
                    </p>
                    <p className="mt-0.5 font-display text-sm font-semibold text-ink">
                      {photo.caption}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-accent">
                    0{i + 4}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}

          {bottom.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={0.16 + i * 0.05}
              className="lg:col-span-6"
            >
              <figure className="group relative aspect-[16/9] overflow-hidden border border-hairline">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="image-grade object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent px-5 pb-4 pt-16">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70">
                      {photo.detail}
                    </p>
                    <p className="mt-0.5 font-display text-base font-semibold text-ink">
                      {photo.caption}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-accent">
                    0{i + 7}
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
