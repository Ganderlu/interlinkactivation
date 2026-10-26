"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LANGUAGES, useLanguage } from "./LanguageProvider";

/**
 * A polished, app-like language selector.
 * - Desktop: compact globe button that opens a dropdown grid of languages.
 * - Mobile: opens a bottom sheet for easy thumb-reach.
 */
export default function LanguageSelector({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { language, setLanguage, isReady } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  // Close on outside click / tap.
  // NOTE: the mobile bottom sheet is portaled to document.body, so it lives
  // OUTSIDE wrapperRef. Both refs must be checked, otherwise the outside-tap
  // handler unmounts the sheet on `mousedown`/`touchstart` — before the tap's
  // `click` can register on the language button — which broke mobile selection.
  useEffect(() => {
    if (!open) return;
    function onDocPointerDown(e: Event) {
      const target = e.target as Node | null;
      if (!target) return;
      if (wrapperRef.current?.contains(target)) return;
      if (sheetRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocPointerDown);
    document.addEventListener("touchstart", onDocPointerDown);
    return () => {
      document.removeEventListener("mousedown", onDocPointerDown);
      document.removeEventListener("touchstart", onDocPointerDown);
    };
  }, [open]);

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const handleSelect = (code: string) => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white/70 px-3 py-2 text-sm font-medium text-brand-700 transition hover:border-brand-400 hover:text-brand-900 active:scale-95"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-brand-500">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
        <span className="text-base leading-none">{current.flag}</span>
        {!compact ? (
          <span className="max-w-[4.5rem] truncate sm:max-w-[7rem]">
            {current.label}
          </span>
        ) : null}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`h-3.5 w-3.5 text-brand-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Desktop dropdown (stays relative to the trigger button) */}
      {open ? (
        <div className="absolute right-0 z-[60] mt-2 w-64 overflow-hidden rounded-2xl border border-brand-100 bg-white/95 p-2 shadow-2xl backdrop-blur-xl hidden md:block">
          <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-brand-500">
            Choose your language
          </p>
          <div className="max-h-80 overflow-y-auto">
            {LANGUAGES.map((l) => (
              <LanguageButton
                key={l.code}
                lang={l}
                active={l.code === language}
                onSelect={handleSelect}
              />
            ))}
          </div>
          {!isReady ? (
            <p className="px-3 py-2 text-[11px] text-brand-400">
              Loading translator…
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Mobile backdrop + bottom sheet — portaled to body so they escape
          any ancestor stacking context (e.g. backdrop-blur on the header). */}
      {open
        ? createPortal(
            <>
              <div
                className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm md:hidden"
                onClick={() => setOpen(false)}
              />
              <div
                ref={sheetRef}
                className="fixed inset-x-0 bottom-0 z-[91] mx-auto flex max-h-[80vh] w-full max-w-[420px] flex-col rounded-t-3xl border-t border-brand-100 bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl md:hidden animate-[slideUp_0.25s_ease-out]"
              >
                <div className="mx-auto mb-3 h-1.5 w-10 shrink-0 rounded-full bg-brand-200" />
                <p className="shrink-0 px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-brand-500">
                  Choose your language
                </p>
                <div className="grid grid-cols-2 gap-2 overflow-y-auto overscroll-contain touch-pan-y">
                  {LANGUAGES.map((l) => (
                    <LanguageButton
                      key={l.code}
                      lang={l}
                      active={l.code === language}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              </div>
            </>,
            document.body,
          )
        : null}

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

function LanguageButton({
  lang,
  active,
  onSelect,
}: {
  lang: (typeof LANGUAGES)[number];
  active: boolean;
  onSelect: (code: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(lang.code)}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition active:scale-[0.98] ${
        active
          ? "bg-brand-50 text-brand-900 ring-1 ring-brand-300"
          : "text-brand-700 hover:bg-brand-50 hover:text-brand-900"
      }`}
    >
      <span className="text-lg leading-none">{lang.flag}</span>
      <span className="flex-1 font-medium">{lang.label}</span>
      {active ? (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-brand-400">
          <path
            d="m5 12 5 5L20 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </button>
  );
}
