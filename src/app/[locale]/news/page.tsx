import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { loadNews } from "@/lib/content";
import { localePath } from "@/lib/nav";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { NewsArticle } from "@/types/content";
import type { Dictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return { title: dict.news.hero.title, description: dict.news.hero.lead };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const articles = await loadNews(locale);
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHeader
        kicker={dict.news.hero.kicker}
        title={dict.news.hero.title}
        lead={dict.news.hero.lead}
        index="05 — News"
      />

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        {articles.length === 0 ? (
          <p className="py-20 text-center font-mono text-sm text-steel-500">
            {dict.news.empty}
          </p>
        ) : (
          <>
            {lead && <FeaturedArticle locale={locale} dict={dict} article={lead} />}

            {rest.length > 0 && (
              <div className="mt-14 grid grid-cols-1 gap-8 border-t border-hairline pt-14 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((article, i) => (
                  <Reveal key={article.slug} delay={i * 0.06}>
                    <NewsCard locale={locale} dict={dict} article={article} />
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

function FeaturedArticle({
  locale,
  dict,
  article,
}: {
  locale: Locale;
  dict: Dictionary;
  article: NewsArticle;
}) {
  return (
    <Reveal>
      <Link
        href={localePath(locale, `/news/${article.slug}`)}
        className="group grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"
      >
        <div className="tech-frame relative aspect-[16/10] overflow-hidden border border-ink/10">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="image-grade object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-steel-500">
            <span className="text-accent">{article.category}</span>
            <span>{formatDate(article.publishedAt, locale)}</span>
            <span>
              {article.readMinutes} {dict.news.readTime}
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            {article.title}
          </h2>
          <p className="mt-4 max-w-lg text-steel-700">{article.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-accent">
            {dict.cta.readMore}
            <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180">
              →
            </span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function NewsCard({
  locale,
  dict,
  article,
}: {
  locale: Locale;
  dict: Dictionary;
  article: NewsArticle;
}) {
  return (
    <Link
      href={localePath(locale, `/news/${article.slug}`)}
      className="group flex h-full flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden border border-hairline">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="image-grade object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500">
        <span className="text-accent">{article.category}</span>
        <span>{formatDate(article.publishedAt, locale)}</span>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
        {article.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-steel-700">
        {article.excerpt}
      </p>
      <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">
        {article.readMinutes} {dict.news.readTime}
      </span>
    </Link>
  );
}
