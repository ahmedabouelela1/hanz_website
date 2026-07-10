import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Capabilities({ dict }: { dict: Dictionary }) {
  const c = dict.home.capabilities;
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <SectionHeading kicker={c.kicker} title={c.title} lead={c.lead} />

      <div className="mt-14 grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {c.items.map((item, i) => (
          <Reveal key={item.no} delay={i * 0.06}>
            <article className="group relative flex h-full flex-col bg-paper p-7 transition-colors duration-300 hover:bg-surface-2">
              <span className="font-mono text-[11px] tracking-[0.14em] text-steel-400">
                {item.no}
              </span>
              <span className="mt-6 block h-8 w-8 border border-ink/20 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/5" />
              <h3 className="mt-6 font-display text-xl font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-700">
                {item.body}
              </p>
              <span className="mt-6 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
