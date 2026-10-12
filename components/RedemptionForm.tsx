"use client";

import { useEffect, useState } from "react";
import type { RedemptionStep, PlatformSettings } from "@/types";
import { DEFAULT_SETTINGS } from "@/types";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onSettingsChange } from "@/lib/settings";

interface RedemptionFormProps {
  currentStep: RedemptionStep;
  onStepChange: (step: RedemptionStep) => void;
}

const STEPS: RedemptionStep[] = [1, 2, 3, 4];

export default function RedemptionForm({
  currentStep,
  onStepChange,
}: RedemptionFormProps) {
  const [settings, setSettings] = useState<PlatformSettings>(DEFAULT_SETTINGS);
  const [itlAmount, setItlAmount] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [proofFile, setProofFile] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);

  // Live subscription to platform settings
  useEffect(() => {
    const unsub = onSettingsChange(setSettings);
    return () => unsub();
  }, []);

  const PAYOUT_RATE = settings.payoutRate;
  const MIN_ITL = settings.minItl;
  const MAX_ITL = settings.maxItl;

  const numericAmount = parseFloat(itlAmount || "0") || 0;
  const usdtPayout = (numericAmount * PAYOUT_RATE).toFixed(2);

  const isFirst = currentStep === 1;
  const isLast = currentStep === 4;

  // Validate a BEP-20 (EVM) wallet address: 0x + 40 hex chars.
  // This catches typos (wrong characters, wrong length). All-lowercase,
  // all-uppercase, and checksummed (mixed-case) addresses are all accepted.
  const isValidBep20Address = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address.trim());
  };

  const validateStep = (step: RedemptionStep): string | null => {
    if (step === 1) {
      if (!itlAmount.trim())
        return "Please enter the amount of ITL you want to redeem.";
      if (numericAmount < MIN_ITL)
        return `The minimum amount is ${MIN_ITL} ITL per transaction.`;
      if (numericAmount > MAX_ITL)
        return `The maximum amount is ${MAX_ITL} ITL per transaction.`;
      return null;
    }
    if (step === 2) {
      if (!fullName.trim()) return "Please enter your full name.";
      if (fullName.trim().length < 2) return "Please enter a valid full name.";
      if (!email.trim()) return "Please enter your email address.";
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!emailOk) return "Please enter a valid email address.";
      if (!walletAddress.trim())
        return "Please enter your BNB Smart Chain (BEP-20) wallet address.";
      if (!isValidBep20Address(walletAddress)) {
        return "That wallet address doesn't look right. A BEP-20 address starts with 0x followed by 40 characters (0-9, a-f).";
      }
      return null;
    }
    if (step === 3) {
      if (!proofFile.trim())
        return "Please upload proof of your transaction before continuing.";
      return null;
    }
    return null;
  };

  const goBack = () => {
    if (!isFirst) {
      setStepError(null);
      onStepChange((currentStep - 1) as RedemptionStep);
    }
  };

  // Wrappers that clear the step-level error as the user starts editing
  const updateItlAmount = (v: string) => {
    setItlAmount(v);
    if (stepError) setStepError(null);
  };
  const updateFullName = (v: string) => {
    setFullName(v);
    if (stepError) setStepError(null);
  };
  const updateEmail = (v: string) => {
    setEmail(v);
    if (stepError) setStepError(null);
  };
  const updateWalletAddress = (v: string) => {
    setWalletAddress(v);
    if (stepError) setStepError(null);
  };
  const updateProofFile = (v: string) => {
    setProofFile(v);
    if (stepError) setStepError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate current step before proceeding
    const validationError = validateStep(currentStep);
    if (validationError) {
      setStepError(validationError);
      return;
    }
    setStepError(null);

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
    <div className="glass-card p-5 sm:p-7 lg:p-8 relative overflow-hidden">
      {!settings.redemptionOpen ? (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 border border-amber-500/40">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8 text-amber-400"
            >
              <path
                d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mt-5 text-2xl font-bold text-white">
            Redemptions temporarily closed
          </h3>
          <p className="mt-3 text-sm leading-7 text-neutral-400 max-w-md">
            We're currently reviewing our redemption schedule. Please check back
            soon — we'll reopen as quickly as possible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
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
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-4 w-4"
                          >
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
              setItlAmount={updateItlAmount}
              usdtPayout={usdtPayout}
              minItl={MIN_ITL}
              maxItl={MAX_ITL}
            />
          ) : currentStep === 2 ? (
            <StepDetails
              fullName={fullName}
              setFullName={updateFullName}
              email={email}
              setEmail={updateEmail}
              walletAddress={walletAddress}
              setWalletAddress={updateWalletAddress}
            />
          ) : currentStep === 3 ? (
            <StepSend
              proofFile={proofFile}
              setProofFile={updateProofFile}
              redemptionWalletAddress={settings.redemptionWalletAddress}
            />
          ) : (
            <StepConfirm
              itlAmount={itlAmount}
              usdtPayout={usdtPayout}
              fullName={fullName}
              email={email}
              walletAddress={walletAddress}
              proofFile={proofFile}
            />
          )}

          {stepError ? (
            <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200 flex items-start gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 mt-0.5 shrink-0"
              >
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{stepError}</span>
            </div>
          ) : null}

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
      )}
    </div>
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
  minItl,
  maxItl,
}: {
  itlAmount: string;
  setItlAmount: (v: string) => void;
  usdtPayout: string;
  minItl: number;
  maxItl: number;
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
        Min {minItl} ITL, max {maxItl} ITL per transaction. Paid out in USDT on
        the BNB Smart Chain (BEP-20) network.
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
  const trimmedWallet = walletAddress.trim();
  const walletValid =
    trimmedWallet.length > 0 && /^0x[a-fA-F0-9]{40}$/.test(trimmedWallet);

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
      <div>
        <label htmlFor="wallet" className="field-label">
          BNB Smart Chain (BEP-20) wallet address
        </label>
        <div className="relative">
          <input
            id="wallet"
            type="text"
            placeholder="0x…"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className={`w-full field-input pr-11 font-mono ${
              trimmedWallet.length > 0
                ? walletValid
                  ? "border-emerald-500/60 focus:border-emerald-500 focus:ring-emerald-500/30"
                  : "border-red-500/60 focus:border-red-500 focus:ring-red-500/30"
                : ""
            }`}
          />
          {trimmedWallet.length > 0 ? (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
              {walletValid ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-emerald-400"
                >
                  <path
                    d="m5 12 5 5L20 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-red-400"
                >
                  <path
                    d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          ) : null}
        </div>
        <span className="field-helper">
          {trimmedWallet.length === 0
            ? "Make sure this wallet supports BEP-20 USDT"
            : walletValid
              ? "Valid BEP-20 wallet address"
              : "Address must start with 0x and contain 40 characters (0-9, a-f)"}
        </span>
      </div>
    </div>
  );
}

