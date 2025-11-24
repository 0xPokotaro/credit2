"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWalletStore } from "@/lib/stores/wallet-store";
import { walletManager } from "@/lib/wallets/wallet-utils";
import { useEffect, useState } from "react";
import { WalletTabContent } from "@/components/wallet/wallet-tab-content";
import {
  EVM_WALLETS,
  XRP_WALLETS,
  SUI_WALLETS,
  type Wallet,
} from "@/lib/constants/wallet-constants";

// Re-export Wallet type for backwards compatibility
export type { Wallet };

interface WalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWalletSelect: (wallet: Wallet) => void;
}

export function WalletDialog({
  open,
  onOpenChange,
  onWalletSelect,
}: WalletDialogProps) {
  const { isLoading, error, clearError, isConnected, walletType, address } =
    useWalletStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (open) {
      clearError();
      setShowLogoutConfirm(null);
    }
  }, [open, clearError]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showLogoutConfirm &&
        !(event.target as Element).closest("[data-logout-confirm]")
      ) {
        setShowLogoutConfirm(null);
      }
    };

    if (showLogoutConfirm) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showLogoutConfirm]);

  const handleWalletClick = async (wallet: Wallet) => {
    const isCurrentlyConnected = isConnected && walletType === wallet.id;

    if (isCurrentlyConnected) {
      setShowLogoutConfirm(wallet.id);
      return;
    }

    try {
      if (wallet.id === "xaman") {
        await walletManager.connectXaman();
      } else if (wallet.id === "metamask") {
        await walletManager.connectMetaMask();
      } else if (wallet.id === "sui") {
        await walletManager.connectSui();
      }

      onWalletSelect(wallet);
      onOpenChange(false);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const handleLogout = async (walletId: string) => {
    try {
      await walletManager.disconnectWallet();
      setShowLogoutConfirm(null);
      onOpenChange(false);
    } catch (error) {
      console.error("Wallet logout failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">Connect Web3 Wallet</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Tabs defaultValue="xrp" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="xrp">XRP Ledger</TabsTrigger>
            <TabsTrigger value="evm">EVM</TabsTrigger>
            <TabsTrigger value="sui">Sui</TabsTrigger>
          </TabsList>

          <TabsContent value="evm">
            <WalletTabContent
              title="Ethereum Virtual Machine"
              description="Connect to Ethereum and EVM-compatible chains"
              wallets={EVM_WALLETS}
              connectedWalletId={isConnected ? walletType : undefined}
              address={address}
              isLoading={isLoading}
              showLogoutConfirm={showLogoutConfirm}
              onWalletClick={handleWalletClick}
              onLogout={handleLogout}
              onCancelLogout={() => setShowLogoutConfirm(null)}
            />
          </TabsContent>

          <TabsContent value="xrp">
            <WalletTabContent
              title="XRP Ledger"
              description="Connect to the XRP Ledger network"
              wallets={XRP_WALLETS}
              connectedWalletId={isConnected ? walletType : undefined}
              address={address}
              isLoading={isLoading}
              showLogoutConfirm={showLogoutConfirm}
              onWalletClick={handleWalletClick}
              onLogout={handleLogout}
              onCancelLogout={() => setShowLogoutConfirm(null)}
            />
          </TabsContent>

          <TabsContent value="sui">
            <WalletTabContent
              title="Sui Blockchain"
              description="Connect to the Sui blockchain network"
              wallets={SUI_WALLETS}
              connectedWalletId={isConnected ? walletType : undefined}
              address={address}
              isLoading={isLoading}
              showLogoutConfirm={showLogoutConfirm}
              onWalletClick={handleWalletClick}
              onLogout={handleLogout}
              onCancelLogout={() => setShowLogoutConfirm(null)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
