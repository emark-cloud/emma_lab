# Emma Lab — Next.js codebase guide

## Project overview

Marketing + booking site for **Emma Lab Global Services Ltd.** (Nigerian diagnostic services). Migrated from the legacy vanilla HTML/CSS/JS site at `../EMMA_LAB_WEBSITE` to **Next.js 16 App Router + TypeScript + Tailwind CSS v4**.

Three routes:
- `/` — landing (hero, about, services tabs, bundles preview, why-choose, careers, contact, map, appointment CTA)
- `/about` — story, identity, impact numbers, accreditations, director message
- `/plans` — 12 wellness bundles with filter/sort/search, cart drawer, 5-step checkout (review → details → OTP → payment → success)

Everything (frontend, API, Paystack integration, transactional email) now runs in this one Next.js process — Route Handlers live under `app/api/*`. The legacy Express server at `../EMMA_LAB_WEBSITE/server/` is no longer used.

## Stack

- **Next.js 16** App Router, React 19, TypeScript
- **Tailwind CSS v4** (CSS-first config — tokens live in `@theme` blocks in `app/globals.css`, not `tailwind.config.ts`)
- **Radix UI primitives**: `Dialog` (modals, cart drawer, checkout), `Tabs` (services), `Accordion` (why-choose), `RadioGroup` (payment methods)
- **react-hook-form + Zod** for the multi-step checkout and contact form
- **Zustand** with `persist` for the cart (key: `emmalab_cart` — same as the legacy site so cross-cutover carts survive)
- **next/font** for Poppins, Playfair Display, DM Sans
- **next/image** with `remotePatterns` for `images.unsplash.com`
- **FontAwesome 6** via CDN (loaded in `app/layout.tsx`)

## File structure

```
emma-lab-next/
├── app/
│   ├── layout.tsx              # Fonts, metadata, TopBar+Navbar+Footer
│   ├── globals.css             # Tailwind import + @theme tokens + reveal CSS
│   ├── page.tsx                # Landing — composes 11 section components
│   ├── about/page.tsx          # About — 6 sections
│   ├── plans/
│   │   ├── page.tsx            # Plans + cart drawer + checkout modal
│   │   └── loading.tsx
│   ├── api/                    # Route Handlers (one folder per endpoint)
│   │   ├── send-otp/route.ts
│   │   ├── verify-otp/route.ts
│   │   ├── initiate-payment/route.ts
│   │   ├── verify-payment/route.ts
│   │   ├── webhook/route.ts    # Paystack webhook (HMAC-SHA512 of raw body)
│   │   ├── contact/route.ts
│   │   ├── newsletter/route.ts
│   │   └── health/route.ts
│   └── not-found.tsx
├── components/
│   ├── ui/                     # Button, Modal, SectionHeader, SocialIcons, RevealOnScroll
│   ├── layout/                 # TopBar, Navbar, Footer, NewsletterForm
│   ├── landing/                # Hero, About, Services, Bundles, Why, Careers, Contact, Map, Appointment, Booking, CtaBanner
│   ├── about/                  # AboutHero, PageIndexSidebar, Identity, Numbers, Accreditations, Director, AboutPageCta
│   └── plans/                  # PlansHeader, PlansBrowser, PlanCard, CartDrawer, CheckoutModal
├── lib/
│   ├── api.ts                  # Typed fetch wrapper around the /api routes
│   ├── format.ts               # formatPrice, clsx re-export
│   ├── schemas.ts              # Zod schemas (contact, customer, OTP, newsletter)
│   ├── bundles.ts              # 12-bundle catalog + category metadata
│   ├── landing-data.ts         # Services, featured bundles, why-items, perks, hero slides
│   ├── cart-store.ts           # Zustand cart + UI store + useHasHydrated
│   ├── hooks/                  # useScrollReveal, useCountUp, useOtpTimer
│   └── server/                 # Server-only helpers — never imported from client
│       ├── stores.ts           # In-memory OTP + order Maps (cached on globalThis)
│       ├── otp.ts              # generateOtp, hashOtp (HMAC-SHA256)
│       ├── rate-limit.ts       # Tiny per-IP sliding-window limiter
│       └── mailer.ts           # nodemailer transporter + OTP/contact/newsletter senders
├── public/
│   ├── images/                 # Migrated from legacy /Images/
│   └── elements/               # Migrated from legacy /Elements/
└── .env.local                  # NEXT_PUBLIC_* + server-only secrets (PAYSTACK_SECRET_KEY, SMTP_*, OTP_SECRET)
```

