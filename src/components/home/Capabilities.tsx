import type { Dictionary } from "@/i18n/dictionaries";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";

export function Capabilities({ dict }: { dict: Dictionary }) {
  const c = dict.home.capabilities;
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div>
        <Kicker className="mb-5">{c.kicker}</Kicker>
        <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-ink text-balance">
          {c.title}
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-steel-700">
          {c.lead}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {c.items.map((item, i) => (
          <Reveal key={item.no} delay={i * 0.07}>
            <article
              className={`group relative flex flex-col border border-hairline p-8 transition-all duration-500 hover:border-ink/30 hover:shadow-[0_2px_24px_-4px_rgba(0,0,0,0.08)] ${
                i % 2 === 1 ? "sm:translate-y-8" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-[3.5rem] font-bold leading-none text-hairline transition-colors duration-500 group-hover:text-accent/20">
                  {item.no}
                </span>
                <span className="h-px flex-1 bg-hairline transition-colors duration-500 group-hover:bg-accent/30" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-700">
                {item.body}
              </p>
              <span
                aria-hidden
                className="absolute bottom-0 end-0 h-0 w-0 border-b-[3px] border-e-[3px] border-transparent transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:border-accent"
              />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
