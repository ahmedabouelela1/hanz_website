import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/layout/PageHeader";
import { QuoteForm } from "@/components/forms/QuoteForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.quote.hero.title, description: dict.quote.hero.lead };
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const steps = [
    { no: "01", label: dict.home.process.steps[0].title },
    { no: "02", label: dict.home.process.steps[1].title },
    { no: "03", label: dict.home.process.steps[2].title },
    { no: "04", label: dict.home.process.steps[3].title },
  ];

  return (
    <>
      <PageHeader
        kicker={dict.quote.hero.kicker}
        title={dict.quote.hero.title}
        lead={dict.quote.hero.lead}
        index={`07 — ${dict.nav.quoteShort}`}
      />

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          {/* side rail: what happens next */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="kicker mb-6">{dict.home.process.kicker}</p>
            <ol className="space-y-5">
              {steps.map((s) => (
                <li key={s.no} className="flex items-center gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center border border-ink/20 font-mono text-[11px] text-steel-500">
                    {s.no}
                  </span>
                  <span className="font-display text-base font-semibold text-ink">
                    {s.label}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-10 border-l-2 border-accent bg-surface p-5">
              <p className="font-display text-lg font-semibold text-ink">48h</p>
              <p className="mt-1 text-sm text-steel-700">
                {dict.home.stats.items[2].label}
              </p>
            </div>
          </aside>

          {/* form */}
          <div className="border border-hairline bg-surface-2 p-7 sm:p-10">
            <QuoteForm dict={dict} />
          </div>
        </div>
      </section>
    </>
  );
}
