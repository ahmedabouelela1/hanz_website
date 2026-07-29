import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath, navRoutes } from "@/lib/nav";
import { siteContact, siteMeta } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";
import { NewsletterForm } from "./NewsletterForm";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-steel-900 py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <p className="kicker mb-6 text-steel-500">{dict.brand.tagline}</p>
            <Logo locale={locale} variant="footer" />
            <p className="mt-6 max-w-md text-steel-400">{dict.footer.tagline}</p>
          </div>

          <div className="lg:pt-2">
            <p className="kicker mb-3 text-steel-500">{dict.footer.newsletter}</p>
            <p className="mb-5 text-sm text-steel-400">
              {dict.footer.newsletterLead}
            </p>
            <NewsletterForm
              placeholder={dict.footer.newsletterPlaceholder}
              cta={dict.footer.subscribe}
            />
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="kicker mb-5 text-steel-500">{dict.footer.explore}</p>
            <ul className="space-y-3">
              {navRoutes.map((route) => (
                <li key={route.key}>
                  <Link
                    href={localePath(locale, route.href)}
                    className="text-steel-300 transition-colors hover:text-paper"
                  >
                    {dict.nav[route.key as keyof typeof dict.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker mb-5 text-steel-500">{dict.footer.contact}</p>
            <ul className="space-y-3 text-steel-300">
              <li>
                <a
                  href={`mailto:${siteContact.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {siteContact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteContact.phoneHref}`}
                  className="transition-colors hover:text-accent"
                >
                  {siteContact.phone}
                </a>
              </li>
              <li className="max-w-[16rem] text-sm text-steel-400">
                {dict.contact.info.addressValue}
              </li>
            </ul>
          </div>

          <div>
            <p className="kicker mb-5 text-steel-500">
              {dict.contact.info.hoursLabel}
            </p>
            <p className="text-steel-300">{dict.contact.info.hoursValue}</p>
            <div className="mt-6 inline-flex items-center gap-2 border border-steel-900 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-400">
                {dict.footer.certified}
              </span>
            </div>
          </div>

          <div>
            <p className="kicker mb-5 text-steel-500">{dict.nav.quote}</p>
            <Link
              href={localePath(locale, "/quote")}
              className="group inline-flex items-center gap-2 text-steel-300 transition-colors hover:text-accent"
            >
              {dict.home.ctaBand.title.split(".")[0]}
              <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-steel-900 py-7 font-mono text-[11px] tracking-[0.1em] text-steel-500 sm:flex-row">
          <span>
            © {year} {siteMeta.name}. {dict.footer.rights}
          </span>
          <span>{dict.footer.builtBy}</span>
        </div>
      </div>
    </footer>
  );
}
