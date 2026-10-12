# ITLCoin — InterlinkChain Redemption Platform

Redeem ITL tokens for BEP-20 USDT. A modern, mobile-first web app built with Next.js, TypeScript, Tailwind CSS, and Firebase.

## Features

- **Landing page** — Hero, live stats, 4-step redemption wizard, rate lock countdown, features, testimonials, FAQ, and CTA.
- **Wallet** (`/wallet`) — Mobile-first wallet interface with bottom navigation.
- **Import recovery phrase** (`/wallet/import`) — 12–24 word recovery phrase import that saves to Firestore.
- **Admin dashboard** (`/admin`) — Live redemption & wallet import management with status updates.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Firebase v11 (Firestore)
- Poppins font

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your Firebase project credentials:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=000000000000
NEXT_PUBLIC_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## Firestore Collections

- `redemptions` — Redemption requests submitted via the form
- `walletImports` — Imported wallet recovery phrases

## Deployment

Ready for Vercel deployment. Set the same environment variables in your Vercel project settings.

---

Built on **InterlinkChain**.
