# ITL Coin Redemption Landing Page - Implementation Plan

## Task 1: Initialize Next.js + TypeScript + Tailwind + Firebase project scaffolding
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Scaffold a Next.js App Router project with TypeScript (strict) in `c:\Users\User\Desktop\interlinks`
  - Install dependencies: `next`, `react`, `react-dom`, `typescript`, `@types/react`, `@types/node`, `tailwindcss`, `postcss`, `autoprefixer`, `firebase`
  - Configure `tailwind.config.ts` with Poppins via `next/font/google`, dark theme (class strategy), custom colors for violet/purple gradient palette
  - Configure `tsconfig.json` strict mode, paths if needed
  - Create `.env.local` template with Firebase placeholders (NEXT_PUBLIC_FIREBASE_*)
  - Create `app/layout.tsx` with Poppins font import, dark theme, HTML lang=en, metadata (title, description) — no misleading financial promises
  - Create empty `app/page.tsx`
- **Acceptance Criteria Addressed**: AC-5, AC-6, AC-10
- **Test Requirements**:
  - `rule` TR-1.1: `npx tsc --noEmit` returns exit code 0 with no files using `any` outside comments. Evidence: terminal output.
  - `rule` TR-1.2: `npm run build` succeeds and generates `Route (app) /`. Evidence: build output.
  - `rubric` TR-1.3: Project structure clarity; scale 1-5; anchors 1=chaotic, 3=usable but messy configs, 5=clean separation of app/, lib/, types/, components/ with good naming. Threshold >=4. Evidence: file listing.

## Task 2: Create Firebase initialization module and core TypeScript types
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Create `lib/firebase.ts`: safe getApp/initializeApp pattern reading from `process.env.NEXT_PUBLIC_FIREBASE_*`; export `app`, optional Firestore helper placeholders
  - Create `types/index.ts`: `RedemptionRequest` interface (fullName: string, email: string, walletAddress: string, itlAmount?: string, step?: number, createdAt?: Date/Timestamp, transactionProofUrl?: string); `RedemptionStep` type union 'details'|'amount'|'send'|'confirm' or numeric 1-4
- **Acceptance Criteria Addressed**: AC-7, AC-5
- **Test Requirements**:
  - `rule` TR-2.1: Source file `lib/firebase.ts` exists and exports initialized `app`; uses safe init pattern (if already initialized reuse). Evidence: code review.
  - `rule` TR-2.2: `types/index.ts` exports `RedemptionRequest` interface with all listed fields and `RedemptionStep` type. Evidence: code review.
  - `rule` TR-2.3: `npx tsc --noEmit` still passes after changes. Evidence: terminal output.

## Task 3: Build Header component
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Create `components/Header.tsx`
  - Left: ITLCoin logo (purple coin icon + text, styled with gradient text)
  - Middle: Nav links — "How it works", "Stats", "FAQ" (anchor hrefs like `#how-it-works`)
  - Right: Rate chip pill (green dot + "1 ITL = 2 USDT") + "Redeem ITL" CTA button (purple gradient, rounded-full, white text, active:scale-95)
  - Glassmorphic subtle header background (bg-neutral-950/80 backdrop-blur), border-b border-neutral-800
  - Mobile: nav links hidden; logo + rate chip + CTA visible
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-9
- **Test Requirements**:
  - `rule` TR-3.1: Component renders all 3 nav links + rate chip + Redeem button on desktop 1280px; logo present. Evidence: browser DOM inspection.
  - `rule` TR-3.2: Computed font-family is Poppins for all Header text. Evidence: browser computed styles.
  - `rule` TR-3.3: Redeem button and nav links have press-scale effect (active:scale-95 or 98 visible in CSS). Evidence: source code grep for active:scale.
  - `rubric` TR-3.4: Professional visual quality; scale 1-5. Threshold >=4. Evidence: screenshot.

## Task 4: Build Hero section component
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Create `components/Hero.tsx`
  - Status pill: green dot + "Redemption Open · Live Now" with purple border/gradient glow
  - Headline H1: "Redeem your ITL," (white) + "get paid fast." (purple-to-violet gradient text), text-5xl md:text-7xl font-bold
  - Two CTA buttons: "Redeem ITL Coin →" (primary purple gradient) and "How it works" (secondary neutral-800 bg, border)
  - Three trust indicators row: "USDT (BEP-20) payout", "Manually-verified requests", "Fast turnaround" — each with small icon (lock/check/lightning Unicode or SVG), muted text, pill-style
  - Subtle radial gradient glow in background (violet)
