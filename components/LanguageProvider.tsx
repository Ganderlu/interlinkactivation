"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Languages offered in the selector.
 * `code` is the Google Translate language code used by the widget's combo box.
 */
export interface LanguageOption {
  code: string; // Google Translate code (e.g. "en", "es", "ar")
  label: string; // Native name shown in the selector
  flag: string; // Emoji flag for a polished look
  rtl?: boolean;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "zh-CN", label: "简体中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦", rtl: true },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  // --- Extended set ---
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "da", label: "Dansk", flag: "🇩🇰" },
  { code: "no", label: "Norsk", flag: "🇳🇴" },
  { code: "fi", label: "Suomi", flag: "🇫🇮" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "cs", label: "Čeština", flag: "🇨🇿" },
  { code: "sk", label: "Slovenčina", flag: "🇸🇰" },
  { code: "hu", label: "Magyar", flag: "🇭🇺" },
  { code: "ro", label: "Română", flag: "🇷🇴" },
  { code: "bg", label: "Български", flag: "🇧🇬" },
  { code: "el", label: "Ελληνικά", flag: "🇬🇷" },
  { code: "uk", label: "Українська", flag: "🇺🇦" },
  { code: "iw", label: "עברית", flag: "🇮🇱", rtl: true },
  { code: "fa", label: "فارسی", flag: "🇮🇷", rtl: true },
  { code: "ur", label: "اردو", flag: "🇵🇰", rtl: true },
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ms", label: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "tl", label: "Filipino", flag: "🇵🇭" },
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
  { code: "te", label: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", label: "मराठी", flag: "🇮🇳" },
  { code: "gu", label: "ગુજરાતી", flag: "🇮🇳" },
  { code: "sw", label: "Kiswahili", flag: "🇰🇪" },
  { code: "ha", label: "Hausa", flag: "🇳🇬" },
  { code: "yo", label: "Yorùbá", flag: "🇳🇬" },
  { code: "ig", label: "Igbo", flag: "🇳🇬" },
  { code: "af", label: "Afrikaans", flag: "🇿🇦" },
  { code: "sr", label: "Српски", flag: "🇷🇸" },
  { code: "hr", label: "Hrvatski", flag: "🇭🇷" },
  { code: "lt", label: "Lietuvių", flag: "🇱🇹" },
  { code: "lv", label: "Latviešu", flag: "🇱🇻" },
  { code: "et", label: "Eesti", flag: "🇪🇪" },
  { code: "sl", label: "Slovenščina", flag: "🇸🇮" },
  { code: "ca", label: "Català", flag: "🇦🇩" },
  { code: "am", label: "አማርኛ", flag: "🇪🇹" },
  { code: "zu", label: "isiZulu", flag: "🇿🇦" },
];

const STORAGE_KEY = "itl_lang";

interface LanguageContextValue {
  language: string;
  setLanguage: (code: string) => void;
  isReady: boolean;
  isSwitching: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  isReady: false,
  isSwitching: false,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

function getStoredLanguage(): string {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGES.some((l) => l.code === stored)) return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

function setGoogtransCookie(lang: string) {
  // The widget reads this cookie to know the target language.
  // Format: /en/<target>  (source is auto / en)
  const value = lang === "en" ? "" : `/en/${lang}`;
  document.cookie = `googtrans=${value}; path=/; SameSite=Lax`;
  document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}; SameSite=Lax`;
}

function applyDirection(lang: string) {
  const opt = LANGUAGES.find((l) => l.code === lang);
  const dir = opt?.rtl ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lang);
}

declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (
          options: Record<string, unknown>,
          elementId: string,
        ) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] = useState<string>("en");
  const [isReady, setIsReady] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const scriptLoaded = useRef(false);

  // Load the Google Translate script once.
  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    const stored = getStoredLanguage();
    setLanguageState(stored);
    applyDirection(stored);

    window.googleTranslateElementInit = () => {
      try {
        // autoDisplay:false prevents the widget from showing its own dropdown.
        // The combo box is still created in the DOM (we hide it via CSS),
        // which lets us drive translation programmatically.
        new window.google!.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: LANGUAGES.map((l) => l.code).join(","),
            autoDisplay: false,
            multilanguagePage: true,
          },
          "google_translate_element",
        );
      } catch (err) {
        console.error("Failed to init Google Translate:", err);
      } finally {
        setIsReady(true);
      }
    };

    const existing = document.getElementById(
      "google-translate-script",
    ) as HTMLScriptElement | null;
    if (!existing) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onload = () => {
        // If the callback didn't fire for some reason, mark ready anyway.
        setTimeout(() => setIsReady(true), 400);
      };
      script.onerror = () => setIsReady(true);
      document.head.appendChild(script);
    } else {
      setIsReady(true);
    }
  }, []);

  // Apply persisted language on mount (after the widget is ready).
  useEffect(() => {
    if (!isReady) return;
    const stored = getStoredLanguage();
    if (stored !== "en") {
      // Defer to allow the widget's combo to be created.
      const t = window.setTimeout(() => triggerTranslate(stored), 300);
      return () => window.clearTimeout(t);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const triggerTranslate = useCallback((lang: string) => {
    const combo = document.querySelector<HTMLSelectElement>(
      "#google_translate_element select.goog-te-combo",
    );
    if (!combo) return false;
    // Only drive the combo when the widget actually exposes this language.
    // Otherwise fall back to a full reload (cookie-based translation).
    const hasOption = Array.from(combo.options).some((o) => o.value === lang);
    if (!hasOption) return false;
    combo.value = lang;
    combo.dispatchEvent(new Event("change"));
    return true;
  }, []);

  const setLanguage = useCallback(
    (code: string) => {
      if (code === language) return;
      setIsSwitching(true);
      setGoogtransCookie(code);
      applyDirection(code);
      setLanguageState(code);
      try {
        window.localStorage.setItem(STORAGE_KEY, code);
      } catch {
        /* ignore */
      }

      // Give the overlay a moment to fade in, then swap.
      window.setTimeout(() => {
        const ok = triggerTranslate(code);
        if (!ok) {
          // Fallback: reload so the widget re-initializes with the new cookie.
          window.location.reload();
          return;
        }
        // Allow translation to apply, then hide overlay.
        window.setTimeout(() => setIsSwitching(false), 900);
      }, 250);
    },
    [language, triggerTranslate],
  );

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, isReady, isSwitching }}
    >
      {/* Hidden container the widget renders its (hidden) combo box into */}
      <div id="google_translate_element" aria-hidden="true" />
      {children}
      {isSwitching ? (
        <div
          className="lang-switch-overlay is-visible"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-3 text-brand-900">
            <svg
              className="h-9 w-9 animate-spin text-brand-500"
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
            <span className="text-sm font-medium text-brand-700">
              Translating…
            </span>
          </div>
        </div>
      ) : null}
    </LanguageContext.Provider>
  );
}
