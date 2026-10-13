"use client";

import { useState } from "react";

export default function TotalBalance() {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="px-5 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white/90">Total Balance</span>
          <button
            type="button"
            onClick={() => setHidden((v) => !v)}
            aria-label={hidden ? "Show balance" : "Hide balance"}
            className="text-white/70 active:scale-90 transition-transform"
          >
            {hidden ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M3 3l18 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 5.1A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-3.2 4.2M6.1 6.1A16 16 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 3.9-.8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            )}
          </button>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-neutral-800 shadow-sm active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12 7v5l3 2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back up
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-brand-400">
          <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" fill="currentColor" opacity="0.9" />
          <path d="M12 2 3 7l9 5 9-5-9-5Z" fill="currentColor" />
        </svg>
        <span className="text-5xl font-extrabold tracking-tight text-white tabular-nums">
          {hidden ? "••••" : "0"}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm text-white/70">
          {hidden ? "• ITL" : "0 ITL"}
        </span>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300">
          0.00%
        </span>
      </div>
    </div>
  );
}