- **Acceptance Criteria Addressed**: AC-1, AC-3, AC-8, AC-9
- **Test Requirements**:
  - `rule` TR-4.1: Hero contains status badge, H1 headline, 2 buttons, 3 trust indicators. Evidence: DOM inspection.
  - `rule` TR-4.2: "get paid fast." portion of headline has gradient color via Tailwind bg-clip-text. Evidence: source + DOM.
  - `rule` TR-4.3: Both CTA buttons have active:scale-95/98 press effect. Evidence: source code grep.
  - `rubric` TR-4.4: Visual polish matching reference; scale 1-5. Threshold >=4. Evidence: screenshot comparison.

## Task 5: Build Stats row component (4 cards)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Create `components/StatsRow.tsx`
  - 4 glassmorphic cards in a responsive grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4, gap-4)
  - Card 1: Payout Rate — "2.00" (large bold) + "USDT" + "per ITL" (muted subtext)
  - Card 2: Total Redeemed — "746.8K" + "ITL" + "this redemption round"
  - Card 3: Redeemers Served — "18,204" + "verified requests"
  - Card 4: Network — "InterlinkChain" (bold accent) + "L1 · live"
  - Cards: bg-neutral-900/60, backdrop-blur-md, border border-neutral-800, rounded-2xl, p-6, hover:border-violet-700/50 transition
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-8, AC-10
- **Test Requirements**:
  - `rule` TR-5.1: All 4 stat cards render with exact labels/numbers. Evidence: DOM text content.
  - `rule` TR-5.2: At 375px cards stack in 1 column with no overflow; at 1024px+ 4 columns. Evidence: responsive screenshots.
  - `rubric` TR-5.3: Glassmorphism quality; scale 1-5. Threshold >=4. Evidence: visual comparison.

## Task 6: Build Redemption Form section (4-step wizard + sidebar)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1, Task 2
- **Description**:
  - Create `components/RedemptionSection.tsx` (container)
    - Section eyebrow: "ITL BUYBACK" centered uppercase tracking-widest violet text
    - Heading H2: "Redeem ITL Coin" + subheading "Get 2 USDT for every 1 ITL you redeem. Complete the steps below to submit your payout request."
    - Responsive layout: lg:grid lg:grid-cols-[1.6fr_1fr] gap-6
  - Create `components/RedemptionForm.tsx` (main card)
    - Glassmorphic card with 4-step progress indicator (step 1, 2, 3, 4 connected by line; step 2 active by default with violet circle, others dimmed)
    - State managed via `useState<number>` for currentStep (1..4)
    - Step 2 content visible by default: Form fields with labels + placeholders
      - Full name: label + input (placeholder "Jane Doe", helper text "Your First and Last name")
      - Email address: label + input (type email, placeholder "you@example.com", helper text "We'll only use this to contact you about your redemption request")
      - BNB Smart Chain (BEP-20) wallet address: label + input (placeholder "0x…", helper text "Make sure this wallet supports BEP-20 USDT")
    - Bottom buttons: "Back" (secondary, disabled on step 1) and "Continue" (primary purple gradient, onClick increments step; active:scale-95)
    - Form inputs: bg-neutral-900, border-neutral-700, rounded-xl, focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30, Poppins font
  - Create `components/RateLockCard.tsx` (sidebar top)
    - Title "Payout rate lock" with description
    - Circular countdown SVG (ring with 43s: violet stroke progress showing ~28% remaining of 60s or matching 43/60); center shows "43" big
    - Below ring: "1 ITL = 2 USDT" violet text
    - Optional: real 1-second setInterval countdown from 60→0 looping, starting display at 43
  - Create `components/WhyRedeemCard.tsx` (sidebar bottom)
    - Title "Why redeem with us"
    - 4 benefit rows with icons (check-circle / lightning / lock / list):
      - Manual, human-verified payouts
      - Get paid in USDT, fast
      - Transparent, fixed payout rate
      - Simple 4-step process
