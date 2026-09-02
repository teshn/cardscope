# CardScope

CardScope is a Next.js fullstack app for trading-card lookup and authenticity-oriented inspection.

## MVP Features

- Pixel-minimal, cream-first UI with modern motion
- Locale routing for English and German (`/en`, `/de`)
- Mega menu with popular TCG hubs
- Card detail pages with dimensions, weight, print date, variant, illustrator, set, and rarity
- Draggable card tilt canvas for visual reflection checks (placeholder media stage)
- SEO foundation: metadata, OG image endpoint, robots, sitemap, JSON-LD
- Ads foundation: consent-gated ad slots for AdSense
- Donations: timed popup after 2 page views (Buy Me a Coffee, Ko-fi, Ethereum)
- CSV import admin prototype
- Prisma schema for normalized card-printing data model

## Stack

- Next.js 16 (App Router)
- TypeScript + Tailwind CSS v4
- Prisma ORM + PostgreSQL schema
- Supabase client utilities (integration-ready)
- Sonner toasts + Framer Motion

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Generate Prisma client:

```bash
npm run db:generate
```

4. Run development server:

```bash
npm run dev
```

## Useful Scripts

- `npm run dev` - Start local dev server
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run Prisma migrations
- `npm run db:push` - Push schema for prototyping
- `npm run db:seed` - Seed TCG baseline data

## Notes

- Configure `NEXT_PUBLIC_SITE_URL` for correct canonical and OG links.
- Add your AdSense IDs in `.env` for live ad rendering.
- Replace placeholder card media with your generated images/videos in later phases.
- Set `MAINTENANCE_MODE=true` on Vercel to force all non-static routes to render `/maintenance`.
