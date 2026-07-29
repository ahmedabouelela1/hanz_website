import type { Dictionary } from "@/i18n/dictionaries";
import type { Partner } from "@/types/content";

interface PartnersMarqueeProps {
  dict: Dictionary;
  partners: Partner[];
}

export function PartnersMarquee({ dict, partners }: PartnersMarqueeProps) {
  const items = [...partners, ...partners];

  return (
    <section className="relative overflow-hidden border-y border-hairline py-10 lg:py-14">
      <div className="flex w-max animate-marquee items-center gap-12 px-8 lg:gap-20">
        {items.map((partner, i) => (
          <span
            key={`${partner.slug}-${i}`}
            className="flex shrink-0 items-center gap-3 font-display text-xl font-semibold tracking-tight text-steel-500 transition-colors duration-300 hover:text-accent-hot lg:text-2xl"
          >
            {partner.name}
          </span>
        ))}
      </div>
    </section>
  );
}
