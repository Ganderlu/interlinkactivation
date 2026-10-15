"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is the payout rate for ITL?",
    a: "You receive 2 USDT for every 1 ITL you redeem. This rate is fixed and published, and it's held for a short window while you complete your request so it won't change mid-process.",
  },
  {
    q: "How long does it take to receive my payout?",
    a: "Once you submit your request and we verify your ITL transfer, payouts are settled as quickly as possible. Most requests are reviewed and paid out on the same day, depending on network conditions and verification volume.",
  },
  {
    q: "Which network do you support for payouts?",
    a: "All payouts are sent as USDT on the BNB Smart Chain (BEP-20) network. Make sure the wallet address you provide supports BEP-20 USDT to avoid losing funds.",
  },
  {
    q: "Is my personal information safe?",
    a: "We only collect the information needed to process your redemption — your full name, email, and wallet address. Your ITL tokens are sent by you directly to our redemption address and are never held in a custodial wallet by us.",
  },
  {
    q: "What happens if my transaction isn't confirmed?",
    a: "Our team manually verifies every transfer. If we cannot confirm your transaction, we'll reach out via email to resolve it. You can always contact support for help with an in-progress request.",
  },
  {
    q: "Is there a minimum or maximum amount I can redeem?",
    a: "The platform supports a wide range of redemption amounts. For very large requests may require additional verification. Reach out to our team if you have specific questions about limits for your request.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24"
    >
      <div className="flex flex-col items-center text-center mb-10 sm:mb-14 gap-3">
        <span className="section-eyebrow">FAQ</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black">
          Frequently asked questions
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-neutral-600 leading-relaxed">
          Everything you need to know about redeeming ITL for USDT. Can't find
          your answer? Reach out to our support team.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="glass-card overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left active:scale-[0.99] transition-transform"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg font-semibold text-black">
                  {f.q}
                </span>
                <span
                  className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-brand-200 text-brand-600 transition-transform duration-300 ${
                    isOpen
                      ? "rotate-45 bg-brand-50 border-brand-400 text-brand-700"
                      : ""
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 sm:px-6 pb-5 text-sm leading-7 text-neutral-600">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
