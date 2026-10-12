function MiniChart() {
  const pts = [
    [0, 70],
    [18, 64],
    [34, 66],
    [50, 50],
    [66, 40],
    [82, 30],
    [100, 18],
  ];
  const path = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");

  return (
    <svg viewBox="0 0 100 90" className="h-24 w-32" fill="none">
      <defs>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="chart-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path d={`${path} L 100 90 L 0 90 Z`} fill="url(#chart-fill)" />
      <path d={path} stroke="url(#chart-stroke)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="#facc15" />
      ))}
      <g transform="translate(86, 10)">
        <circle r="9" fill="#fbbf24" />
        <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="700" fill="#7c2d12">₿</text>
      </g>
      <text x="2" y="78" fontSize="9" fontWeight="700" fill="#7c3aed">$81K</text>
      <text x="80" y="14" fontSize="9" fontWeight="700" fill="#7c3aed">$?K</text>
    </svg>
  );
}

export default function PredictBTCCard() {
  return (
    <div className="mx-5 mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-100 to-purple-200/70 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-base font-bold text-neutral-900">
            Predict BTC move &amp; Win
          </h3>
          <p className="mt-1 text-xs leading-5 text-neutral-600">
            Win rewards when your prediction is correct
          </p>
          <button
            type="button"
            className="mt-4 inline-flex items-center rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow active:scale-95 transition-transform"
          >
            Play now
          </button>
        </div>
        <div className="shrink-0">
          <MiniChart />
        </div>
      </div>
    </div>
  );
}
