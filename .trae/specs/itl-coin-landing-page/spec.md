# ITL Coin Redemption Landing Page - Product Requirements Document

## Overview

- **Summary**: A professional, dark-themed landing page for ITL Coin redemption platform, allowing users to exchange ITL tokens for USDT (BEP-20) at a fixed rate of 2 USDT per 1 ITL. The page features a multi-step redemption form, live stats, and process overview.
- **Purpose**: Provide a trustworthy, professional interface for ITL token holders to redeem their tokens for USDT with clear steps, transparent stats, and brand-aligned visual design.
- **Target Users**: ITL token holders seeking to redeem tokens for USDT; crypto-savvy users who value transparency, verified payouts, and fast turnaround.

## Goals

- Build a pixel-faithful reproduction of the provided design image as a production-ready landing page.
- Create a professional, modern dark UI with purple/blue accent gradients and glassmorphism card styling.
- Implement a functional 4-step redemption form wizard (UI only for this build).
- Ensure mobile-first responsive layout with app-like tactile interactions.
- Use Poppins font consistently across all UI elements.

## Non-Goals

- Backend/Firebase write integration for form submissions (Firebase SDK scaffolding only).
- Real blockchain wallet connectivity or actual token transfer processing.
- Admin dashboard, Stats page, or FAQ page content beyond the landing page scope.
- User authentication system.

## Background & Context

- Design reference: User-provided image of the ITL Coin landing page.
- User preferences (from profile): Poppins font, dark theme, glassmorphic cards with backdrop blur, mobile-first with fixed bottom nav pattern (if applicable), press-scale interaction effects, professional error/UX copy only, no misleading financial promises, www subdomain preference.
- Tech stack mandated: Next.js (App Router), Firebase, TypeScript, Tailwind CSS.

## Functional Requirements

- **FR-1**: Header with ITLCoin logo, nav links (How it works, Stats, FAQ), live rate chip (1 ITL = 2 USDT), and prominent "Redeem ITL" CTA button.
- **FR-2**: Hero section with "Redemption Open - Live Now" status badge, headline "Redeem your ITL, get paid fast." with "get paid fast." highlighted in gradient, two CTA buttons (Redeem ITL Coin primary, How it works secondary), and three trust indicators (USDT payout, manually-verified requests, fast turnaround).
- **FR-3**: Stats row with four glassmorphic cards: Payout Rate (2.00 USDT per ITL), Total Redeemed (746.8K ITL), Redeemers Served (18,204), Network (InterlinkChain L1 live).
- **FR-4**: Redemption form section labeled "ITL BUYBACK" with heading "Redeem ITL Coin" and subheading about the 2 USDT per 1 ITL rate. 4-step progress wizard showing step 2 active by default. Form fields (step 2 shown): Full name, Email address, BNB Smart Chain (BEP-20) wallet address, Back/Continue buttons.
- **FR-5**: Sidebar for form section with (a) Payout rate lock card showing 43s countdown with circular progress and "1 ITL = 2 USDT", (b) "Why redeem with us" card listing 4 benefits with icons (Manual verified payouts, Get paid in USDT fast, Transparent fixed rate, Simple 4-step process).
- **FR-6**: Process section labeled "PROCESS" with heading "Three steps to redeem ITL" and three cards (01 Enter an amount, 02 Send your ITL, 03 Get paid) with descriptions.
- **FR-7**: Firebase SDK initialized and available (configuration placeholder / env-var driven), TypeScript types for redemption requests defined.
- **FR-8**: All interactive elements (buttons, links, inputs) have press-scale active states (active:scale-95/98) per user preferences.

## Non-Functional Requirements

