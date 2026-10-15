"use client";

import { useState } from "react";
import WalletHeader, { type WalletTab } from "@/components/wallet/WalletHeader";
import WalletSelector from "@/components/wallet/WalletSelector";
import TotalBalance from "@/components/wallet/TotalBalance";
import QuickActions from "@/components/wallet/QuickActions";
import PredictBTCCard from "@/components/wallet/PredictBTCCard";
import TokenList from "@/components/wallet/TokenList";
import BusinessVaults from "@/components/wallet/BusinessVaults";
import BottomNav from "@/components/wallet/BottomNav";
import WalletBottomSheet from "@/components/wallet/WalletBottomSheet";
import AppTabContent from "@/components/wallet/AppTabContent";

export default function WalletPage() {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<WalletTab>("wallet");

  const handleSelect = (key: string, label: string) => {
    if (key === "home") {
      setActiveSheet(null);
      return;
    }
    setActiveSheet(label);
  };

  const handleTabChange = (tab: WalletTab) => {
    setActiveTab(tab);
    setActiveSheet(null);
  };

  const handleSheetClose = () => {
    setActiveSheet(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#D8D0F0] py-0 sm:py-10">
      <div className="mx-auto w-full max-w-[420px] overflow-hidden bg-cta-gradient shadow-2xl sm:rounded-[2.5rem] sm:ring-1 sm:ring-black/5">
        <WalletHeader activeTab={activeTab} onTabChange={handleTabChange} />
        {activeTab === "wallet" ? (
          <>
            <WalletSelector />
            <TotalBalance />
            <QuickActions onAction={(label) => setActiveSheet(label)} />
            <PredictBTCCard />
            <TokenList />
            <BusinessVaults />
            <div className="h-40 bg-cta-gradient" />
          </>
        ) : (
          <AppTabContent />
        )}
      </div>
      <BottomNav onSelect={handleSelect} />
      <WalletBottomSheet
        title={activeSheet ?? ""}
        open={activeSheet !== null}
        onClose={handleSheetClose}
      />
    </div>
  );
}
