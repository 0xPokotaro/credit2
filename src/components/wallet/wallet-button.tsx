"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Wallet } from "@/lib/constants/wallet-constants";

interface WalletButtonProps {
  wallet: Wallet;
  isConnected: boolean;
  isLoading: boolean;
  address?: string | null;
  showLogoutConfirm: boolean;
  onClick: () => void;
}

export function WalletButton({
  wallet,
  isConnected,
  isLoading,
  address,
  showLogoutConfirm,
  onClick,
}: WalletButtonProps) {
  const getButtonVariant = () => {
    if (isConnected) {
      return showLogoutConfirm ? "destructive" : "default";
    }
    return "outline";
  };

  const getButtonClassName = () => {
    const baseClass = "w-full h-auto p-4 justify-start disabled:opacity-50";

    if (isConnected) {
      if (showLogoutConfirm) {
        return `${baseClass} bg-red-100 text-red-800 hover:bg-red-200 border-red-300`;
      }
      return `${baseClass} bg-white text-green-900 hover:bg-gray-100 border-green-200`;
    }

    return `${baseClass} bg-white text-gray-900 hover:bg-gray-50 border-gray-200`;
  };

  return (
    <Button
      variant={getButtonVariant()}
      className={getButtonClassName()}
      onClick={onClick}
      disabled={isLoading}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">{wallet.icon}</div>
        <div className="text-left flex-1">
          <div className="font-medium text-gray-900 flex items-center gap-2">
            {wallet.name}
            {isConnected && (
              <Badge variant="secondary" className="text-xs">
                Connected
              </Badge>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {isConnected && address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : wallet.description}
          </div>
        </div>
        {isLoading && !isConnected && (
          <div className="ml-auto">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </Button>
  );
}
