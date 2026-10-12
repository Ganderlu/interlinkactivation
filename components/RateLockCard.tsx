'use client';

import { useEffect, useState } from "react";

const START_SECONDS = 60;
const INITIAL_DISPLAY = 43;

export default function RateLockCard() {
  const [secondsLeft, setSecondsLeft] = useState<number>(INITIAL_DISPLAY);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? START_SECONDS : prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const size = 140;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = secondsLeft / START_SECONDS;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="glass-card p-5 sm:p-6 text-center">
      <div className="text-sm font-semibold text-neutral-100">Payout rate lock</div>
      <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
        Your quoted payout rate is held for a short window before refreshing.
      </p>

      <div className="relative mx-auto my-6 h-[140px] w-[140px]">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(63, 63, 70, 0.6)"
            strokeWidth={stroke}
            fill="none"
          />
          <defs>
            <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6d28d9" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#ring-grad)"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={mounted ? dashOffset : circumference * (1 - INITIAL_DISPLAY / START_SECONDS)}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-extrabold text-white tabular-nums">
            {mounted ? secondsLeft : INITIAL_DISPLAY}
          </div>
          <div className="text-[11px] uppercase tracking-widest text-neutral-500">
            seconds
          </div>
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1.5 text-sm font-semibold text-brand-200">
        1 ITL <span className="text-neutral-500">=</span> 2 USDT
      </div>
    </div>
  );
}
