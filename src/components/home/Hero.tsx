import { Fragment } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/nav";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  const h = dict.home.hero;
  const pillars = h.pillars;
  const stats = [
    { value: h.stat1Value, label: h.stat1Label },
    { value: h.stat2Value, label: h.stat2Label },
    { value: h.stat3Value, label: h.stat3Label },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Full-bleed die-casting floor */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/factory/hero-cinematic.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[55%_40%] saturate-[0.65] contrast-[1.08]"
        />
        {/* base tone so any crop of the photo stays dark enough for copy */}
        <div className="absolute inset-0 bg-ink/35" />
        {/* copy-side scrim, mirrored in RTL */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/25 to-transparent rtl:bg-gradient-to-l" />
        {/* vertical falloff: under the header, and down into the ribbon */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/75" />
        <div className="absolute inset-0 blueprint-grid-invert opacity-70" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-[132px] sm:px-8 lg:px-12 lg:pb-24 lg:pt-[168px]">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase leading-none tracking-[0.28em] text-paper/55">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-hot" />
              {h.kicker}
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,5.4vw,4.75rem)] font-bold leading-[0.98] tracking-tight text-paper">
              {h.titleLine1}{" "}
              <span className="text-accent-hot underline decoration-accent-hot/35 decoration-[3px] underline-offset-[10px]">
                {h.titleAccent}
              </span>{" "}
              {h.titleLine2}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-paper/70">
              {h.lead}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink
                href={localePath(locale, "/quote")}
                variant="solid-invert"
              >
                {dict.cta.requestQuote}
              </ButtonLink>
              <ButtonLink
                href={localePath(locale, "/catalog")}
                variant="outline-invert"
                arrow={false}
              >
                {dict.cta.viewCatalog}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-paper/15 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl font-bold text-paper sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-paper/45">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Industries we serve — pillar strip */}
      <div className="relative border-t border-paper/10 bg-ink/80 backdrop-blur-sm">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px bg-paper/10 sm:grid-cols-4">
          {pillars.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <div className="flex flex-col items-center gap-2 bg-ink/70 px-4 py-6 text-center transition-colors duration-300 hover:bg-ink/40">
                <span className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-paper">
                  {item.label}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-paper/45">
                  {item.note}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* running spec ribbon — closes the dark hero block */}
      <div className="relative border-t border-paper/10 bg-ink">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-8 gap-y-2 px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50 sm:px-8 lg:px-12">
          <span className="text-accent-hot">● {h.live}</span>
          {h.ribbon.map((item: string, i: number) => (
            <Fragment key={item}>
              {i > 0 && <span className="text-paper/25">/</span>}
              <span>{item}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
