# Emma Lab — Next.js site

Marketing + booking site for Emma Lab Global Services Ltd. Next.js 16 App Router, TypeScript, Tailwind CSS v4, Radix UI primitives, react-hook-form + Zod, Zustand.

Migrated from the legacy vanilla site at `../EMMA_LAB_WEBSITE`. See `CLAUDE.md` for architecture and conventions.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000 (frontend + /api routes)
```

OTP, contact, newsletter, payment, and the Paystack webhook all run as Next.js Route Handlers under `app/api/*` — no separate backend process.

## Env vars

Edit `.env.local` and fill in real values for production:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | API base path. Defaults to `/api` (same origin). |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL — used by `metadata.metadataBase` |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack public key (`pk_test_…` / `pk_live_…`). Leave empty in dev — payment step falls back to direct verification |
| `PAYSTACK_SECRET_KEY` | Paystack secret key — used by `/api/verify-payment` and the webhook signature check. Server-only. |
| `OTP_SECRET` | Random string used to HMAC OTP codes before storing. Server-only. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Outgoing mail (OTP + contact/newsletter forwarding). Gmail needs an [App Password](https://support.google.com/accounts/answer/185833). When unset in dev, OTPs are printed to the terminal. |
| `CONTACT_TO` | Where `/api/contact` and `/api/newsletter` submissions are delivered. Defaults to `SMTP_USER`. |

## Build & deploy

```bash
npm run build      # full production build (type-checks)
npm start          # serve the build
```

Vercel: connect the repo, set the env vars above, and it deploys on push.
