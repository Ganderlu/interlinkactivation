# Wallet / Exchange Page - Implementation Plan

## Task 1: Create wallet page route + phone frame wrapper
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Create `app/wallet/page.tsx` with a lavender background (`bg-[#D8D0F0]`) and a centered phone-frame container (`max-w-[420px]`) that is full-bleed on mobile and framed/card on desktop.
  - Import all wallet components.
  - Reuse Poppins (already bound globally).
- **Acceptance Criteria Addressed**: AC-1, AC-5
- **Test Requirements**:
  - `rule` TR-1.1: `/wallet` route renders with lavender background and a centered wallet frame. Evidence: screenshot.

## Task 2: Build WalletHeader (purple gradient top bar)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - `components/wallet/WalletHeader.tsx`
  - Left: scan/expand icon (square corners)
  - Center: segmented toggle "App" | "Wallet", Wallet active (white pill)
  - Right: settings gear icon
  - Purple gradient bg, white icons, rounded top corners of phone
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3
- **Test Requirements**:
  - `rule` TR-2.1: Header contains "App" and "Wallet" toggle; Wallet is active. Evidence: DOM.

## Task 3: Build WalletSelector + TotalBalance
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - `components/wallet/WalletSelector.tsx`: red blocky avatar, "Wallet 1 – Account #1", "None", copy + wallet icons
  - `components/wallet/TotalBalance.tsx`: "Total Balance" + eye icon, big "0", "0 ITL", "0.00%" pill, "Back up" button
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `rule` TR-3.1: "Wallet 1 – Account #1", "None", "Total Balance", "0", "0 ITL", "0.00%", "Back up" present. Evidence: DOM.

## Task 4: Build QuickActions row (5 actions)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - `components/wallet/QuickActions.tsx`
  - Send, Receive, Stake, Exchange (NEW badge), More — circular light-purple icon buttons with labels; press-scale active states
- **Acceptance Criteria Addressed**: AC-1, AC-3
- **Test Requirements**:
  - `rule` TR-4.1: All 5 action labels present; Exchange has "NEW" badge. Evidence: DOM.
  - `rule` TR-4.2: Each action button has active:scale-95. Evidence: source grep.

## Task 5: Build PredictBTCCard (promo with mini chart)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - `components/wallet/PredictBTCCard.tsx`
  - Light purple gradient card: title, subtitle, black "Play now" button, SVG mini-line chart rising $81K → $?K with a coin icon
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `rule` TR-5.1: "Predict BTC move & Win", "Play now", "$81K" present. Evidence: DOM.

## Task 6: Build TokenList (tabs + search + 2 tokens)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - `components/wallet/TokenList.tsx`
  - Tabs Token/NFT/History (Token active purple)
  - Network dots dropdown + "Search asset" + filter icon
  - Rows: InterLink Token (purple diamond, 0 ITL), InterLink Genesis Token (gold hexagon, 0 ITLG)
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `rule` TR-6.1: "InterLink Token", "0 ITL", "InterLink Genesis Token", "0 ITLG" present; Token tab active. Evidence: DOM.

## Task 7: Build BusinessVaults card + BottomNav
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - `components/wallet/BusinessVaults.tsx`: title, "Trading pairs with ITL", clock icon + "Coming Soon"
  - `components/wallet/BottomNav.tsx`: floating white pill with Home, DApp, Exchange (large purple FAB center, active), Card, Profile
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3
- **Test Requirements**:
  - `rule` TR-7.1: "Business Token Vaults", "Coming Soon", bottom nav labels present; Exchange FAB is prominent center. Evidence: DOM + screenshot.

## Task 8: Wire page, run typecheck + build, visual verify
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1-7
- **Description**:
  - Compose all components in `app/wallet/page.tsx`
  - Run `npx tsc --noEmit` and `npm run build`
  - Start dev server, screenshot, compare to reference
- **Acceptance Criteria Addressed**: AC-4, AC-5, AC-2
- **Test Requirements**:
  - `rule` TR-8.1: `tsc` exit 0. Evidence: terminal.
  - `rule` TR-8.2: `npm run build` exit 0. Evidence: terminal.
  - `rule` TR-8.3: Screenshot matches reference layout. Evidence: screenshot.
