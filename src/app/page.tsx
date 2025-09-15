"use client";

import { useState } from "react";
import { WalletDialog } from "@/components/ui/wallet-dialog";
import { HeroSection, FeatureCards, StatsSection, Footer } from "@/components/home";

export default function Home() {
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);

  const handleWalletSelect = (wallet: any) => {
    console.log("Wallet selected:", wallet);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeatureCards />
      <StatsSection />
      <Footer />

      <WalletDialog
        open={isWalletDialogOpen}
        onOpenChange={setIsWalletDialogOpen}
        onWalletSelect={handleWalletSelect}
      />
    </div>
  );
}
