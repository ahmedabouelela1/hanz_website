import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/nav";
import { ButtonLink } from "@/components/ui/Button";
import { BlueprintBackground } from "@/components/brand/BlueprintBackground";
import { Reveal } from "@/components/ui/Reveal";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  const h = dict.home.hero;
  const stats = [
    { value: h.stat1Value, label: h.stat1Label },
    { value: h.stat2Value, label: h.stat2Label },
    { value: h.stat3Value, label: h.stat3Label },
  ];

  return (
    <section className="relative overflow-hidden pt-[68px]">
      <BlueprintBackground />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-12 lg:pb-24 lg:pt-24">
        {/* Left: copy */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <span className="kicker inline-flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {h.kicker}
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,5.25rem)] font-bold leading-[0.95] tracking-tight text-ink">
              {h.titleLine1}{" "}
              <span className="relative inline-block text-accent">
                {h.titleAccent}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full bg-accent/30"
                />
              </span>{" "}
              {h.titleLine2}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-steel-700">
              {h.lead}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href={localePath(locale, "/quote")} variant="solid">
                {dict.cta.requestQuote}
              </ButtonLink>
              <ButtonLink
                href={localePath(locale, "/catalog")}
                variant="outline"
                arrow={false}
              >
                {dict.cta.viewCatalog}
              </ButtonLink>
            </div>
          </Reveal>

          {/* stat row */}
          <Reveal delay={0.24}>
            <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-hairline pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl font-bold text-ink sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-steel-500">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Right: framed industrial image with technical annotations */}
        <Reveal delay={0.1} className="relative">
          <div className="tech-frame relative aspect-[4/5] w-full border border-ink/10">
            <Image
              src="https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1200&q=80"
              alt="hanz Industry CNC machining floor"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="image-grade object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />

            {/* annotation chip */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-paper/95 px-4 py-3 backdrop-blur">
              <span className="grid h-8 w-8 place-items-center bg-accent font-mono text-[11px] font-bold text-paper">
                01
              </span>
              <div className="leading-tight">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500">
                  Tolerance
                </p>
                <p className="font-display text-sm font-semibold text-ink">
                  ±0.01 mm held
                </p>
              </div>
            </div>
          </div>

          {/* corner spec ticks */}
          <div className="absolute -right-3 -top-3 hidden font-mono text-[10px] tracking-[0.14em] text-steel-400 lg:block rtl:-left-3 rtl:right-auto">
            N 30°01′ · E 30°58′
          </div>
        </Reveal>
      </div>

      {/* running spec ribbon */}
      <div className="border-y border-hairline bg-surface">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-8 gap-y-2 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500 sm:px-8 lg:px-12">
          <span className="text-accent">● Live</span>
          <span>CNC Machining</span>
          <span className="text-steel-300">/</span>
          <span>Metal Fabrication</span>
          <span className="text-steel-300">/</span>
          <span>Surface Treatment</span>
          <span className="text-steel-300">/</span>
          <span>Assembly & QA</span>
          <span className="text-steel-300">/</span>
          <span>ISO 9001 Certified</span>
        </div>
      </div>
    </section>
  );
}
