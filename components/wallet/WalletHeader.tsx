"use client";

import LanguageSelector from "@/components/LanguageSelector";

export type WalletTab = "app" | "wallet";

export default function WalletHeader({
  activeTab = "app",
  onTabChange,
}: {
  activeTab?: WalletTab;
  onTabChange?: (tab: WalletTab) => void;
}) {
  const tabBase =
    "rounded-full px-4 py-1.5 text-sm transition-all active:scale-95";
  const tabActive = "bg-white font-semibold text-brand-700 shadow";
  const tabIdle = "font-medium text-white/80";

  return (
    <header className="relative bg-cta-gradient px-5 pt-5 pb-6 rounded-t-[2rem]">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Scan"
          className="text-white/90 active:scale-90 transition-transform"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-1 rounded-full bg-white/15 p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => onTabChange?.("app")}
            className={`${tabBase} ${activeTab === "app" ? tabActive : tabIdle}`}
          >
            App
          </button>
          <button
            type="button"
            onClick={() => onTabChange?.("wallet")}
            className={`${tabBase} ${activeTab === "wallet" ? tabActive : tabIdle}`}
          >
            Wallet
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="[&_button]:!bg-white/15 [&_button]:!border-white/20 [&_button]:!text-white [&_button:hover]:!border-white/40">
            <LanguageSelector compact />
          </div>
          <button
            type="button"
            aria-label="Settings"
            className="text-white/90 active:scale-90 transition-transform"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