function StepSend({
  proofFile,
  setProofFile,
  redemptionWalletAddress,
}: {
  proofFile: string;
  setProofFile: (v: string) => void;
  redemptionWalletAddress: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic client-side checks
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, or WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File is too large. Maximum size is 5 MB.");
      return;
    }

    setUploadError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      setProofFile(data.url);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError(
        err instanceof Error
          ? err.message
          : "We couldn't upload your proof. Please try again.",
      );
    } finally {
      setUploading(false);
      // reset input so the same file can be re-selected
      e.target.value = "";
    }
  };

  const isUrl = proofFile.startsWith("http");

  return (
    <div className="space-y-5">
      <div className="glass-card p-5 bg-neutral-950/60 space-y-3">
        <div className="text-sm text-neutral-400">Redemption address</div>
        <div className="flex items-center gap-3">
          <code className="flex-1 text-sm text-white bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 break-all">
            {redemptionWalletAddress}
          </code>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(redemptionWalletAddress);
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
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <svg
                className="h-8 w-8 animate-spin text-brand-400"
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
              <div className="text-sm text-neutral-200">Uploading…</div>
            </div>
          ) : isUrl ? (
            <div className="space-y-3">
              <img
                src={proofFile}
                alt="Transaction proof"
                className="mx-auto max-h-48 rounded-lg border border-neutral-700"
              />
              <div className="text-sm text-emerald-300 flex items-center justify-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path
                    d="m5 12 5 5L20 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Proof uploaded
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setProofFile("");
                }}
                className="text-xs text-neutral-400 hover:text-red-300 transition"
              >
                Remove
              </button>
            </div>
          ) : (
            <>
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
                Click to upload a screenshot
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                PNG, JPG, WEBP up to 5MB
              </div>
            </>
          )}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>
        {uploadError ? (
          <p className="mt-2 text-xs text-red-400">{uploadError}</p>
        ) : null}
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
  proofFile,
}: {
  itlAmount: string;
  usdtPayout: string;
  fullName: string;
  email: string;
  walletAddress: string;
  proofFile: string;
}) {
  const shortWallet =
    walletAddress.length > 10
      ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`
      : walletAddress || "0x…";
  const proofIsUrl = proofFile.startsWith("http");

  return (
    <div className="space-y-4">
      <div className="glass-card p-5 bg-neutral-950/60 divide-y divide-neutral-800">
        <Row k="ITL to redeem" v={`${itlAmount || "0"} ITL`} />
        <Row k="Payout rate" v="1 ITL = 2 USDT" />
        <Row k="Payout amount" v={`${usdtPayout} USDT`} strong />
        <Row k="Name" v={fullName || "—"} />
        <Row k="Email" v={email || "—"} />
        <Row k="Wallet (BEP-20)" v={shortWallet} />
        <div className="py-3 first:pt-0 last:pb-0">
          <span className="text-sm text-neutral-400">Transaction proof</span>
          {proofIsUrl ? (
            <div className="mt-2">
              <img
                src={proofFile}
                alt="Transaction proof"
                className="max-h-40 rounded-lg border border-neutral-700"
              />
              <a
                href={proofFile}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs text-brand-400 hover:text-brand-300 transition"
              >
                View full size
              </a>
            </div>
          ) : (
            <span className="text-sm font-medium text-neutral-100">
              {proofFile || "—"}
            </span>
          )}
        </div>
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
