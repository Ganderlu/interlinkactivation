"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onSettingsChange } from "@/lib/settings";
import { DEFAULT_SETTINGS, type PlatformSettings } from "@/types";
import LanguageSelector from "./LanguageSelector";

function CoinIcon() {
  return (
    <div className="relative h-9 w-9 shrink-0 rounded-xl bg-cta-gradient shadow-glow flex items-center justify-center">
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
        <path
          d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
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
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 active:scale-95 transition-transform"
          >
            <CoinIcon />
            <span className="text-lg font-bold tracking-tight text-black">
              ITLCoin
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
              <span className="font-medium text-black">{rateLabel}</span>
            </div>
            <LanguageSelector />
            <a
              href="#redeem"
              className="hidden md:inline-flex btn-primary !px-4 sm:!px-5 !py-2.5 text-sm !font-semibold"
            >
              Redeem ITL
            </a>
            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-brand-200 bg-white/70 text-brand-700 active:scale-95 transition"
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
        className={`md:hidden overflow-hidden border-t border-brand-100 bg-white/95 backdrop-blur-xl transition-all duration-300 ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-black hover:bg-brand-50 hover:text-brand-700 active:scale-[0.98] transition"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-brand-50/60 border border-brand-100 px-4 py-3">
            <LiveDot open={settings.redemptionOpen} />
            <span className="text-sm font-medium text-brand-800">
              {rateLabel}
            </span>
          </div>
          <div className="mt-2 px-1">
            <LanguageSelector compact />
          </div>
        </nav>
      </div>
    </header>
  );
}