- **NFR-1**: Mobile-first responsive: all sections render correctly at 375px width; desktop layout matches the image.
- **NFR-2**: Visual fidelity: color palette (near-black background #000 or #0a0a0f, purple gradient #6d28d9→#8b5cf6→#a78bfa, white text, muted gray secondary text), rounded-xl/2xl card corners, subtle card borders (neutral-800), card backgrounds (neutral-900/60 with backdrop-blur).
- **NFR-3**: Performance: Next.js production build completes without errors; LCP < 2.5s (static content); no hydration errors (mount-first pattern where needed).
- **NFR-4**: SEO & content integrity: No misleading financial promises (no "guaranteed profit", "risk-free"); page title and meta description professionally worded.
- **NFR-5**: Type safety: Full TypeScript strict compliance; no `any` types in core UI or business logic files.
- **NFR-6**: Accessibility: Semantic HTML (nav, section, button, input, label); adequate color contrast (white on dark bg); buttons accessible via keyboard; labels associated with inputs.
- **NFR-7**: Consistency: Poppins font on headers, body, buttons, form labels, card titles, and stats.

## Constraints

- **Technical**: Must use Next.js (latest stable) with App Router, TypeScript (strict mode), Tailwind CSS, and Firebase SDK (v9+ modular). No UI component library (build custom with Tailwind).
- **Business**: Payout rate is fixed at 2 USDT per 1 ITL on the UI. No claims of guaranteed profits. Page must look professional at all touchpoints.
- **Dependencies**: `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `@types/react`, `@types/node`, `firebase`.

## Assumptions

- User intends the landing page at `/` (root route).
- Firebase is for future form-submission persistence; initialization only required.
- The form wizard needs state management for steps (previous/next navigation) but no real submission to Firebase.
- The 43s countdown is a visual demo (animated from 43s→0 looping or static).
- Stats numbers are static for this build (no live fetch).

## Acceptance Criteria

### AC-1: Landing page renders all sections matching the design

- **Type**: `rule`
- **Given**: The Next.js app is running on a dev server
- **When**: User loads `/` route in a desktop browser (1280px+)
- **Then**: All 6 sections (Header, Hero, Stats, Form, Process) are visible in correct vertical order; element counts match: 1 header with logo + 3 nav links + rate chip + 1 CTA; 1 hero with status badge + headline + 2 buttons + 3 trust indicators; 1 stats row with 4 cards; 1 form section with 4-step wizard + 2 sidebar cards; 1 process section with 3 cards
- **Pass Condition**: Dev server (`npm run dev`) renders all sections without console errors; visual snapshot matches the design layout (verifiable by human review of running page)
- **Evidence**: `npm run build` succeeds; screenshots of running page at 1280px and 375px

### AC-2: Mobile-first responsive layout

- **Type**: `rule`
- **Given**: Running on dev server
- **When**: Viewport width is 375px (iPhone SE)
- **Then**: No horizontal scroll; all cards stack vertically; all text readable; buttons full-width where appropriate; form inputs usable
- **Pass Condition**: Chrome DevTools device mode 375px shows no overflow-x, all content within viewport
- **Evidence**: Screenshot at 375px; manual inspection

### AC-3: Poppins font applied site-wide

- **Type**: `rule`
- **Given**: Build is complete
- **When**: Any text element (header H1-H6, body p, button text, form labels, input placeholders, card titles, stat numbers) is inspected in the browser DevTools
- **Then**: `font-family` resolves to `Poppins` (with sans-serif fallback)
- **Pass Condition**: Computed styles show Poppins for all text-bearing selectors
- **Evidence**: Computed style inspection in browser; `next/font/google` usage confirmed in source

### AC-4: Form wizard step navigation works

- **Type**: `rule`
- **Given**: User views the redemption form section at step 2 (default)
- **When**: User clicks "Back" button
- **Then**: Wizard moves to step 1 (step indicator 1 active, 2-4 inactive)
- **When**: User clicks "Continue" button
- **Then**: Wizard moves to step 3; then step 4 on subsequent Continue
- **Pass Condition**: Step progress indicator visually updates; Back/Continue behavior matches step boundaries (Back disabled on step 1; Continue label may change on last step)
- **Evidence**: Click-through demo video or step-by-step screenshots

### AC-5: TypeScript strict mode passes with no errors

- **Type**: `rule`
- **Given**: All source files written
- **When**: `npx tsc --noEmit` runs
- **Then**: Exit code 0; no TypeScript errors reported
- **Pass Condition**: Command output shows no errors
- **Evidence**: Command output capture

### AC-6: Tailwind CSS production build compiles with no errors

- **Type**: `rule`
- **Given**: All source files written
- **When**: `npm run build` runs
- **Then**: Next.js build completes successfully (exit code 0) with all routes generated
- **Pass Condition**: Build output shows "Route (app)" entries for `/` and no errors
- **Evidence**: Build output capture

### AC-7: Firebase SDK initialized and typed request model defined

- **Type**: `rule`
- **Given**: Build complete
- **When**: Reviewing source files
- **Then**: A firebase config module exists that reads env vars and initializes getApp/initializeApp safely; a TypeScript interface `RedemptionRequest` exists with fields: fullName, email, walletAddress, amount, transactionProof, createdAt
- **Pass Condition**: Files exist with correct exports and types
- **Evidence**: Source code review

### AC-8: Visual design quality (fidelity + professionalism)

- **Type**: `rubric`
- **Dimension**: Visual fidelity to design image and professional polish
- **Scale**: 1-5
- **Anchors**: 1 = Barely resembles design, unprofessional colors/layout; 3 = Layout matches but color palette off, no glassmorphism, flat-looking cards; 5 = Exact visual match: dark near-black bg, purple-blue gradients, glassmorphic cards (backdrop-blur + semi-transparent), subtle borders, correct typography hierarchy, status badge pill, circular countdown progress, step indicators with active purple state, overall looks production-grade
- **Pass Threshold**: >= 4
- **Evidence**: Side-by-side visual comparison with reference image; screenshot of running page

### AC-9: Interaction feedback (tactile press effects)

- **Type**: `rubric`
- **Dimension**: Interactive element response quality
- **Scale**: 1-5
- **Anchors**: 1 = No press effects; buttons jumpy or no state; 3 = Buttons have hover states but no press-scale; 5 = All buttons, CTA cards, nav items have press-scale (active:scale-95/98), smooth transitions, consistent hover/press feel across entire page
- **Pass Threshold**: >= 4
- **Evidence**: Manual interaction walkthrough in browser

### AC-10: Code organization and maintainability

- **Type**: `rubric`
- **Dimension**: Cleanliness of project structure and component decomposition
- **Scale**: 1-5
- **Anchors**: 1 = Everything in page.tsx, no components, messy; 3 = Components split but inconsistent naming/types duplicated; 5 = Clean App Router structure (`app/layout.tsx`, `app/page.tsx`), components in `components/` grouped by section (Header, Hero, Stats, RedemptionForm, Process), types in `types/`, firebase init in `lib/`, minimal duplication, clear component boundaries
- **Pass Threshold**: >= 4
- **Evidence**: Source code structure review

## Open Questions

- [ ] What is the exact brand color hex for the purple gradient? Assumed `#6d28d9` → `#8b5cf6` → `#a78bfa` (Tailwind violet-700 → violet-500 → violet-400).
- [ ] Should the form actually submit to Firebase/Firestore in this build, or is UI-only sufficient? Assumed UI-only with types defined.
- [ ] Should the 43s countdown animate down in real-time (looping) or stay static? Assumed animating from 60s down in real-time with 43s as initial displayed value or simple CSS animation.
- [ ] Are additional pages (Stats, FAQ, How it works) needed as empty placeholders or just anchor links on landing page? Assumed anchor links (#how-it-works etc.) on the same landing page.
