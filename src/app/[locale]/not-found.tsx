import Link from "next/link";
import { BlueprintBackground } from "@/components/brand/BlueprintBackground";

// Note: not-found rendered inside the [locale] layout defaults to English copy,
// since notFound() throws before params resolve here.
export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-[68px]">
      <BlueprintBackground />
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          Error · 404
        </p>
        <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-ink sm:text-7xl">
          Off the blueprint.
        </h1>
        <p className="mt-5 max-w-md text-lg text-steel-700">
          This page doesn&apos;t exist — or it&apos;s been retooled. Let&apos;s get
          you back on the line.
        </p>
        <Link
          href="/en"
          className="mt-8 inline-flex items-center gap-2 bg-paper px-7 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-accent"
        >
          Back to home <span>→</span>
        </Link>
      </div>
    </section>
  );
}
