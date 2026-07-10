import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/nav";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface CtaBandProps {
  locale: Locale;
  dict: Dictionary;
}

export function CtaBand({ locale, dict }: CtaBandProps) {
  const c = dict.home.ctaBand;
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
      <Reveal>
        <div className="relative overflow-hidden border border-ink bg-ink px-6 py-16 text-paper sm:px-12 lg:px-16 lg:py-20">
          <div aria-hidden className="absolute inset-0 blueprint-grid opacity-[0.07]" />
          {/* hazard accent strip */}
          <div aria-hidden className="hazard-hatch absolute inset-x-0 top-0 h-1.5 opacity-90" />

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="kicker text-steel-400">{c.kicker}</span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
                {c.title}
              </h2>
              <p className="mt-5 max-w-lg text-steel-300">{c.lead}</p>
            </div>
            <div className="shrink-0">
              <ButtonLink
                href={localePath(locale, "/quote")}
                variant="solid"
                className="bg-accent text-paper hover:bg-accent-hot"
              >
                {dict.cta.requestQuote}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
