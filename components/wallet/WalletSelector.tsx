function RedBlockAvatar() {
  return (
    <div className="relative h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-rose-500 to-red-700 p-[2px] shadow-inner">
      <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-[1px] rounded-full overflow-hidden">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-[1px] ${
              [1, 3, 5, 7].includes(i) ? "bg-rose-300/70" : "bg-rose-700/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function WalletSelector() {
  return (
    <div className="flex items-center justify-between px-5 pt-5">
      <div className="flex items-center gap-3">
        <RedBlockAvatar />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-white">
              Wallet 1 – Account #1
            </span>
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-white/70">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xs text-white/60">None</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Copy address"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white active:scale-90 transition-transform"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M5 15V6a2 2 0 0 1 2-2h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Wallet switch"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white active:scale-90 transition-transform"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path d="M3 7h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 10h18M7 15h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
