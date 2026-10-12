"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onSettingsChange } from "@/lib/settings";
import { DEFAULT_SETTINGS, type PlatformSettings } from "@/types";

function LiveBadge({ open }: { open: boolean }) {
  return (
    <div className="relative inline-flex items-center">
      <div
        className={`absolute -inset-1 rounded-full blur-md ${
          open ? "bg-emerald-500/20" : "bg-amber-500/20"
        }`}
      />
      <div
        className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium ${
          open
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
            : "border-amber-500/40 bg-amber-500/10 text-amber-200"
        }`}
      >
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
        {open ? "Redemption Open · Live Now" : "Redemptions Temporarily Closed"}
      </div>
    </div>
  );
}

function TrustPills() {
  const items = [
    {
      label: "USDT (BEP-20) payout",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path
            d="M12 2 3 7v10l9 5 9-5V7z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="m8 11 3 3 5-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Manually-verified requests",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path
            d="M12 22s8-4.35 8-12V5l-8-3-8 3v5c0 7.65 8 12 8 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="m9 12 2 2 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Fast turnaround",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path
            d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {items.map((it) => (
        <div key={it.label} className="chip !text-xs sm:text-sm">
          <span className="text-brand-400">{it.icon}</span>
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const [settings, setSettings] = useState<PlatformSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const unsub = onSettingsChange(setSettings);
    return () => unsub();
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16 sm:pb-20"
    >
      <div className="flex flex-col items-center text-center gap-7 sm:gap-9">
        <LiveBadge open={settings.redemptionOpen} />

        <h1 className="max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
          <span className="text-white">Redeem your ITL,</span>
          <br className="hidden sm:block" />{" "}
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            get paid fast.
          </span>
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
          <a
            href="#redeem"
            className="btn-primary w-full sm:w-auto !px-7 !py-4 text-base !font-semibold justify-center"
          >
            Redeem ITL Coin
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <Link
            href="/wallet"
            className="btn-secondary w-full sm:w-auto !px-7 !py-4 text-base justify-center"
          >
            Wallet activation
          </Link>
        </div>

        <TrustPills />
      </div>
    </section>
  );
}
