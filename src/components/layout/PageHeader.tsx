import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";

interface PageHeaderProps {
  kicker: string;
  title: string;
  lead?: string;
  index?: string;
}

export function PageHeader({ kicker, title, lead, index }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-surface pt-[68px]">
      <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-3xl">
            <Reveal>
              <Kicker>{kicker}</Kicker>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.98] tracking-tight text-ink text-balance">
                {title}
              </h1>
            </Reveal>
            {lead && (
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-700">
                  {lead}
                </p>
              </Reveal>
            )}
          </div>
          {index && (
            <span className="hidden font-mono text-sm tracking-[0.14em] text-steel-500 lg:block">
              {index}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
