export default function LocaleLoading() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12" aria-hidden>
      <div className="h-3 w-24 animate-pulse bg-hairline" />
      <div className="mt-6 h-10 w-2/3 max-w-xl animate-pulse bg-hairline" />
      <div className="mt-4 h-4 w-full max-w-lg animate-pulse bg-hairline" />
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-[4/3] animate-pulse border border-hairline bg-surface-2" />
        ))}
      </div>
    </div>
  );
}
