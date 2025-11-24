"use client";

import { useWalletStore } from "@/lib/stores/wallet-store";
import { walletManager } from "@/lib/wallets/wallet-utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Wallet } from "lucide-react";
import {
  getWalletDisplayName,
  getChainDisplayName,
  shortenAddress,
} from "@/lib/utils/wallet-display";

export function WalletStatus() {
  const { address, chain, walletType, isConnected, isLoading } =
    useWalletStore();

  const handleDisconnect = async () => {
    try {
      await walletManager.disconnectWallet();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <Wallet className="h-4 w-4" />
        <span className="text-sm">Not connected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <Wallet className="h-4 w-4 text-green-600" />
        <div className="text-sm">
          <div className="font-medium text-gray-900">
            {getWalletDisplayName(walletType!)}
          </div>
          <div className="text-gray-500">{shortenAddress(address!)}</div>
        </div>
      </div>

      <Badge variant="secondary" className="text-xs">
        {getChainDisplayName(chain!)}
      </Badge>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDisconnect}
        disabled={isLoading}
        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
