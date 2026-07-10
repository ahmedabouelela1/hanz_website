# Working in hanz_website

## This is Next.js 16 — not the Next.js in your training data

Breaking changes that bit us already:

- **`middleware` is renamed to `proxy`.** The locale redirector lives in `src/proxy.ts` and exports `export function proxy(request)`. Do **not** recreate `middleware.ts`.
- **`params` and `searchParams` are Promises.** Always `const { locale } = await params`.
- Read the bundled guides in `node_modules/next/dist/docs/` before touching routing, metadata, or fonts.

## i18n / RTL

- Every route lives under `src/app/[locale]/`. `[locale]/layout.tsx` **is** the root layout (owns `<html lang dir>`). There is intentionally no `src/app/layout.tsx`.
- Locales are declared in `src/i18n/config.ts` (`en`, `ar`). `ar` renders `dir="rtl"` and swaps to an Arabic font.
- Copy lives in `src/i18n/dictionaries/{en,ar}.json`. `ar.json` is partial — `getDictionary` deep-merges it over `en`, so English is always the fallback. **Add every new string to `en.json` first.**
- Use `localePath(locale, "/path")` (from `src/lib/nav.ts`) for internal links, never bare hrefs.

## Content

- Pages read content through `src/lib/content.ts`. Each loader tries the Laravel API (`NEXT_PUBLIC_API_URL`) and falls back to `src/data/seed.ts`, so the site renders with **no backend running**.
- When the Hanz Laravel API is up, set `NEXT_PUBLIC_API_URL` and the same pages switch to live data with zero code changes.

## Design system

- Tailwind v4, tokens as CSS vars in `src/app/globals.css` under `:root` + `@theme inline`.
- "Light industrial minimal": concrete neutrals + a single molten-orange accent (`--accent`). Motifs: `.blueprint-grid`, `.tech-frame`, `.hazard-hatch`, `.kicker`.
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (eyebrows), IBM Plex Sans Arabic (ar).
