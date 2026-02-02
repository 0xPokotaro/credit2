"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSkeleton } from "@/components/common/loading-skeleton";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useGetCreditDetails } from "./_hooks/use-get-credit-details";
import { BalanceListTable } from "@/components/tables/balance-list-table";
import { TransactionTable } from "@/app/wallet-explorer/_components/transaction-table";
import { useWalletStore } from "@/lib/stores/wallet-store";
import { Download } from "lucide-react";
import type { Balance, Transaction } from "@/types";

// 最小単位から通常単位に変換（decimalsで割る、デフォルトは18桁）
function formatValue(value: string, decimals: number = 18): string {
  try {
    const bigIntValue = BigInt(value);
    const divisor = BigInt(10 ** decimals);
    const wholePart = bigIntValue / divisor;
    const remainder = bigIntValue % divisor;

    if (remainder === BigInt(0)) {
      return wholePart.toString();
    }

    const decimalPart = remainder.toString().padStart(decimals, "0");
    const trimmedDecimal = decimalPart.replace(/0+$/, "");

    return `${wholePart.toString()}.${trimmedDecimal}`;
  } catch {
    return value;
  }
}

// CSVエクスポート用のヘルパー関数
function exportBalancesToCSV(balances: Balance[]) {
  const headers = ["Chain Name", "Token Symbol", "Balance"];
  const rows = balances.map((balance) => [
    balance.chainName,
    balance.tokenSymbol,
    formatValue(balance.balance, balance.decimals || 18),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `balances_${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportTransactionsToCSV(
  transactions: Transaction[],
  address?: string | null,
) {
  const headers = [
    "Chain Name",
    "Block Number",
    "Timestamp",
    "Transaction Hash",
    "From",
    "To",
    "Amount",
    "Fee",
    "Token",
  ];

  const formatValueWithSign = (
    value: string,
    from: string,
    to: string,
    decimals?: number,
  ) => {
    const formatted = formatValue(value, decimals);
    const isFromSelf = address && from.toLowerCase() === address.toLowerCase();
    const isToSelf = address && to.toLowerCase() === address.toLowerCase();

    if (isFromSelf && !isToSelf) {
      return `-${formatted}`; // 送金
    } else if (isToSelf) {
      return `+${formatted}`; // 入金
    }
    return formatted; // 関係ない取引
  };

  const displayFee = (fee: string, from: string) => {
    const isFromSelf = address && from.toLowerCase() === address.toLowerCase();
    if (!isFromSelf) {
      return "-"; // 自分が支払っていない場合は表示しない
    }
    const formattedFee = formatValue(fee);
    // feeが0の場合は半角-を返す
    if (formattedFee === "0") {
      return "-";
    }
    return `-${formattedFee}`; // 自分が支払った手数料
  };

  const rows = transactions.map((tx) => [
    tx.chainName,
    tx.blockNumber,
    tx.timestamp,
    tx.txHash,
    tx.from,
    tx.to,
    formatValueWithSign(tx.value, tx.from, tx.to, tx.tokenDecimals),
    displayFee(tx.fee, tx.from),
    tx.symbol,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `transactions_${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function Step4DetailDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { address } = useWalletStore();
  const { data, isLoading } = useGetCreditDetails(address);

  const balances = data?.onchain?.balances || [];
  const transactions = data?.onchain?.transactions || [];
  const totalBalanceUSD = 100000;
  const totalBalanceJPY = 15000000;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-7xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogTitle>Credit Details</DialogTitle>
        <DialogDescription>Credit Details</DialogDescription>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {isLoading ? (
            <LoadingSkeleton variant="dialog-tabs" />
          ) : (
            <Tabs defaultValue="onchain" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="onchain">On-chain</TabsTrigger>
                <TabsTrigger value="sns">SNS</TabsTrigger>
              </TabsList>
              <TabsContent value="onchain" className="space-y-4">
                {/* ヘッダー */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Card className="col-span-1">
                    <CardContent>
                      <CardTitle className="pb-4">総残高 USD</CardTitle>
                      <p className="text-4xl">
                        {totalBalanceUSD.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="col-span-1">
                    <CardContent>
                      <CardTitle className="pb-4">総残高 JPY</CardTitle>
                      <p className="text-4xl">
                        {totalBalanceJPY.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <Card>
                    <CardContent>
                      <div className="flex items-center justify-between pb-4">
                        <CardTitle>Balances</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => exportBalancesToCSV(balances)}
                          disabled={balances.length === 0}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download CSV
                        </Button>
                      </div>
                      <BalanceListTable balances={balances} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent>
                      <div className="flex items-center justify-between pb-4">
                        <CardTitle>Transactions</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            exportTransactionsToCSV(transactions, address)
                          }
                          disabled={transactions.length === 0}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download CSV
                        </Button>
                      </div>
                      <TransactionTable
                        transactions={transactions}
                        isLoading={isLoading}
                        isStale={false}
                        address={address}
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="sns" className="space-y-4">
                <div className="flex items-center justify-center py-12">
                  <p className="text-lg text-gray-600">開発中</p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
