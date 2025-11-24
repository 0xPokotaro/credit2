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

export function BalanceListTable({ balances }: BalanceListTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Chain Name</TableHead>
          <TableHead>Token Symbol</TableHead>
          <TableHead>Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {balances.map((balance) => (
          <TableRow key={`${balance.chainName}-${balance.tokenSymbol}`}>
            <TableCell>{balance.chainName}</TableCell>
            <TableCell>{balance.tokenSymbol}</TableCell>
            <TableCell>
              {formatValue(balance.balance, balance.decimals || 18)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
