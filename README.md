# Emma Lab — Next.js site

Marketing + booking site for Emma Lab Global Services Ltd. Next.js 16 App Router, TypeScript, Tailwind CSS v4, Radix UI primitives, react-hook-form + Zod, Zustand.

Migrated from the legacy vanilla site at `../EMMA_LAB_WEBSITE`. See `CLAUDE.md` for architecture and conventions.

## Run locally

```bash
# Install
npm install

# Frontend (this repo)
npm run dev        # http://localhost:3000

# Backend (legacy repo — required for OTP, contact, newsletter, payment)
cd ../EMMA_LAB_WEBSITE/server && npm install && npm run dev
# → http://localhost:4000
```

## Env vars

Edit `.env.local` and fill in real values for production:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Express backend base URL (e.g. `http://localhost:4000/api`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL — used by `metadata.metadataBase` |
| `NEXT_PUBLIC_FLW_PUBLIC_KEY` | Flutterwave public key. Leave empty in dev — payment step falls back to direct verification |

## Build & deploy

```bash
npm run build      # full production build (type-checks)
npm start          # serve the build
```

Vercel: connect the repo, set the env vars above, and it deploys on push.
