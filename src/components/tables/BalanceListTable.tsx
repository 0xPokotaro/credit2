"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Balance } from "@/types";

interface BalanceListTableProps {
  balances: Balance[];
}

export function BalanceListTable({ balances }: BalanceListTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Chain Name</TableHead>
          <TableHead>Token Symbol</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Balance JPY</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {balances.map((balance) => (
          <TableRow key={balance.chainName}>
            <TableCell>{balance.chainName}</TableCell>
            <TableCell>{balance.tokenSymbol}</TableCell>
            <TableCell>{balance.balance}</TableCell>
            <TableCell>{balance.balanceJPY}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
