const testimonials = [
  {
    name: "Marcus T.",
    role: "ITL holder",
    text: "The whole redemption process was clean and fast. I sent my ITL and received USDT in my wallet the same day. The fixed rate meant no surprises.",
    avatar: "MT",
  },
  {
    name: "Elena R.",
    role: "First-time redeemer",
    text: "I was nervous about my first redemption, but the steps were crystal clear. Support answered my questions quickly and everything worked exactly as described.",
    avatar: "ER",
  },
  {
    name: "David K.",
    role: "Frequent redeemer",
    text: "I've done multiple redemptions here and they're consistently reliable. The rate lock gives me peace of mind while I complete the request.",
    avatar: "DK",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
      <div className="flex flex-col items-center text-center mb-10 sm:mb-14 gap-3">
        <span className="section-eyebrow">TESTIMONIALS</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black">
          Trusted by thousands of redeemers
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-neutral-600 leading-relaxed">
          Real feedback from people who have redeemed their ITL for USDT through
          our platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="glass-card p-6 sm:p-7 transition-all duration-300 hover:border-brand-400/60 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_rgba(124,58,237,0.18)]"
          >
            <Stars />
            <p className="mt-4 text-sm leading-7 text-neutral-700">
              "{t.text}"
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cta-gradient text-sm font-bold text-white">
                {t.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold text-black">{t.name}</div>
                <div className="text-xs text-neutral-500">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
