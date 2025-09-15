"use client";

import { useEffect } from "react";
import { useWalletStore } from "@/lib/stores/wallet-store";
import { walletManager } from "@/lib/wallets/wallet-utils";

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { isConnected, walletType } = useWalletStore();

  useEffect(() => {
    // Setup event listeners when wallet is connected
    if (isConnected) {
      walletManager.setupEventListeners();
    }

    // Cleanup on unmount
    return () => {
      walletManager.cleanupEventListeners();
    };
  }, [isConnected, walletType]);

  return <>{children}</>;
}
