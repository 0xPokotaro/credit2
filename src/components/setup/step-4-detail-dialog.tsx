"use client";

import { useEffect, useState } from "react";
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

export function Step4DetailDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { address } = useWalletStore();
  const { data, isLoading } = useGetCreditDetails(address);

  const balances = data?.onchain?.balances || [];
  const transactions = data?.onchain?.transactions || [];

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-7xl">
        <DialogTitle>Credit Details</DialogTitle>
        <DialogDescription>Credit Details</DialogDescription>
        {isLoading ? (
          <LoadingSkeleton variant="dialog-tabs" />
        ) : (
          <Tabs defaultValue="onchain" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="onchain">On-chain</TabsTrigger>
            </TabsList>
            <TabsContent value="onchain" className="space-y-4">
              {/* ヘッダー */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <Card className="col-span-1">
                  <CardContent>
                    <CardTitle className="pb-4">総残高</CardTitle>
                    <p className="text-4xl">100,000</p>
                  </CardContent>
                </Card>
                <Card className="col-span-1">
                  <CardContent>
                    <CardTitle className="pb-4">総残高</CardTitle>
                    <p className="text-4xl">100,000</p>
                  </CardContent>
                </Card>
                <Card className="col-span-1">
                  <CardContent>
                    <CardTitle className="pb-4">総残高</CardTitle>
                    <p className="text-4xl">100,000</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardContent>
                    <CardTitle className="pb-4">Balances</CardTitle>
                    <BalanceListTable balances={balances} />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <CardTitle className="pb-4">Transactions</CardTitle>
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
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
