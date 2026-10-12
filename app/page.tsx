import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsRow from "@/components/StatsRow";
import RedemptionSection from "@/components/RedemptionSection";
import ProcessSection from "@/components/ProcessSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#050508] text-white overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[560px] bg-hero-glow" />
        <div className="absolute left-1/2 top-[620px] h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-brand-700/10 blur-[140px]" />
        <div className="absolute left-[10%] bottom-0 h-[520px] w-[520px] rounded-full bg-brand-500/10 blur-[120px]" />
      </div>

      <Header />

      <main>
        <Hero />
        <StatsRow />
        <RedemptionSection />
        <ProcessSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>

      <footer className="border-t border-neutral-800/70 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="relative h-8 w-8 shrink-0">
                  <div className="absolute inset-0 rounded-full bg-cta-gradient shadow-glow" />
                  <div className="absolute inset-[3px] rounded-full bg-neutral-950/90 flex items-center justify-center">
                    <span className="text-[13px] font-extrabold bg-brand-gradient bg-clip-text text-transparent">
                      ITL
                    </span>
                  </div>
                </div>
                <span className="text-lg font-bold tracking-tight">
                  <span className="bg-brand-gradient bg-clip-text text-transparent">
                    ITL
                  </span>
                  <span className="text-white">Coin</span>
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-500 max-w-xs">
                Redeem your ITL tokens for BEP-20 USDT. Manually-verified payouts,
                a transparent fixed rate, and a fast 4-step process.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Product</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-500">
                <li>
                  <a href="#redeem" className="hover:text-neutral-200 transition-colors">
                    Redeem ITL
                  </a>
                </li>
                <li>
                  <a href="/wallet" className="hover:text-neutral-200 transition-colors">
                    Wallet
                  </a>
                </li>
                <li>
                  <a href="#stats" className="hover:text-neutral-200 transition-colors">
                    Live stats
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-neutral-200 transition-colors">
                    How it works
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Company</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-500">
                <li>
                  <a href="#how-it-works" className="hover:text-neutral-200 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-neutral-200 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-200 transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-200 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Legal</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-500">
                <li>
                  <a href="#" className="hover:text-neutral-200 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-200 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-200 transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-neutral-800/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} ITLCoin. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span>Built on InterlinkChain</span>
              <span className="hidden sm:inline text-neutral-700">·</span>
              <a href="#redeem" className="hover:text-neutral-200 transition-colors">
                Redeem now
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