## Conventions

### Tailwind v4 (CSS-first config)

There is **no `tailwind.config.ts`**. Tokens are declared in `app/globals.css` inside `@theme { ... }`. Add a new color, radius, or shadow there — never inline `tailwind.config.ts`. Custom utilities go through `@utility`.

Token names map directly to class prefixes:
- `--color-navy` → `bg-navy`, `text-navy`, `border-navy`
- `--radius-md` → `rounded-md`
- `--shadow-lg` → `shadow-lg`
- `--font-display` → `font-display`

### Server vs client components

App Router default is **Server Component**. Files only carry `"use client"` when they need state, effects, or browser-only APIs. Patterns used in this codebase:
- Static section markup → server component (no directive)
- Anything with `useState` / `useEffect` / Radix Dialog / form library → `"use client"`
- For lists rendered server-side that need client-side filter/sort, wrap in a single `"use client"` container (see `PlansBrowser`)

### Shared state

- **Cart**: `useCart` in `lib/cart-store.ts` (Zustand + persist on `emmalab_cart`)
- **UI open/close**: `useCartUi` in the same file — cart drawer and checkout modal share this so the navbar cart button can open the drawer from any page
- **Hydration**: any client UI that reads persisted store state must gate dynamic output via `useHasHydrated()` to avoid SSR/CSR mismatches (see `Navbar`, `PlanCard`)

### Forms

- **Multi-step / complex** → `react-hook-form` + Zod resolver. Schemas live in `lib/schemas.ts`
- **Simple newsletter / one-field** → plain `useState`

### Reveal on scroll

Drop `data-reveal` (or `data-reveal="left|right|up"`) on any element. Mount `<RevealOnScroll />` once per page. The hook adds `.is-visible`; the transition lives in `globals.css`.

### Backend interface

All API calls go through `lib/api.ts` — never `fetch` directly from components. Functions return `{ ok: true, data }` or `{ ok: false, message }` so callers handle errors uniformly.

## Local dev

```bash
cd emma-lab-next && npm run dev     # → http://localhost:3000 (frontend + /api routes)
```

The plans page Paystack step has a **dev fallback**: when `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` is empty (or the inline script hasn't loaded), `PaymentStep` skips the popup and calls `verifyPayment` with `dev: true` so the success flow is reachable without a real key. The verify route mirrors this with a matching dev short-circuit gated on `NODE_ENV !== 'production'`.

When SMTP isn't configured, `send-otp` prints the generated code to the dev terminal so the OTP step stays testable. For real Paystack webhooks during dev, expose port 3000 with ngrok and point Paystack at `https://<ngrok-id>.ngrok-free.app/api/webhook`.

## Deployment notes

- Hosting target: **Vercel** (single deployment — API routes ship with the app).
- Set all server-only env vars in the Vercel project: `PAYSTACK_SECRET_KEY`, `SMTP_*`, `OTP_SECRET`, `CONTACT_TO`. Set `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` (`pk_live_…`).
- `NEXT_PUBLIC_API_URL` defaults to `/api` (same origin) — leave it unless you split the API onto a separate host.
- In Paystack dashboard → Settings → API Keys & Webhooks, set the webhook URL to `https://<your-domain>/api/webhook`. Paystack signs the body with the secret key (HMAC-SHA512), so no separate webhook secret to manage.

## Known gaps / future work

- **Persistence**: OTP + order Maps are in-process (`lib/server/stores.ts`) and reset when the server restarts. Swap for Redis (OTPs, with TTL) + Postgres (orders) before going multi-instance.
- **Rate limiting**: `lib/server/rate-limit.ts` is in-process too — also Redis-bound when scaling out.
- **Cart UX**: the Add-to-Basket button toggles between Add and Remove. A "quantity" model isn't needed — bundles are unique.
- **Test data**: bundle test lists in `lib/bundles.ts` are representative rather than exhaustive copies of the legacy markup; refine as content owners confirm.
- **Accessibility**: forms have labels + Zod error messages; Radix primitives handle focus trap + ARIA. Run axe / Lighthouse before launch.
- **SEO**: per-page `metadata` is set (title, description). Add real OG image + canonical URLs once the production domain is known.
