import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LanguageProvider from "@/components/LanguageProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.itlcoin.com"),
  title: "ITL Coin | Redeem ITL for USDT (BEP-20)",
  description:
    "Redeem your ITL tokens for BEP-20 USDT. Manually-verified payouts, a transparent fixed rate, and a fast 4-step process.",
  keywords: [
    "ITL Coin",
    "redeem ITL",
    "USDT",
    "BEP-20",
    "InterlinkChain",
    "token redemption",
  ],
  openGraph: {
    title: "ITL Coin | Redeem ITL for USDT (BEP-20)",
    description:
      "Redeem your ITL tokens for BEP-20 USDT. Manually-verified payouts, a transparent fixed rate, and a fast 4-step process.",
    type: "website",
    siteName: "ITL Coin",
  },
  twitter: {
    card: "summary_large_image",
    title: "ITL Coin | Redeem ITL for USDT (BEP-20)",
    description:
      "Redeem your ITL tokens for BEP-20 USDT. Manually-verified payouts, a transparent fixed rate, and a fast 4-step process.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} font-sans`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
