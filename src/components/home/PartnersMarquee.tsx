import type { Dictionary } from "@/i18n/dictionaries";
import type { Partner } from "@/types/content";
import { Kicker } from "@/components/ui/Kicker";

interface PartnersMarqueeProps {
  dict: Dictionary;
  partners: Partner[];
}

export function PartnersMarquee({ dict, partners }: PartnersMarqueeProps) {
  const p = dict.home.partners;
  // duplicate list for a seamless loop
  const items = [...partners, ...partners];

  return (
    <section className="border-y border-hairline bg-paper py-14">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Kicker className="mb-8">{p.kicker}</Kicker>
      </div>
      <div className="relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />
        <div className="flex w-max animate-marquee items-center gap-16 px-8">
          {items.map((partner, i) => (
            <span
              key={`${partner.slug}-${i}`}
              className="flex shrink-0 items-center gap-3 font-display text-2xl font-semibold tracking-tight text-steel-400 transition-colors hover:text-ink"
            >
              <span className="h-1.5 w-1.5 bg-accent" />
              {partner.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
