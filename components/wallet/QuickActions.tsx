const actions = [
  {
    key: "send",
    label: "Send",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badge: null,
  },
  {
    key: "receive",
    label: "Receive",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 5v14M12 19l6-6M12 19l-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badge: null,
  },
  {
    key: "stake",
    label: "Stake",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 3 3 8l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m3 13 9 5 9-5M3 18l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    badge: null,
  },
  {
    key: "exchange",
    label: "Exchange",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M7 7h13l-3-3M17 17H4l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badge: "NEW",
  },
  {
    key: "more",
    label: "More",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect x="4" y="4" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="14" y="4" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="4" y="14" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="14" y="14" width="6" height="6" rx="1.5" fill="currentColor" />
      </svg>
    ),
    badge: null,
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-5 gap-2 px-5 pt-6">
      {actions.map((a) => (
        <button
          key={a.key}
          type="button"
          className="group flex flex-col items-center gap-2 active:scale-95 transition-transform"
        >
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
            {a.icon}
            {a.badge ? (
              <span className="absolute -right-1 -top-1 rounded-full bg-brand-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow">
                {a.badge}
              </span>
            ) : null}
          </span>
          <span className="text-[11px] font-medium text-white/90">{a.label}</span>
        </button>
      ))}
    </div>
  );
}
