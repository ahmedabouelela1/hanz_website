import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { loadNews, loadNewsBySlug } from "@/lib/content";
import { localePath } from "@/lib/nav";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/home/CtaBand";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const articles = await loadNews();
  return locales.flatMap((locale) =>
    articles.map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await loadNewsBySlug(slug);
  if (!article) return { title: "News" };
  return { title: article.title, description: article.excerpt };
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const article = await loadNewsBySlug(slug);
  if (!article) notFound();

  return (
    <article className="pt-[68px]">
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <Reveal>
          <Link
            href={localePath(locale, "/news")}
            className="link-underline font-mono text-[11px] uppercase tracking-[0.16em] text-accent"
          >
            ← {dict.news.backToNews}
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-steel-500">
            <span className="text-accent">{article.category}</span>
            <span>{formatDate(article.publishedAt, locale)}</span>
            <span>
              {article.readMinutes} {dict.news.readTime}
            </span>
            <span>· {article.author}</span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {article.title}
          </h1>
        </Reveal>
      </section>

      <Reveal>
        <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden border-y border-hairline sm:border">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 64rem"
            className="image-grade object-cover"
          />
        </div>
      </Reveal>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="space-y-6 text-lg leading-relaxed text-steel-700">
          {article.body.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </article>
  );
}
