import type { StatItem } from "@/types";

const stats: StatItem[] = [
  {
    label: "Payout Rate",
    value: "2.00",
    suffix: "USDT",
    caption: "per ITL",
  },
  {
    label: "Total Redeemed",
    value: "746.8K",
    suffix: "ITL",
    caption: "this redemption round",
  },
  {
    label: "Redeemers Served",
    value: "18,204",
    caption: "verified requests",
  },
  {
    label: "Network",
    value: "InterlinkChain",
    caption: "L1 · live",
    highlight: true,
  },
];

export default function StatsRow() {
  return (
    <section
      id="stats"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass-card p-6 transition-all duration-300 hover:border-brand-600/50 hover:-translate-y-0.5"
          >
            <div className="text-xs sm:text-sm font-medium text-neutral-500 uppercase tracking-wider">
              {s.label}
            </div>
            <div className="mt-3 flex items-baseline gap-1.5 flex-wrap">
              <span
                className={
                  s.highlight
                    ? "text-2xl sm:text-3xl font-bold bg-brand-gradient bg-clip-text text-transparent"
                    : "text-2xl sm:text-3xl font-bold text-black"
                }
              >
                {s.value}
              </span>
              {s.suffix ? (
                <span className="text-sm sm:text-base font-semibold text-neutral-700">
                  {s.suffix}
                </span>
              ) : null}
            </div>
            {s.caption ? (
              <div className="mt-1.5 text-xs sm:text-sm text-neutral-500">
                {s.caption}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
