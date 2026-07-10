import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/ui/Reveal";

export function StatsBand({ dict }: { dict: Dictionary }) {
  const s = dict.home.stats;
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden className="absolute inset-0 blueprint-grid opacity-[0.06]" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <Reveal>
          <h2 className="max-w-xl font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {s.title}
          </h2>
        </Reveal>
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {s.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="border-t border-steel-700 pt-5">
                <dt className="font-display text-4xl font-bold text-paper sm:text-5xl">
                  {item.value}
                </dt>
                <dd className="mt-2 font-mono text-[11px] uppercase leading-tight tracking-[0.12em] text-steel-400">
                  {item.label}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
