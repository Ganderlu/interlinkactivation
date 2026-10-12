# Wallet / Exchange Page - Product Requirements Document

## Overview
- **Summary**: A mobile-first "wallet" app screen that opens when the user clicks the Exchange action. Reproduces the provided reference image: a light lavender background with a centered phone-style card containing a purple-gradient header, wallet selector, total balance, quick actions (Send/Receive/Stake/Exchange/More), a "Predict BTC move & Win" promo card, a token list, a "Business Token Vaults" Coming Soon card, and a floating bottom navigation bar with a prominent center FAB.
- **Purpose**: Provide an app-like wallet dashboard page that matches the supplied design exactly, with tactile interactions and professional polish.
- **Target Users**: ITL token holders accessing their wallet and exchange features.

## Goals
- Pixel-faithful reproduction of the provided wallet screen image.
- App-like mobile experience: fixed bottom navigation with a large central Exchange FAB; press-scale feedback on every interactive element.
- Light theme (lavender background) distinct from the dark landing page.
- Poppins font throughout.

## Non-Goals
- Real wallet balance data, real token transfers, or blockchain connectivity.
- Functional token swapping / exchange engine (UI only).
- Actual "Predict BTC" game logic.

## Functional Requirements
- **FR-1**: Header bar with left scan/expand icon, center segmented toggle "App | Wallet" (Wallet active white pill), right settings gear icon. Purple gradient background.
- **FR-2**: Wallet selector row: red block/puzzle avatar, "Wallet 1 – Account #1" title, "None" subtitle, right-side copy icon and wallet/dropdown icon.
- **FR-3**: Total Balance card: label "Total Balance" with eye/hide icon, large "0" balance, "0 ITL" + "0.00%" pill, "Back up" button (white pill with clock icon).
- **FR-4**: Quick actions row (5 circular icons): Send (up arrow), Receive (down arrow), Stake (layers), Exchange (swap arrows) with a "NEW" purple badge, More (4-dot grid). Each has a label below.
- **FR-5**: "Predict BTC move & Win" promo card with title, subtitle "Win rewards when your prediction is correct", black "Play now" button, and an upward mini-chart ($81K → $?K) with a coin icon.
- **FR-6**: Tab bar "Token | NFT | History" with Token active (purple underline/bg).
- **FR-7**: Token list card: network-dots dropdown, "Search asset" search bar with filter icon, two rows — InterLink Token (0 ITL, purple diamond), InterLink Genesis Token (0 ITLG, gold hexagon).
- **FR-8**: "Business Token Vaults" card with subtitle "Trading pairs with ITL" and a centered clock icon + "Coming Soon".
- **FR-9**: Floating bottom nav pill: Home, DApp, Exchange (large purple FAB center), Card, Profile. Exchange is highlighted/active.
- **FR-10**: All interactive elements (icons, buttons, nav items, FAB) have press-scale (active:scale-95/98) with smooth transitions.

## Non-Functional Requirements
- **NFR-1**: Mobile-first: fills the screen on ≤420px; on wider viewports, the wallet screen is shown as a centered phone frame (max-w ~420px) on a lavender backdrop.
- **NFR-2**: Color palette: light lavender background (#D8D0F0-ish), purple gradient header (#6d28d9→#8b5cf6→#a78bfa), white cards, dark text (near-black for titles, gray-500 for subtitles), green for positive %, accent purple for active states, gold for ITLG icon.
- **NFR-3**: Poppins font on all text.
- **NFR-4**: TypeScript strict, no `any`, no hydration errors (mount-first where needed).
- **NFR-5**: Production build succeeds.

## Constraints
- **Technical**: Reuse existing Next.js App Router, Tailwind, TypeScript, Poppins setup. No new dependencies.
- **Business**: UI-only (no real balances/transfers).

## Assumptions
- Page route: `/wallet`.
- Exchange quick-action button (with NEW badge) and the center bottom-nav FAB both represent the "activate exchange" entry; the page itself is the wallet screen shown.
- Balances are static (0).

## Acceptance Criteria

### AC-1: All 9 sections render with exact labels
- **Type**: `rule`
- **Given**: Dev server running
- **When**: Load `/wallet`
- **Then**: Header (App/Wallet toggle), Wallet selector, Total Balance, 5 quick actions, Predict BTC card, Tabs, Token list (2 tokens), Business Vaults card, Bottom nav (5 items) all present with exact copy from the image
- **Pass Condition**: Browser DOM snapshot contains all listed text labels
- **Evidence**: Snapshot output

### AC-2: Visual fidelity matches image
- **Type**: `rubric`
- **Dimension**: Pixel fidelity to reference image
- **Scale**: 1-5
- **Anchors**: 1=unrecognizable; 3=layout present but colors/spacing off; 5=exact match (lavender bg, purple gradient header, white cards, circular quick-action icons, FAB bottom nav, mini chart)
- **Pass Threshold**: >= 4
- **Evidence**: Screenshot comparison

### AC-3: Tactile press effects on all interactive elements
- **Type**: `rubric`
- **Dimension**: Interaction feedback quality
- **Scale**: 1-5
- **Anchors**: 1=no effects; 3=hover only; 5=all buttons/icons/FAB have active:scale-95/98 + smooth transitions
- **Pass Threshold**: >= 4
- **Evidence**: Source grep + interaction test

### AC-4: TypeScript + build pass
- **Type**: `rule`
- **Given**: Implementation complete
- **When**: Run `npx tsc --noEmit` and `npm run build`
- **Then**: Both exit 0
- **Pass Condition**: Clean exit codes
- **Evidence**: Terminal output

### AC-5: Responsive (mobile full-screen, desktop phone frame)
- **Type**: `rule`
- **Given**: Page loaded
- **When**: Viewport ≤420px vs ≥1024px
- **Then**: ≤420px fills width; ≥1024px shows centered phone frame (~420px) with lavender backdrop, no horizontal scroll
- **Pass Condition**: No overflow; correct frame behavior at both widths
- **Evidence**: Responsive screenshots

## Open Questions
- [ ] Should the Exchange action also link to a separate "exchange/swap" page, or is this wallet screen the destination? Assumed: this wallet screen is the destination; the Exchange buttons are interactive (visual feedback) but stay on this screen for now.
