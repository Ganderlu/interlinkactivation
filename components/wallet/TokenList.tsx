'use client';

const tabs = ["Token", "NFT", "History"] as const;

const tokens = [
  {
    name: "InterLink Token",
    symbol: "ITL",
    amount: "0 ITL",
    color: "from-violet-500 to-purple-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
      </svg>
    ),
  },
  {
    name: "InterLink Genesis Token",
    symbol: "ITLG",
    amount: "0 ITLG",
    color: "from-amber-400 to-yellow-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="m12 2 8.66 5v10L12 22 3.34 17V7L12 2Z" />
      </svg>
    ),
  },
];

export default function TokenList() {
  return (
    <div className="mx-5 mt-5 overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="flex items-center gap-1 border-b border-neutral-100 px-3 pt-3">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            className={
              "rounded-full px-4 py-1.5 text-sm font-medium transition active:scale-95 " +
              (t === "Token"
                ? "bg-brand-100 text-brand-700"
                : "text-neutral-500 hover:text-neutral-800")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 p-4">
        <button type="button" className="flex items-center gap-1 active:scale-95 transition-transform">
          <span className="flex -space-x-1.5">
            <span className="h-4 w-4 rounded-full border-2 border-white bg-blue-500" />
            <span className="h-4 w-4 rounded-full border-2 border-white bg-rose-500" />
            <span className="h-4 w-4 rounded-full border-2 border-white bg-amber-500" />
          </span>
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-neutral-400">
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="relative flex-1">
          <svg viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search asset"
            className="w-full rounded-full bg-neutral-100 py-2 pl-9 pr-3 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>

        <button type="button" aria-label="Filter" className="text-neutral-500 active:scale-90 transition-transform">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <ul className="divide-y divide-neutral-100">
        {tokens.map((t) => (
          <li key={t.symbol} className="flex items-center gap-3 px-4 py-3.5">
            <span className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-white`}>
              {t.icon}
            </span>
            <div className="flex-1">
              <div className="text-sm font-semibold text-neutral-900">{t.name}</div>
              <div className="text-xs text-neutral-400">{t.symbol}</div>
            </div>
            <div className="text-sm font-semibold text-neutral-700">{t.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