- **Acceptance Criteria Addressed**: AC-1, AC-4, AC-5, AC-8, AC-9, AC-2
- **Test Requirements**:
  - `rule` TR-6.1: 4-step indicator visible; step 2 circle has violet/active style, steps 1 dimmed-completed? 3/4 dimmed. Evidence: DOM classes.
  - `rule` TR-6.2: Step navigation: click Back → step 1; click Continue → step 3; click Continue step 3 → step 4. Active indicator updates. Evidence: click-through log.
  - `rule` TR-6.3: Back button disabled (or visually disabled) on step 1. Evidence: source code.
  - `rule` TR-6.4: Rate lock card shows "43" number with circular SVG progress ring. Evidence: DOM.
  - `rule` TR-6.5: Why redeem card lists exactly 4 benefits. Evidence: DOM.
  - `rubric` TR-6.6: Visual fidelity matching design; scale 1-5. Threshold >=4. Evidence: screenshot.

## Task 7: Build Process section (3 steps)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - Create `components/ProcessSection.tsx`
  - Section eyebrow: "PROCESS" centered uppercase tracking-widest violet text
  - Heading H2: "Three steps to redeem ITL"
  - 3 glassmorphic cards in responsive grid (grid-cols-1 md:grid-cols-3 gap-4)
  - Card 01: "Enter an amount" — desc "Enter the amount of ITL you want to redeem and see your USDT payout calculated instantly."
  - Card 02: "Send your ITL" — desc "Transfer your ITL to our redemption address and upload a screenshot as proof of the transaction."
  - Card 03: "Get paid" — desc "Our team manually verifies your transfer and settles your payout to your bank account or wallet."
  - Each card: number label "01"/"02"/"03" violet text top-left, title bold, description muted
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-8
- **Test Requirements**:
  - `rule` TR-7.1: 3 process cards with exact titles and descriptions present. Evidence: DOM text.
  - `rule` TR-7.2: Responsive: 1 col <768px, 3 col >=768px. Evidence: responsive screenshots.
  - `rubric` TR-7.3: Professional polish; scale 1-5. Threshold >=4. Evidence: screenshot.

## Task 8: Compose landing page in app/page.tsx and wire everything
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3, 4, 5, 6, 7
- **Description**:
  - Update `app/page.tsx` to import all components and render them in order within a `<main className="min-h-screen bg-neutral-950 text-white">` container (or #000)
  - Wrap sections with consistent horizontal padding (px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto)
  - Add subtle background: global radial violet glow via a pseudo-element or fixed gradient layer
  - Ensure all anchor links (#how-it-works, #stats, #faq, #process) reference the correct sections via `id=` attributes
  - Add a simple footer (optional, match design minimal black style with copyright ITLCoin)
  - Test all components together for visual cohesion
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-6, AC-8
- **Test Requirements**:
  - `rule` TR-8.1: `npm run build` succeeds with all sections rendered. Evidence: build output.
  - `rule` TR-8.2: All 6 sections present in DOM. Evidence: DOM listing.
  - `rubric` TR-8.3: Overall page cohesion and professional look; scale 1-5. Threshold >=4. Evidence: full-page screenshot.

## Task 9: Final build verification + diagnostic checks
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 8
- **Description**:
  - Run `npx tsc --noEmit` — fix any type errors
  - Run `npm run lint` if present or configure ESLint basic
  - Run `npm run build` — verify success
  - Run `GetDiagnostics` to catch any IDE type/lint issues
  - Start dev server (`npm run dev`) and visually verify layout
  - Verify no misleading financial copy exists
- **Acceptance Criteria Addressed**: AC-5, AC-6, NFR-4
- **Test Requirements**:
  - `rule` TR-9.1: `npx tsc --noEmit` exits 0. Evidence: terminal output.
  - `rule` TR-9.2: `npm run build` exits 0. Evidence: terminal output.
  - `rule` TR-9.3: Grep for banned phrases "guaranteed profit|risk-free|guaranteed returns" returns 0 matches across app, components, lib, types, metadata. Evidence: grep output.
  - `rule` TR-9.4: GetDiagnostics reports 0 TypeScript / lint errors. Evidence: tool output.
  - `rubric` TR-9.5: Confidence in overall readiness; scale 1-5. Threshold >=4. Evidence: review note.
