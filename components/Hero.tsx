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
          open ? "bg-emerald-400/30" : "bg-amber-400/30"
        }`}
      />
      <div
        className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm font-semibold ${
          open
            ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-100"
            : "border-amber-400/40 bg-amber-400/15 text-amber-100"
        }`}
      >
        <span className="relative inline-flex h-2 w-2">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
              open ? "bg-emerald-300" : "bg-amber-300"
            }`}
          />
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              open ? "bg-emerald-300" : "bg-amber-300"
            }`}
          />
        </span>
        {open ? "Redemption Open · Live Now" : "Redemptions Temporarily Closed"}
      </div>
    </div>
  );
}

function GlobeVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md aspect-square hidden lg:block">
      {/* Glow behind globe */}
      <div className="absolute inset-8 rounded-full bg-brand-400/30 blur-3xl" />

      {/* Globe sphere */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#1a0f3d] via-[#2d1b69] to-[#1a0f3d] shadow-[0_0_80px_-10px_rgba(139,92,246,0.5)] overflow-hidden">
        {/* Grid lines on globe */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(167,139,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            borderRadius: "50%",
          }}
        />
        {/* Inner highlight */}
        <div className="absolute top-6 left-10 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
      </div>

      {/* Orbiting coins */}
      <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CoinBadge label="ITL" gold />
        </div>
        <div className="absolute top-1/4 right-0 translate-x-1/2 -translate-y-1/2">
          <CoinBadge label="USDT" />
        </div>
        <div className="absolute bottom-1/4 right-0 translate-x-1/2 translate-y-1/2">
          <CoinBadge label="ITL" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <CoinBadge label="USDT" gold />
        </div>
        <div className="absolute bottom-1/4 left-0 -translate-x-1/2 translate-y-1/2">
          <CoinBadge label="ITL" />
        </div>
        <div className="absolute top-1/4 left-0 -translate-x-1/2 -translate-y-1/2">
          <CoinBadge label="USDT" />
        </div>
      </div>

      {/* Center coin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-amber-400/40 blur-xl animate-pulse" />
          <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-lg border-2 border-amber-200/50">
            <span className="text-xs font-extrabold text-amber-900">ITL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoinBadge({ label, gold }: { label: string; gold?: boolean }) {
  return (
    <div
      className={`h-9 w-9 rounded-full flex items-center justify-center shadow-lg border-2 ${
        gold
          ? "bg-gradient-to-br from-amber-300 to-amber-500 border-amber-200/50"
          : "bg-white border-brand-200"
      }`}
    >
      <span
        className={`text-[9px] font-extrabold ${
          gold ? "text-amber-900" : "text-brand-700"
        }`}
      >
        {label}
      </span>
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
        <div
          key={it.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur px-3 py-1.5 text-xs sm:text-sm text-brand-100"
        >
          <span className="text-brand-300">{it.icon}</span>
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
      className="relative overflow-hidden bg-gradient-to-br from-[#2d1b69] via-[#3b1d8a] to-[#1a0f3d]"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Glow accents */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          {/* Left content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 sm:gap-7">
            <LiveBadge open={settings.redemptionOpen} />

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-200">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path
                  d="M12 2 3 7v10l9 5 9-5V7z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              InterlinkChain Redemption Network
            </div>

            <h1 className="max-w-2xl text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white">
              Redeem <span className="text-amber-300">$ITL</span> and secure
              your{" "}
              <span className="underline decoration-amber-300 decoration-4 underline-offset-8">
                Interlink
              </span>{" "}
              payout
            </h1>

            <p className="max-w-xl text-base sm:text-lg leading-8 text-brand-100/90">
              ITLCoin is the redemption gateway for InterlinkChain. Convert your
              mined ITL into BEP-20 USDT at a fixed, transparent rate —
              manually-verified and delivered fast to your wallet.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#redeem"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-bold px-7 py-4 text-base shadow-lg shadow-amber-500/20 transition-all duration-200 hover:brightness-110 hover:shadow-amber-500/40 active:scale-95"
              >
                Redeem ITL
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <Link
                href="/wallet"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur text-white font-semibold px-7 py-4 text-base transition-all duration-200 hover:bg-white/10 hover:border-white/40 active:scale-95"
              >
                Wallet activation
              </Link>
            </div>

            <TrustPills />
          </div>

          {/* Right visual */}
          <GlobeVisual />
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="relative border-t border-white/10 bg-[#120a2a]/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 text-brand-200/80">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-brand-300"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M12 8v4M12 16h.01"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span>
              <span className="font-bold text-white">1 ITL</span> ={" "}
              <span className="font-bold text-amber-300">
                {settings.payoutRate} USDT
              </span>{" "}
              — fixed rate, no hidden fees
            </span>
          </div>
          <a
            href="/wallet"
            className="inline-flex items-center gap-1.5 font-semibold text-amber-300 hover:text-amber-200 transition-colors"
          >
            Check your balance in the wallet
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
        </div>
      </div>
    </section>
  );
}
