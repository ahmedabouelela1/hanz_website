"use client";

import { useEffect } from "react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[50vh] max-w-[1440px] flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        Something went wrong
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        This page could not be loaded
      </h1>
      <p className="mt-4 max-w-md text-steel-700">
        Please try again. If the problem continues, refresh the page or return
        home.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent"
      >
        Try again
      </button>
    </section>
  );
}
