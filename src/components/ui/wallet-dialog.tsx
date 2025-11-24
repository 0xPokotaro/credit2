"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useWalletStore } from "@/lib/stores/wallet-store";
import { walletManager } from "@/lib/wallets/wallet-utils";
import { useEffect, useState } from "react";

interface Wallet {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface WalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWalletSelect: (wallet: Wallet) => void;
}

const EVM_WALLETS: Wallet[] = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "The most popular Ethereum wallet",
    icon: (
      <Image
        src="/metamask.svg"
        alt="MetaMask Wallet"
        width={32}
        height={32}
        className="w-8 h-8 rounded"
      />
    ),
  },
];

const XRP_WALLETS: Wallet[] = [
  {
    id: "xaman",
    name: "Xaman",
    description: "Secure and trusted XRP Ledger wallet",
    icon: (
      <Image
        src="/xaman.png"
        alt="Xaman Wallet"
        width={32}
        height={32}
        className="w-8 h-8 rounded"
      />
    ),
  },
];

const SUI_WALLETS: Wallet[] = [
  {
    id: "sui",
    name: "Sui Wallet",
    description: "Official Sui blockchain wallet",
    icon: (
      <Image
        src="/sui.png"
        alt="Sui Wallet"
        width={32}
        height={32}
        className="w-8 h-8 rounded"
      />
    ),
  },
];

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

  // 確認ダイアログの外側をクリックした時に閉じる
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
    // Check if this wallet is currently connected
    const isCurrentlyConnected = isConnected && walletType === wallet.id;

    if (isCurrentlyConnected) {
      // Show logout confirmation
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
      // Error is handled by the store
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

  const isWalletConnected = (walletId: string) => {
    return isConnected && walletType === walletId;
  };

  const getWalletButtonText = (wallet: Wallet) => {
    if (isWalletConnected(wallet.id)) {
      return showLogoutConfirm === wallet.id ? "Confirm Logout" : "Connected";
    }
    return `Connect ${wallet.name}`;
  };

  const getWalletButtonVariant = (wallet: Wallet) => {
    if (isWalletConnected(wallet.id)) {
      return showLogoutConfirm === wallet.id ? "destructive" : "default";
    }
    return "outline";
  };

  const getWalletButtonClassName = (wallet: Wallet) => {
    const baseClass = "w-full h-auto p-4 justify-start disabled:opacity-50";

    if (isWalletConnected(wallet.id)) {
      if (showLogoutConfirm === wallet.id) {
        return `${baseClass} bg-red-100 text-red-800 hover:bg-red-200 border-red-300`;
      }
      return `${baseClass} bg-white text-green-900 hover:bg-gray-100 border-green-200`;
    }

    return `${baseClass} bg-white text-gray-900 hover:bg-gray-50 border-gray-200`;
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

          <TabsContent value="evm" className="space-y-3 mt-6">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Ethereum Virtual Machine
              </h3>
              <p className="text-sm text-gray-600">
                Connect to Ethereum and EVM-compatible chains
              </p>
            </div>
            {EVM_WALLETS.map((wallet) => (
              <div key={wallet.id} className="relative">
                <Button
                  variant={getWalletButtonVariant(wallet)}
                  className={getWalletButtonClassName(wallet)}
                  onClick={() =>
                    showLogoutConfirm === wallet.id
                      ? handleLogout(wallet.id)
                      : handleWalletClick(wallet)
                  }
                  disabled={isLoading}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">{wallet.icon}</div>
                    <div className="text-left flex-1">
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {wallet.name}
                        {isWalletConnected(wallet.id) && (
                          <Badge variant="secondary" className="text-xs">
                            Connected
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {isWalletConnected(wallet.id) && address
                          ? `${address.slice(0, 6)}...${address.slice(-4)}`
                          : wallet.description}
                      </div>
                    </div>
                    {isLoading && !isWalletConnected(wallet.id) && (
                      <div className="ml-auto">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                      </div>
                    )}
                  </div>
                </Button>
                {showLogoutConfirm === wallet.id && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 p-4 bg-white border-2 border-red-200 rounded-lg shadow-xl z-50"
                    onClick={(e) => e.stopPropagation()}
                    data-logout-confirm
                  >
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-red-700">
                        Are you sure you want to disconnect {wallet.name}?
                      </p>
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowLogoutConfirm(null);
                          }}
                          className="text-xs px-3 py-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLogout(wallet.id);
                          }}
                          className="text-xs px-3 py-1"
                        >
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="xrp" className="space-y-3 mt-6">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-gray-900 mb-1">XRP Ledger</h3>
              <p className="text-sm text-gray-600">
                Connect to the XRP Ledger network
              </p>
            </div>
            {XRP_WALLETS.map((wallet) => (
              <div key={wallet.id} className="relative">
                <Button
                  variant={getWalletButtonVariant(wallet)}
                  className={getWalletButtonClassName(wallet)}
                  onClick={() =>
                    showLogoutConfirm === wallet.id
                      ? handleLogout(wallet.id)
                      : handleWalletClick(wallet)
                  }
                  disabled={isLoading}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">{wallet.icon}</div>
                    <div className="text-left flex-1">
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {wallet.name}
                        {isWalletConnected(wallet.id) && (
                          <Badge variant="secondary" className="text-xs">
                            Connected
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {isWalletConnected(wallet.id) && address
                          ? `${address.slice(0, 6)}...${address.slice(-4)}`
                          : wallet.description}
                      </div>
                    </div>
                    {isLoading && !isWalletConnected(wallet.id) && (
                      <div className="ml-auto">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                      </div>
                    )}
                  </div>
                </Button>
                {showLogoutConfirm === wallet.id && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 p-4 bg-white border-2 border-red-200 rounded-lg shadow-xl z-50"
                    onClick={(e) => e.stopPropagation()}
                    data-logout-confirm
                  >
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-red-700">
                        Are you sure you want to disconnect {wallet.name}?
                      </p>
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowLogoutConfirm(null);
                          }}
                          className="text-xs px-3 py-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLogout(wallet.id);
                          }}
                          className="text-xs px-3 py-1"
                        >
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="sui" className="space-y-3 mt-6">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Sui Blockchain
              </h3>
              <p className="text-sm text-gray-600">
                Connect to the Sui blockchain network
              </p>
            </div>
            {SUI_WALLETS.map((wallet) => (
              <div key={wallet.id} className="relative">
                <Button
                  variant={getWalletButtonVariant(wallet)}
                  className={getWalletButtonClassName(wallet)}
                  onClick={() =>
                    showLogoutConfirm === wallet.id
                      ? handleLogout(wallet.id)
                      : handleWalletClick(wallet)
                  }
                  disabled={isLoading}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">{wallet.icon}</div>
                    <div className="text-left flex-1">
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {wallet.name}
                        {isWalletConnected(wallet.id) && (
                          <Badge variant="secondary" className="text-xs">
                            Connected
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {isWalletConnected(wallet.id) && address
                          ? `${address.slice(0, 6)}...${address.slice(-4)}`
                          : wallet.description}
                      </div>
                    </div>
                    {isLoading && !isWalletConnected(wallet.id) && (
                      <div className="ml-auto">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                      </div>
                    )}
                  </div>
                </Button>
                {showLogoutConfirm === wallet.id && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 p-4 bg-white border-2 border-red-200 rounded-lg shadow-xl z-50"
                    onClick={(e) => e.stopPropagation()}
                    data-logout-confirm
                  >
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-red-700">
                        Are you sure you want to disconnect {wallet.name}?
                      </p>
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowLogoutConfirm(null);
                          }}
                          className="text-xs px-3 py-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLogout(wallet.id);
                          }}
                          className="text-xs px-3 py-1"
                        >
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
