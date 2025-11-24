"use client";

import { WalletButton } from "./wallet-button";
import { LogoutConfirmDialog } from "./logout-confirm-dialog";
import type { Wallet } from "@/lib/constants/wallet-constants";

interface WalletTabContentProps {
  title: string;
  description: string;
  wallets: Wallet[];
  connectedWalletId?: string | null;
  address?: string | null;
  isLoading: boolean;
  showLogoutConfirm: string | null;
  onWalletClick: (wallet: Wallet) => void;
  onLogout: (walletId: string) => void;
  onCancelLogout: () => void;
}

export function WalletTabContent({
  title,
  description,
  wallets,
  connectedWalletId,
  address,
  isLoading,
  showLogoutConfirm,
  onWalletClick,
  onLogout,
  onCancelLogout,
}: WalletTabContentProps) {
  const isWalletConnected = (walletId: string) => {
    return connectedWalletId === walletId;
  };

  return (
    <div className="space-y-3 mt-6">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {wallets.map((wallet) => (
        <div key={wallet.id} className="relative">
          <WalletButton
            wallet={wallet}
            isConnected={isWalletConnected(wallet.id)}
            isLoading={isLoading}
            address={address}
            showLogoutConfirm={showLogoutConfirm === wallet.id}
            onClick={() =>
              showLogoutConfirm === wallet.id
                ? onLogout(wallet.id)
                : onWalletClick(wallet)
            }
          />
          {showLogoutConfirm === wallet.id && (
            <LogoutConfirmDialog
              walletName={wallet.name}
              onConfirm={() => onLogout(wallet.id)}
              onCancel={onCancelLogout}
            />
          )}
        </div>
      ))}
    </div>
  );
}
