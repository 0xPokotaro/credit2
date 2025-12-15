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
import {
  shortenAddress,
  getExplorerUrl,
  getExplorerAddressUrl,
  getExplorerTokenUrl,
} from "@/utils/string";
import { useTranslations } from "next-intl";
import type { Transaction } from "@/types";

interface TransactionTableProps {
  transactions?: Transaction[];
  isLoading: boolean;
  isStale: boolean;
  address?: string | null;
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

export function TransactionTable({
  transactions,
  isLoading,
  isStale,
  address,
}: TransactionTableProps) {
  const t = useTranslations("TransactionTable");

  const displayAddress = (addr: string, chainName: string) => {
    if (address && addr.toLowerCase() === address.toLowerCase()) {
      return t("self");
    }
    return shortenAddress(addr);
  };

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
      return { value: `-${formatted}`, isPositive: false }; // 送金
    } else if (isToSelf) {
      return { value: `+${formatted}`, isPositive: true }; // 入金
    }
    return { value: formatted, isPositive: null }; // 関係ない取引
  };

  const displayFee = (fee: string, from: string) => {
    const isFromSelf = address && from.toLowerCase() === address.toLowerCase();
    if (!isFromSelf) {
      return null; // 自分が支払っていない場合は表示しない
    }
    const formattedFee = formatValue(fee);
    // feeが0の場合は半角-を返す
    if (formattedFee === "0") {
      return { value: "-", isPositive: false };
    }
    return { value: `-${formattedFee}`, isPositive: false }; // 自分が支払った手数料
  };

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
          <TableHead>Amount</TableHead>
          <TableHead>Fee</TableHead>
          <TableHead>Token</TableHead>
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
            <TableRow
              key={`${tx.txHash}-${tx.tokenContractAddress || "native"}-${index}`}
            >
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
              <TableCell>
                <a
                  href={getExplorerAddressUrl(tx.chainName, tx.from)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {displayAddress(tx.from, tx.chainName)}
                </a>
              </TableCell>
              <TableCell>
                <a
                  href={getExplorerAddressUrl(tx.chainName, tx.to)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {displayAddress(tx.to, tx.chainName)}
                </a>
              </TableCell>
              <TableCell>
                {(() => {
                  const { value, isPositive } = formatValueWithSign(
                    tx.value,
                    tx.from,
                    tx.to,
                    tx.tokenDecimals,
                  );
                  return (
                    <span
                      className={
                        isPositive === true
                          ? "text-green-600"
                          : isPositive === false
                            ? "text-red-600"
                            : ""
                      }
                    >
                      {value}
                    </span>
                  );
                })()}
              </TableCell>
              <TableCell>
                {(() => {
                  const feeData = displayFee(tx.fee, tx.from);
                  if (!feeData) {
                    return "-";
                  }
                  return <span className="text-red-600">{feeData.value}</span>;
                })()}
              </TableCell>
              <TableCell>
                {tx.tokenContractAddress ? (
                  <a
                    href={getExplorerTokenUrl(
                      tx.chainName,
                      tx.tokenContractAddress,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {tx.symbol}
                  </a>
                ) : (
                  tx.symbol
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
