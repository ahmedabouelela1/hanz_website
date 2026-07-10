import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { loadPartners } from "@/lib/content";
import { localePath } from "@/lib/nav";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Kicker";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.partners.hero.title, description: dict.partners.hero.lead };
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const partners = await loadPartners();

  return (
    <>
      <PageHeader
        kicker={dict.partners.hero.kicker}
        title={dict.partners.hero.title}
        lead={dict.partners.hero.lead}
        index="04 — Partners"
      />

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, i) => (
            <Reveal key={partner.slug} delay={i * 0.05}>
              <article className="group flex h-full flex-col bg-surface-2 p-7 transition-colors hover:bg-surface">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-steel-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {partner.sector}
                  </span>
                </div>
                {partner.logo ? (
                  <div className="mt-7 flex h-14 w-fit items-center rounded-md bg-white px-3 py-2 ring-1 ring-hairline">
                    {/* Plain img: logos come from many external hosts (incl. http),
                        so we skip next/image host allowlisting for these. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      loading="lazy"
                      className="h-full w-auto max-w-[140px] object-contain"
                    />
                  </div>
                ) : null}
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">
                  {partner.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-steel-700">
                  {partner.blurb}
                </p>
                <span className="mt-6 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right" />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* become a partner */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-12 lg:py-24">
          <div>
            <Kicker className="mb-5">{dict.partners.become.kicker}</Kicker>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              {dict.partners.become.title}
            </h2>
            <p className="mt-5 max-w-md text-steel-700">
              {dict.partners.become.lead}
            </p>
          </div>
          <div className="lg:justify-self-end">
            <ButtonLink href={localePath(locale, "/contact")} variant="solid">
              {dict.cta.getInTouch}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
