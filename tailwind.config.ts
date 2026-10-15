import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        neutral: {
          950: "#07070b",
        },
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(90deg, #6d28d9 0%, #8b5cf6 50%, #a78bfa 100%)",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.18), transparent 60%)",
        "cta-gradient":
          "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 50%, #a78bfa 100%)",
        "mining-grid":
          "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "mining-grid": "48px 48px",
      },
      boxShadow: {
        glow: "0 0 30px -8px rgba(139, 92, 246, 0.4)",
        "glow-strong": "0 0 50px 0 rgba(139, 92, 246, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
