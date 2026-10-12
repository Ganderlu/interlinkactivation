export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-900/40 via-neutral-950 to-brand-900/30 px-6 py-12 sm:px-12 sm:py-16 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-64 w-[480px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[100px]" />
          <div className="absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-brand-400/10 blur-[80px]" />
        </div>
        <div className="relative">
          <span className="section-eyebrow">READY TO REDEEM?</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Turn your ITL into USDT today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-7 text-neutral-300">
            Join thousands of redeemers who trust ITLCoin for a fast, transparent,
            and secure redemption experience. Get started in minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="#redeem" className="btn-primary !px-7 !py-3.5 text-base !font-semibold">
              Redeem ITL Now
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="/wallet" className="btn-secondary !px-7 !py-3.5 text-base">
              Open Wallet
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-500">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Redemption is live · 1 ITL = 2 USDT
          </div>
        </div>
      </div>
    </section>
  );
}
