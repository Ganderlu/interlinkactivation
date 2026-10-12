"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onSettingsChange } from "@/lib/settings";
import { DEFAULT_SETTINGS, type PlatformSettings } from "@/types";

function CoinIcon() {
  return (
    <div className="relative h-9 w-9 shrink-0">
      <div className="absolute inset-0 rounded-full bg-cta-gradient shadow-glow" />
      <div className="absolute inset-[3px] rounded-full bg-neutral-950/90 flex items-center justify-center">
        <span className="text-[13px] font-extrabold bg-brand-gradient bg-clip-text text-transparent">
          ITL
        </span>
      </div>
    </div>
  );
}

function LiveDot({ open }: { open: boolean }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
          open ? "bg-emerald-400" : "bg-amber-400"
        }`}
      />
      <span
        className={`relative inline-flex h-2 w-2 rounded-full ${
          open ? "bg-emerald-400" : "bg-amber-400"
        }`}
      />
    </span>
  );
}

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Stats", href: "#stats" },
  { label: "Redeem", href: "#redeem" },
  { label: "FAQ", href: "#faq" },
  { label: "Wallet", href: "/wallet" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState<PlatformSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const unsub = onSettingsChange(setSettings);
    return () => unsub();
  }, []);

  const rateLabel = `1 ITL = ${settings.payoutRate} USDT`;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800/70 bg-neutral-950/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 active:scale-95 transition-transform"
          >
            <CoinIcon />
            <span className="text-lg font-bold tracking-tight">
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                ITL
              </span>
              <span className="text-white">Coin</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="btn-ghost text-sm">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Rate chip — desktop only */}
            <div className="hidden lg:flex chip !py-1.5 !text-sm">
              <LiveDot open={settings.redemptionOpen} />
              <span className="font-medium text-neutral-200">{rateLabel}</span>
            </div>
            <a
              href="#redeem"
              className="btn-primary !px-4 sm:!px-5 !py-2.5 text-sm !font-semibold"
            >
              Redeem ITL
            </a>
            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900/60 text-neutral-200 active:scale-95 transition"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                {menuOpen ? (
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden border-t border-neutral-800/70 bg-neutral-950/95 backdrop-blur-xl transition-all duration-300 ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-neutral-300 hover:bg-neutral-800/60 hover:text-white active:scale-[0.98] transition"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-neutral-900/60 px-4 py-3">
            <LiveDot open={settings.redemptionOpen} />
            <span className="text-sm font-medium text-neutral-200">
              {rateLabel}
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
