import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Process({ dict }: { dict: Dictionary }) {
  const p = dict.home.process;
  return (
    <section id="process" className="relative overflow-hidden border-y border-hairline bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute -end-12 top-1/2 -translate-y-1/2 select-none font-display text-[18rem] font-bold leading-none text-hairline/30 sm:text-[24rem]"
      >
        05
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading kicker={p.kicker} title={p.title} />

        <div className="relative mt-16">
          {/* Connecting line */}
          <div
            aria-hidden
            className="absolute top-6 hidden h-px w-full bg-hairline lg:block"
          />

          <ol className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-5">
            {p.steps.map((step, i) => (
              <Reveal key={step.no} delay={i * 0.08}>
                <li className="group relative px-0 lg:px-4">
                  <div className="relative mb-8 flex items-center gap-4 lg:mb-10">
                    <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center border border-hairline bg-paper font-display text-lg font-bold text-steel-400 transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
                      {step.no}
                    </span>
                    <span className="h-px flex-1 bg-hairline lg:hidden" />
                  </div>

                  <h3 className="font-display text-base font-semibold text-ink lg:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-700">
                    {step.body}
                  </p>

                  {i < p.steps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute end-0 top-6 hidden -translate-y-1/2 text-hairline lg:block rtl:rotate-180"
                    >
                      →
                    </span>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
