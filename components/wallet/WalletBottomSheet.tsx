"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface WalletBottomSheetProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

export default function WalletBottomSheet({
  title,
  open,
  onClose,
}: WalletBottomSheetProps) {
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleActivate = () => {
    onClose();
    router.push("/wallet/import");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-[420px] animate-[slideUp_0.3s_ease-out] rounded-t-[2rem] bg-white px-6 pb-8 pt-3 shadow-2xl"
      >
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-neutral-300" />
        <h2 className="text-2xl font-extrabold text-neutral-900">{title}</h2>
        <p className="mt-3 text-base leading-7 text-neutral-500">
          Activate a valid wallet to continue and access the {title} feature.
        </p>
        <button
          type="button"
          onClick={handleActivate}
          className="mt-8 w-full rounded-2xl bg-neutral-900 py-4 text-base font-semibold text-white shadow-lg transition active:scale-[0.98] hover:bg-neutral-800"
        >
          Activate Wallet
        </button>
      </div>
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
