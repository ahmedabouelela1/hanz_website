import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { loadCatalogProducts, loadProductBySlug } from "@/lib/content";
import { localePath } from "@/lib/nav";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const products = await loadCatalogProducts();
  return locales.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const product = await loadProductBySlug(slug);
  if (!product) return { title: "Product" };
  void locale;
  return { title: product.title, description: product.summary };
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const product = await loadProductBySlug(slug);
  if (!product) notFound();

  return (
    <article className="pt-[68px]">
      {/* header */}
      <section className="border-b border-hairline">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
          <Reveal>
            <Link
              href={localePath(locale, "/catalog")}
              className="link-underline font-mono text-[11px] uppercase tracking-[0.16em] text-accent"
            >
              ← {dict.catalog.hero.kicker}
            </Link>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-steel-500">
              {product.categoryLabel}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              {product.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-steel-700">
              {product.description}
            </p>
            <div className="mt-8">
              <ButtonLink href={localePath(locale, "/quote")} variant="solid">
                {dict.catalog.detail.cta}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="relative">
            <div className="tech-frame relative aspect-[4/3] w-full border border-ink/10">
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="image-grade object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* spec + applications */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              {dict.catalog.detail.specsTitle}
            </h2>
            <dl className="mt-6 border-t border-ink">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between border-b border-hairline py-4"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-steel-500">
                    {spec.label}
                  </dt>
                  <dd className="font-display text-base font-semibold text-ink">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              {dict.catalog.detail.applicationsTitle}
            </h2>
            <ul className="mt-6 space-y-3">
              {product.applications.map((app) => (
                <li
                  key={app}
                  className="flex items-center gap-3 border-b border-hairline py-3 text-steel-700"
                >
                  <span className="h-1.5 w-1.5 bg-accent" />
                  {app}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* gallery */}
        {product.gallery.length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3">
            {product.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.06}>
                <div className="relative aspect-[4/3] overflow-hidden border border-hairline">
                  <Image
                    src={src}
                    alt={`${product.title} ${i + 1}`}
                    fill
                    sizes="33vw"
                    className="image-grade object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
