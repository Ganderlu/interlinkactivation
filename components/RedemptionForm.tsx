"use client";

import { useState } from "react";
import type { RedemptionStep } from "@/types";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface RedemptionFormProps {
  currentStep: RedemptionStep;
  onStepChange: (step: RedemptionStep) => void;
}

const STEPS: RedemptionStep[] = [1, 2, 3, 4];
const PAYOUT_RATE = 2;

export default function RedemptionForm({
  currentStep,
  onStepChange,
}: RedemptionFormProps) {
  const [itlAmount, setItlAmount] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [proofFile, setProofFile] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const numericAmount = parseFloat(itlAmount || "0") || 0;
  const usdtPayout = (numericAmount * PAYOUT_RATE).toFixed(2);

  const isFirst = currentStep === 1;
  const isLast = currentStep === 4;

  const goBack = () => {
    if (!isFirst) onStepChange((currentStep - 1) as RedemptionStep);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLast) {
      setError(null);
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, "redemptions"), {
          fullName: fullName.trim(),
          email: email.trim(),
          walletAddress: walletAddress.trim(),
          itlAmount: itlAmount.trim(),
          usdtPayout,
          transactionProof: proofFile,
          status: "pending",
          step: currentStep,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setIsSubmitted(true);
      } catch (err) {
        console.error("Failed to save redemption request:", err);
        setError(
          "We couldn't submit your request right now. Please check your connection and try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    onStepChange((currentStep + 1) as RedemptionStep);
  };

  const handleReset = () => {
    setItlAmount("");
    setFullName("");
    setEmail("");
    setWalletAddress("");
    setProofFile("");
    setIsSubmitted(false);
    setError(null);
    onStepChange(1);
  };

  if (isSubmitted) {
    return (
      <div className="glass-card p-6 sm:p-8 lg:p-10 text-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/40">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8 text-emerald-400"
            >
              <path
                d="m5 12 5 5L20 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mt-5 text-2xl font-bold text-white">
            Request submitted
          </h3>
          <p className="mt-3 text-sm leading-7 text-neutral-400 max-w-md mx-auto">
            Thank you, {fullName.split(" ")[0] || "there"}! Your redemption
            request has been saved successfully. Our team will review your
            transfer and send your{" "}
            <span className="text-white font-semibold">{usdtPayout} USDT</span>{" "}
            payout to your BEP-20 wallet shortly.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Status: Pending review
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="mt-8 btn-secondary"
          >
            Start a new redemption
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card p-5 sm:p-7 lg:p-8 relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-brand-600/10 blur-3xl pointer-events-none" />

      <ol className="relative flex items-start justify-between gap-2 mb-8">
        {STEPS.map((s, idx) => {
          const isActive = currentStep === s;
          const isDone = currentStep > s;
          const circleClass = isActive
            ? "bg-cta-gradient text-white shadow-glow border-transparent"
            : isDone
              ? "bg-brand-600/20 text-brand-300 border-brand-500/40"
              : "bg-neutral-900 text-neutral-500 border-neutral-700";
          return (
            <li key={s} className="relative flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300 shrink-0">
                  <span
                    className={
                      circleClass +
                      " h-8 w-8 flex items-center justify-center rounded-full"
                    }
                  >
                    {isDone ? (
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <path
                          d="m5 12 5 5L20 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      s
                    )}
                  </span>
                </div>
              </div>
              {idx < STEPS.length - 1 ? (
                <div className="absolute top-4 left-1/2 w-full h-[2px] bg-neutral-800">
                  <div
                    className="h-full bg-brand-gradient transition-all duration-300"
                    style={{
                      width: currentStep > s ? "100%" : "0%",
                    }}
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      {currentStep === 1 ? (
        <StepAmount
          itlAmount={itlAmount}
          setItlAmount={setItlAmount}
          usdtPayout={usdtPayout}
        />
      ) : currentStep === 2 ? (
        <StepDetails
          fullName={fullName}
          setFullName={setFullName}
          email={email}
          setEmail={setEmail}
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
        />
      ) : currentStep === 3 ? (
        <StepSend proofFile={proofFile} setProofFile={setProofFile} />
      ) : (
        <StepConfirm
          itlAmount={itlAmount}
          usdtPayout={usdtPayout}
          fullName={fullName}
          email={email}
          walletAddress={walletAddress}
        />
      )}

      {error ? (
        <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={isFirst || isSubmitting}
          className="btn-secondary flex-1 sm:max-w-[200px]"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex-1 sm:max-w-[240px]"
        >
          {isSubmitting ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  opacity="0.25"
                />
                <path
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              Submitting...
            </>
          ) : isLast ? (
            "Confirm & Submit"
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  helper,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  helper?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
      />
      {helper ? <span className="field-helper">{helper}</span> : null}
    </div>
  );
}

function StepAmount({
  itlAmount,
  setItlAmount,
  usdtPayout,
}: {
  itlAmount: string;
  setItlAmount: (v: string) => void;
  usdtPayout: string;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="itl-amount"
          className="block text-base font-semibold text-neutral-200 mb-3"
        >
          ITL amount to redeem
        </label>

        {/* Amount input with ITL badge */}
        <div className="relative">
          <input
            id="itl-amount"
            type="number"
            inputMode="decimal"
            min={0}
            step="0.01"
            value={itlAmount}
            onChange={(e) => setItlAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-2xl border border-neutral-700 bg-neutral-900/80 px-5 py-5 pr-20 text-2xl font-bold text-white placeholder:text-neutral-600 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 outline-none transition tabular-nums"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-xl bg-brand-500/15 border border-brand-500/30 px-3 py-1.5 text-sm font-semibold text-brand-300">
            ITL
          </span>
        </div>
      </div>

      {/* You'll receive box */}
      <div className="flex items-center justify-between rounded-2xl border border-brand-500/30 bg-brand-900/20 px-5 py-5">
        <span className="text-lg font-semibold text-neutral-300">
          You'll receive
        </span>
        <span className="text-2xl font-extrabold text-white tabular-nums">
          {usdtPayout} USDT
        </span>
      </div>

      {/* Helper text */}
      <p className="text-sm leading-6 text-neutral-500">
        Min 25 ITL, max 1000 ITL per transaction. Paid out in USDT on the BNB
        Smart Chain (BEP-20) network.
      </p>
    </div>
  );
}

function StepDetails({
  fullName,
  setFullName,
  email,
  setEmail,
  walletAddress,
  setWalletAddress,
}: {
  fullName: string;
  setFullName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  walletAddress: string;
  setWalletAddress: (v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <Field
        id="full-name"
        label="Full name"
        placeholder="Jane Doe"
        value={fullName}
        onChange={setFullName}
        helper="Your First and Last name"
      />
      <Field
        id="email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={setEmail}
        helper="We'll only use this to contact you about your redemption request"
      />
      <Field
        id="wallet"
        label="BNB Smart Chain (BEP-20) wallet address"
        placeholder="0x…"
        value={walletAddress}
        onChange={setWalletAddress}
        helper="Make sure this wallet supports BEP-20 USDT"
      />
    </div>
  );
}

function StepSend({
  proofFile,
  setProofFile,
}: {
  proofFile: string;
  setProofFile: (v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="glass-card p-5 bg-neutral-950/60 space-y-3">
        <div className="text-sm text-neutral-400">Redemption address</div>
        <div className="flex items-center gap-3">
          <code className="flex-1 text-sm text-white bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 break-all">
            0x1TLcOinXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
          </code>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(
                "0x1TLcOinXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
              );
            }}
            className="btn-secondary !px-4 !py-2 !text-xs active:scale-95"
          >
            Copy
          </button>
        </div>
        <div className="text-xs text-neutral-500">
          Send only ITL on InterlinkChain to this address.
        </div>
      </div>
      <div>
        <label className="field-label">Upload proof of transaction</label>
        <div className="mt-1 border-2 border-dashed border-neutral-700 hover:border-brand-500/70 rounded-xl p-6 text-center transition cursor-pointer active:scale-[0.99]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-8 w-8 mx-auto text-brand-400 mb-2"
          >
            <path
              d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-sm text-neutral-200">
            {proofFile || "Click to upload a screenshot"}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            PNG, JPG up to 5MB
          </div>
          <input
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setProofFile(file.name);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function StepConfirm({
  itlAmount,
  usdtPayout,
  fullName,
  email,
  walletAddress,
}: {
  itlAmount: string;
  usdtPayout: string;
  fullName: string;
  email: string;
  walletAddress: string;
}) {
  const shortWallet =
    walletAddress.length > 10
      ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`
      : walletAddress || "0x…";

  return (
    <div className="space-y-4">
      <div className="glass-card p-5 bg-neutral-950/60 divide-y divide-neutral-800">
        <Row k="ITL to redeem" v={`${itlAmount || "0"} ITL`} />
        <Row k="Payout rate" v="1 ITL = 2 USDT" />
        <Row k="Payout amount" v={`${usdtPayout} USDT`} strong />
        <Row k="Name" v={fullName || "—"} />
        <Row k="Email" v={email || "—"} />
        <Row k="Wallet (BEP-20)" v={shortWallet} />
      </div>
      <p className="text-xs text-neutral-500">
        By clicking Confirm & Submit you confirm the details above and agree to
        our terms. Our team will review your request and send the payout shortly
        after confirmation.
      </p>
    </div>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
      <span className="text-sm text-neutral-400">{k}</span>
      <span
        className={
          strong
            ? "text-base font-bold bg-brand-gradient bg-clip-text text-transparent"
            : "text-sm font-medium text-neutral-100"
        }
      >
        {v}
      </span>
    </div>
  );
}
