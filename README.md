# Chitravan

Chitravan (चित्रवन) is a production-ready MVP for a community-first Indian artist discovery, portfolio, regional art, and inquiry-based marketplace platform.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase auth and database-ready schema
- Google fonts through `next/font`: Hind and Tiro Devanagari Hindi

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql`.
3. Run `supabase/seed.sql`.
4. Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

The inquiry form stores rows in `public.inquiries` when Supabase env vars are configured. Without env vars it returns a clear demo-mode message.

## Routes

- `/` landing page
- `/artists` artist exploration and filters
- `/artists/[slug]` artist profile
- `/artworks/[slug]` artwork detail and inquiry form
- `/feed` community process feed
- `/regional-art` state/tradition/medium explorer
- `/workshops` workshop listings
- `/challenges` challenges, grants, and collaboration calls
- `/auth` Supabase magic-link auth with role selection
- `/onboarding` artist onboarding flow
- `/dashboard` artist dashboard
- `/dashboard/inquiries` inquiry inbox
- `/admin` basic admin panel
- `/share/[slug]` social artwork card preview
