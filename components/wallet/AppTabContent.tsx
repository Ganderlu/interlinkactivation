"use client";

import { useEffect, useState } from "react";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning!";
  if (h < 18) return "Good Afternoon!";
  return "Good Evening!";
}

function useGreeting() {
  const [greeting, setGreeting] = useState(getGreeting);
  useEffect(() => {
    setGreeting(getGreeting());
    const id = setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => clearInterval(id);
  }, []);
  return greeting;
}

export default function AppTabContent() {
  const greeting = useGreeting();
  const [showItlg, setShowItlg] = useState(false);
  const [showRecoverable, setShowRecoverable] = useState(false);

  return (
    <div className="bg-white px-5 pb-28 pt-6">
      {/* Greeting */}
      <h1 className="text-[28px] font-bold leading-tight text-neutral-900">
        {greeting}
      </h1>

      {/* LinkersMap card */}
      <div className="relative mt-6 overflow-hidden rounded-3xl bg-white p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-neutral-900">
              LinkersMap is live now
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              A marketplace for linkers
            </p>
            <button
              type="button"
              className="mt-4 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm active:scale-95 transition-transform"
            >
              Buy Now
            </button>
          </div>
          <div className="relative flex-shrink-0">
            <LinkersMapIcon />
          </div>
        </div>
        {/* Now Live ribbon */}
        <div className="absolute right-[-34px] top-[14px] rotate-45 bg-gradient-to-r from-violet-500 to-fuchsia-500 px-10 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
          Now Live
        </div>
      </div>

      {/* ITLG balance cards */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        {/* $ITLG */}
        <button
          type="button"
          onClick={() => setShowItlg((v) => !v)}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-50 to-indigo-100 p-4 text-left ring-1 ring-black/5 active:scale-[0.97] transition-transform"
          aria-pressed={showItlg}
        >
          <p
            className={`text-2xl font-bold tracking-wider ${
              showItlg ? "text-emerald-600" : "text-neutral-400"
            }`}
          >
            {showItlg ? "0" : "******"}
          </p>
          <p className="mt-1 text-sm font-medium text-neutral-500">$ITLG</p>
          <div className="mt-3 flex items-end justify-end">
            <CoinStack />
          </div>
        </button>

        {/* $ITLG Recoverable */}
        <button
          type="button"
          onClick={() => setShowRecoverable((v) => !v)}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 p-4 text-left ring-1 ring-black/5 active:scale-[0.97] transition-transform"
          aria-pressed={showRecoverable}
        >
          <p
            className={`text-2xl font-bold tracking-wider ${
              showRecoverable ? "text-emerald-600" : "text-neutral-400"
            }`}
          >
            {showRecoverable ? "0" : "******"}
          </p>
          <p className="mt-1 text-sm font-medium text-neutral-500">
            $ITLG Recoverable
          </p>
          <div className="mt-3 flex items-end justify-end">
            <RecoverableCoin />
          </div>
        </button>
      </div>

      {/* Mine $ITLG card */}
      <div className="relative mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-50 to-violet-50 p-5 ring-1 ring-black/5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-bold leading-snug text-neutral-900">
              Mine $ITLG to Secure the Human Network!
            </h2>
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-yellow-500 px-6 py-3 text-sm font-bold text-amber-950 shadow-md active:scale-95 transition-transform"
            >
              Mine $ITLG
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="relative flex-shrink-0">
            <GlobeWithAvatars />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Illustration components ---------- */

function LinkersMapIcon() {
  return (
    <div className="relative h-20 w-20">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100" />
      <svg
        viewBox="0 0 48 48"
        className="absolute inset-0 m-auto h-12 w-12"
        fill="none"
      >
        <path
          d="M24 42c7-7 12-12.5 12-19a12 12 0 1 0-24 0c0 6.5 5 12 12 19Z"
          fill="url(#lm-pin)"
        />
        <circle cx="24" cy="23" r="6" fill="#fff" />
        <path
          d="M18 23h12M24 17v12"
          stroke="#7c3aed"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="lm-pin" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-brand-700">
        LinkersMap
      </span>
    </div>
  );
}

function CoinStack() {
  return (
    <div className="flex -space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-400 to-indigo-700 shadow-lg ring-2 ring-white/60"
          style={{ transform: `rotate(${-12 + i * 10}deg)` }}
        >
          <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-white/90">
            ITLG
          </div>
        </div>
      ))}
    </div>
  );
}

function RecoverableCoin() {
  return (
    <div className="relative h-16 w-16">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 to-yellow-600 shadow-lg ring-2 ring-white/60" />
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-amber-900">
        ITLG
      </div>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="absolute -right-1 -top-1 h-7 w-7 text-blue-500"
      >
        <path
          d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function GlobeWithAvatars() {
  return (
    <div className="relative h-28 w-28">
      {/* Globe */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 shadow-inner">
        <div className="absolute inset-0 rounded-full opacity-40 [background-image:radial-gradient(circle_at_30%_30%,#4f46e5_0,transparent_45%),radial-gradient(circle_at_70%_60%,#22d3ee_0,transparent_40%)]" />
      </div>
      {/* Orbiting avatars */}
      {[
        { top: "-6%", left: "38%" },
        { top: "20%", left: "-10%" },
        { top: "70%", left: "-6%" },
        { top: "86%", left: "58%" },
        { top: "62%", left: "86%" },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute h-7 w-7 rounded-full bg-gradient-to-br from-violet-200 to-indigo-300 ring-2 ring-white"
          style={{ top: pos.top, left: pos.left }}
        />
      ))}
      {/* Small coin */}
      <div className="absolute right-0 top-3 h-5 w-5 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 ring-2 ring-white" />
    </div>
  );
}
