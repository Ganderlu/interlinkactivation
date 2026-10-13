"use client";

import { useState } from "react";
import WalletHeader from "@/components/wallet/WalletHeader";
import WalletSelector from "@/components/wallet/WalletSelector";
import TotalBalance from "@/components/wallet/TotalBalance";
import QuickActions from "@/components/wallet/QuickActions";
import PredictBTCCard from "@/components/wallet/PredictBTCCard";
import TokenList from "@/components/wallet/TokenList";
import BusinessVaults from "@/components/wallet/BusinessVaults";
import BottomNav from "@/components/wallet/BottomNav";
import WalletBottomSheet from "@/components/wallet/WalletBottomSheet";

export default function WalletPage() {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  const handleSelect = (key: string, label: string) => {
    if (key === "home") {
      setActiveSheet(null);
      return;
    }
    setActiveSheet(label);
  };

  return (
    <div className="min-h-screen w-full bg-[#D8D0F0] py-0 sm:py-10">
      <div className="mx-auto w-full max-w-[420px] overflow-hidden bg-cta-gradient shadow-2xl sm:rounded-[2.5rem] sm:ring-1 sm:ring-black/5">
        <WalletHeader />
        <WalletSelector />
        <TotalBalance />
        <QuickActions onAction={(label) => setActiveSheet(label)} />
        <PredictBTCCard />
        <TokenList />
        <BusinessVaults />
        <div className="h-40 bg-cta-gradient" />
      </div>
      <BottomNav onSelect={handleSelect} />
      <WalletBottomSheet
        title={activeSheet ?? ""}
        open={activeSheet !== null}
        onClose={() => setActiveSheet(null)}
      />
    </div>
  );
}
