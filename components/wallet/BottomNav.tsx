"use client";

const items = [
  {
    key: "home",
    label: "Home",
    active: false,
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="m3 11 9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2v-9Z"
          stroke={active ? "#6d28d9" : "currentColor"}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "dapp",
    label: "DApp",
    active: false,
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M12 2 3 7l9 5 9-5-9-5Z"
          stroke={active ? "#6d28d9" : "currentColor"}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="m3 12 9 5 9-5M3 17l9 5 9-5"
          stroke={active ? "#6d28d9" : "currentColor"}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "activate",
    label: "Activate",
    active: true,
    fab: true,
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M7 7h13l-3-3M17 17H4l3 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "card",
    label: "Card",
    active: false,
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect
          x="3"
          y="6"
          width="18"
          height="13"
          rx="2"
          stroke={active ? "#6d28d9" : "currentColor"}
          strokeWidth="1.6"
        />
        <path
          d="M3 10h18"
          stroke={active ? "#6d28d9" : "currentColor"}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: "profile",
    label: "Profile",
    active: false,
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <circle
          cx="12"
          cy="8"
          r="4"
          stroke={active ? "#6d28d9" : "currentColor"}
          strokeWidth="1.6"
        />
        <path
          d="M4 21a8 8 0 0 1 16 0"
          stroke={active ? "#6d28d9" : "currentColor"}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function BottomNav({
  onSelect,
}: {
  onSelect: (key: string, label: string) => void;
}) {
  return (
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[420px] -translate-x-1/2 px-5 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-6">
      <div className="relative flex items-end justify-between rounded-3xl bg-white px-3 py-2.5 shadow-[0_10px_40px_-12px_rgba(109,40,217,0.35)]">
        {items.slice(0, 2).map((it) => (
          <NavButton key={it.key} item={it} onSelect={onSelect} />
        ))}

        <button
          type="button"
          onClick={() => onSelect(items[2].key, items[2].label)}
          aria-label={items[2].label}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-cta-gradient text-white shadow-glow active:scale-95 transition-transform"
        >
          {items[2].icon(true)}
        </button>

        {items.slice(3).map((it) => (
          <NavButton key={it.key} item={it} onSelect={onSelect} />
        ))}
      </div>
      <div className="mt-1 text-center text-[11px] font-semibold text-white drop-shadow">
        {items[2].label}
      </div>
    </div>
  );
}

function NavButton({
  item,
  onSelect,
}: {
  item: (typeof items)[number];
  onSelect: (key: string, label: string) => void;
}) {
  const fab = "fab" in item && item.fab;
  if (fab) return null;
  return (
    <button
      type="button"
      onClick={() => onSelect(item.key, item.label)}
      className={
        "flex flex-1 flex-col items-center gap-1 py-1 active:scale-95 transition-transform " +
        (item.active ? "text-brand-700" : "text-neutral-400")
      }
    >
      {item.icon(item.active)}
      <span className="text-[10px] font-medium">{item.label}</span>
    </button>
  );
}
