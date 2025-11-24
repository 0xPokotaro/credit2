"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { shortenAddress, getExplorerUrl } from "@/utils/string";
import type { Transaction } from "@/types";

interface DataTableProps {
  transactions?: Transaction[];
  isLoading: boolean;
  isStale: boolean;
}

// 最小単位から通常単位に変換（18桁で割る）
function formatValue(value: string): string {
  try {
    const bigIntValue = BigInt(value);
    const divisor = BigInt(10 ** 18);
    const wholePart = bigIntValue / divisor;
    const remainder = bigIntValue % divisor;

    if (remainder === BigInt(0)) {
      return wholePart.toString();
    }

    const decimalPart = remainder.toString().padStart(18, "0");
    const trimmedDecimal = decimalPart.replace(/0+$/, "");

    return `${wholePart.toString()}.${trimmedDecimal}`;
  } catch {
    return value;
  }
}

export function DataTable({
  transactions,
  isLoading,
  isStale,
}: DataTableProps) {
  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead>Chain Name</TableHead>
          <TableHead>Block Number</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Transaction Hash</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Fee</TableHead>
          <TableHead>Symbol</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ||
          (transactions === undefined && (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                <Spinner />
              </TableCell>
            </TableRow>
          ))}
        {!isLoading && !isStale && transactions && transactions.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={9}
              className="text-center text-muted-foreground"
            >
              No transactions found
            </TableCell>
          </TableRow>
        ) : (
          transactions?.map((tx, index) => (
            <TableRow key={tx.txHash || index}>
              <TableCell>{tx.chainName}</TableCell>
              <TableCell>{tx.blockNumber}</TableCell>
              <TableCell>{tx.timestamp}</TableCell>
              <TableCell>
                <a
                  href={getExplorerUrl(tx.chainName, tx.txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {shortenAddress(tx.txHash)}
                </a>
              </TableCell>
              <TableCell>{shortenAddress(tx.from)}</TableCell>
              <TableCell>{shortenAddress(tx.to)}</TableCell>
              <TableCell>{formatValue(tx.value)}</TableCell>
              <TableCell>{formatValue(tx.fee)}</TableCell>
              <TableCell>{tx.symbol}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
