# Hanz Industry — Website

Public marketing/portfolio site for **Hanz Industry** (precision manufacturing).
Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · framer-motion · Zod.

Design direction: **light industrial minimal** — concrete neutrals, a single
molten-orange signal accent, blueprint-grid and technical-frame motifs.

## Getting started

```bash
npm install
cp .env.example .env.local     # set NEXT_PUBLIC_API_URL + NEXT_PUBLIC_SITE_URL
npm run dev                    # http://localhost:3000 → redirects to /en
npm run build && npm start     # production
```

The site renders fully **without a backend** using `src/data/seed.ts`. When the
Hanz Laravel API is reachable at `NEXT_PUBLIC_API_URL`, the content loaders in
`src/lib/content.ts` switch to live data automatically.

## Structure

```
src/
  app/[locale]/            # all routes (locale is the root segment)
    layout.tsx             # root layout: <html lang dir>, fonts, Header/Footer
    page.tsx               # Home
    about/ catalog/ partners/ news/ contact/ quote/
    catalog/[slug]/  news/[slug]/
  app/sitemap.ts  app/robots.ts
  proxy.ts                 # Next 16 locale redirect (was "middleware")
  i18n/                    # config + dictionaries (en full, ar partial → merged)
  lib/                     # utils, site constants, api client, content loaders, actions
  data/seed.ts             # local fallback content
  types/content.ts         # shapes mirroring the Laravel API resources
  components/
    brand/ layout/ home/ catalog/ forms/ ui/ seo/
```

## Pages (per BRD)

Home · About/History · Catalog (+ product detail) · Partners · News (+ article) ·
Contact · Request a Quote. Bilingual **EN + AR** (English complete, Arabic
scaffolded and RTL-ready). SEO: per-page metadata, sitemap, robots, Organization
JSON-LD.

## API contract (consumed from the Laravel backend)

```
GET  /api/catalog/categories
GET  /api/catalog/products
GET  /api/partners
GET  /api/news
POST /api/inquiries          # contact + quote submissions
```

All responses use the house shape `{ success, message, data }`.

Built by **Clybrid**.
