const benefits = [
  {
    title: "Manual, human-verified payouts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 22s8-4.35 8-12V5l-8-3-8 3v5c0 7.65 8 12 8 12Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Get paid in USDT, fast",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Transparent, fixed payout rate",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 3v18M5 8h11M5 16h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Simple 4-step process",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function WhyRedeemCard() {
  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="text-sm font-semibold text-brand-900 text-center">
        Why redeem with us
      </div>
      <ul className="mt-5 space-y-4">
        {benefits.map((b) => (
          <li key={b.title} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 text-brand-600">
              {b.icon}
            </span>
            <span className="text-sm leading-6 text-brand-700 pt-1.5">
              {b.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
