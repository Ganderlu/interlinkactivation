'use client';

import { useState } from "react";
import type { RedemptionStep } from "@/types";
import RedemptionForm from "./RedemptionForm";
import RateLockCard from "./RateLockCard";
import WhyRedeemCard from "./WhyRedeemCard";

export default function RedemptionSection() {
  const [step, setStep] = useState<RedemptionStep>(1);

  return (
    <section id="redeem" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
      <div className="flex flex-col items-center text-center mb-10 sm:mb-12 gap-3">
        <span className="section-eyebrow">ITL BUYBACK</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Redeem ITL Coin
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-neutral-400 leading-relaxed">
          Get <span className="text-white font-semibold">2 USDT</span> for every{" "}
          <span className="text-white font-semibold">1 ITL</span> you redeem.
          Complete the steps below to submit your payout request.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 lg:gap-6 items-start">
        <RedemptionForm currentStep={step} onStepChange={setStep} />
        <div className="grid grid-cols-1 gap-5 lg:gap-6">
          <RateLockCard />
          <WhyRedeemCard />
        </div>
      </div>
    </section>
  );
}
