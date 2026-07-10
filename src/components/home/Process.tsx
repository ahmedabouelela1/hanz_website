import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Process({ dict }: { dict: Dictionary }) {
  const p = dict.home.process;
  return (
    <section className="border-y border-hairline bg-surface">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading kicker={p.kicker} title={p.title} />

        <ol className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {p.steps.map((step, i) => (
            <Reveal key={step.no} delay={i * 0.07}>
              <li className="relative">
                <div className="flex items-center gap-4">
                  <span className="font-display text-5xl font-bold text-hairline">
                    {step.no}
                  </span>
                  <span className="h-px flex-1 bg-hairline" />
                  <span className="h-2 w-2 bg-accent" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-700">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
