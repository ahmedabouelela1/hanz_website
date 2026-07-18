import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { factoryPhotos } from "@/lib/factory";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { FacilityGallery } from "@/components/about/FacilityGallery";
import { CtaBand } from "@/components/home/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.about.hero.title, description: dict.about.hero.lead };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const a = dict.about;

  return (
    <>
      <PageHeader
        kicker={a.hero.kicker}
        title={a.hero.title}
        lead={a.hero.lead}
        index="02 — About"
      />

      {/* Philosophy + image */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="tech-frame relative aspect-[4/3] w-full border border-ink/10">
              <Image
                src={factoryPhotos.stamping.src}
                alt={factoryPhotos.stamping.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="image-grade object-cover"
              />
            </div>
          </Reveal>
          <div className="flex flex-col justify-center">
            <Kicker className="mb-5">{a.philosophy.kicker}</Kicker>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              {a.philosophy.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-steel-700">
              {a.philosophy.body}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {a.values.items.map((v) => (
                <div key={v.no} className="bg-paper p-6">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                    {v.no}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-700">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FacilityGallery dict={dict} />

      {/* History timeline */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading kicker={a.history.kicker} title={a.history.title} />
        <ol className="mt-14 grid grid-cols-1 gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-4">
          {a.history.milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.07}>
              <li className="relative h-full bg-paper p-7">
                <span className="font-display text-4xl font-bold text-ink">
                  {m.year}
                </span>
                <span className="mt-4 block h-px w-10 bg-accent" />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-700">
                  {m.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Leadership */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading kicker={a.leadership.kicker} title={a.leadership.title} />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {a.leadership.members.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.07}>
              <article className="group border border-hairline bg-surface-2 p-7 transition-colors hover:border-ink">
                <div className="flex h-16 w-16 items-center justify-center bg-ink font-display text-xl font-bold text-paper transition-colors group-hover:bg-accent">
                  {m.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                  {m.name}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {m.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-steel-700">
                  {m.bio}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
