import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteContact } from "@/lib/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.contact.hero.title, description: dict.contact.hero.lead };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const c = dict.contact;

  const infoRows = [
    { label: c.info.addressLabel, value: c.info.addressValue },
    {
      label: c.info.phoneLabel,
      value: siteContact.phone,
      href: `tel:${siteContact.phoneHref}`,
    },
    {
      label: c.info.emailLabel,
      value: siteContact.email,
      href: `mailto:${siteContact.email}`,
    },
    { label: c.info.hoursLabel, value: c.info.hoursValue },
  ];

  return (
    <>
      <PageHeader
        kicker={c.hero.kicker}
        title={c.hero.title}
        lead={c.hero.lead}
        index={`06 — ${dict.nav.contact}`}
      />

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* info column */}
          <div>
            <dl className="border-t border-ink">
              {infoRows.map((row) => (
                <div key={row.label} className="border-b border-hairline py-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">
                    {row.label}
                  </dt>
                  <dd className="mt-2 text-ink">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="link-underline transition-colors hover:text-accent"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex items-center gap-2 border border-hairline px-4 py-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">
                {dict.contact.badge}
              </span>
            </div>
          </div>

          {/* form column */}
          <div className="border border-hairline bg-surface-2 p-7 sm:p-10">
            <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-ink">
              {c.form.title}
            </h2>
            <ContactForm dict={dict} />
          </div>
        </div>
      </section>
    </>
  );
}
