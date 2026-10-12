const features = [
  {
    title: "Secure & transparent",
    desc: "Every redemption request is reviewed by a human operator, with a clear audit trail and a fixed, published payout rate — no hidden spreads or surprise fees.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M12 22s8-4.35 8-12V5l-8-3-8 3v5c0 7.65 8 12 8 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Fast USDT payouts",
    desc: "Once your transfer is verified, your USDT (BEP-20) payout is settled quickly — so your funds are where you need them, when you need them.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Fixed payout rate",
    desc: "Redeem 1 ITL for 2 USDT at a transparent, fixed rate. Lock your quote while you complete your request so the rate never moves on you.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M3 12h4l3-9 4 18 3-9h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Built on InterlinkChain",
    desc: "ITL lives on the InterlinkChain L1 network, so every transfer is verifiable on-chain and your redemption is backed by a real, live network.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Simple 4-step process",
    desc: "From entering your amount to receiving your payout, the whole flow is designed to be clear, fast, and accessible — even if this is your first redemption.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m9 14 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Real support, real people",
    desc: "Our team is available to help with every step of the process. Questions about your request? You'll always reach a human, not a bot.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
      <div className="flex flex-col items-center text-center mb-10 sm:mb-14 gap-3">
        <span className="section-eyebrow">WHY ITLCOIN</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          A redemption experience you can trust
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-neutral-400 leading-relaxed">
          Built for clarity, speed, and security — so redeeming your ITL for
          USDT feels straightforward and reliable from start to finish.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="group glass-card p-6 sm:p-7 transition-all duration-300 hover:border-brand-600/50 hover:-translate-y-1"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-500/30 bg-brand-500/10 text-brand-300 transition-transform duration-300 group-hover:scale-110">
              {f.icon}
            </div>
            <h3 className="mt-5 text-lg sm:text-xl font-bold text-white">
              {f.title}
            </h3>
            <p className="mt-2.5 text-sm leading-7 text-neutral-400">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
