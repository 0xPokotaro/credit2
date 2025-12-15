"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { WalletDialog } from "@/components/ui/wallet-dialog";
import { useWalletStore } from "@/lib/stores/wallet-store";
import { useGetTransactions } from "./_hooks/use-get-transactions";
import { TransactionTable } from "./_components/transaction-table";
import {
  getWalletDisplayName,
  shortenAddress,
} from "@/lib/utils/wallet-display";

export function WalletExplorerContainer() {
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const { isConnected, address, walletType, chain } = useWalletStore();
  const {
    data: transactions,
    isLoading,
    isStale,
  } = useGetTransactions(address);

  const handleWalletSelect = (wallet: any) => {
    console.log("Wallet selected:", wallet);
  };

  const formatChainName = (chain: string) => {
    if (chain.startsWith("chain-")) {
      return chain.replace("chain-", "");
    }
    return chain;
  };

  useEffect(() => {
    console.log("transactions: ", transactions);
  }, [transactions]);

  useEffect(() => {
    console.log("isStale: ", isStale);
  }, [isStale]);

  return (
    <div className="px-4 py-8">
      {isConnected && chain && (
        <div className="mb-2 text-sm text-muted-foreground">
          Network: {formatChainName(chain)}
        </div>
      )}
      <Button onClick={() => setIsWalletDialogOpen(true)}>
        {isConnected && address
          ? `${getWalletDisplayName(walletType!)}: ${shortenAddress(address)}`
          : "Connect"}
      </Button>
      <WalletDialog
        open={isWalletDialogOpen}
        onOpenChange={setIsWalletDialogOpen}
        onWalletSelect={handleWalletSelect}
      />
      <TransactionTable
        transactions={transactions}
        isLoading={isLoading}
        isStale={isStale}
      />
    </div>
  );
}
