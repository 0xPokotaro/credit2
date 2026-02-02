import type { Transaction, Balance } from "@/types";
import type { IBlockchainRepository } from "./base-repository";
import { formatIsoToTokyo } from "@/utils/datetime";

const XRPL_RPC_URL = "https://s1.ripple.com";
const CHAIN_NAME = "XRP Ledger";
const NATIVE_SYMBOL = "XRP";
const XRP_DECIMALS = 6;

/** RLUSD issuer (Ripple USD) */
const RLUSD_ISSUER = "rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De";
/** XRPL non-standard currency: 40-char hex for "RLUSD" (ASCII + zero padding) */
const RLUSD_CURRENCY_HEX = "524C555344000000000000000000000000000000";
/** Display symbol for RLUSD */
const RLUSD_CURRENCY = "RLUSD";

/** Ripple epoch: 2000-01-01 00:00:00 UTC in Unix seconds. Add to Ripple date (seconds) to get Unix timestamp. */
const RIPPLE_EPOCH_OFFSET = 946684800;

interface XrplRpcResponse<T> {
  result?: T;
  error?: string;
  status?: string;
}

interface AccountInfoResult {
  account_data?: { Balance?: string };
}

interface AccountTxTransaction {
  hash: string;
  ledger_index: number;
  close_time_iso?: string;
  tx_json?: {
    Account: string;
    Fee?: string;
    TransactionType?: string;
    Destination?: string;
    Amount?: string | { value: string; currency: string; issuer?: string };
  };
}

/** API may return tx (e.g. Clio) or tx_json; tx can have date as number (Unix) or string (ISO) */
interface AccountTxItem extends AccountTxTransaction {
  tx_json?: AccountTxTransaction["tx_json"];
  tx?: {
    Account?: string;
    Fee?: string;
    TransactionType?: string;
    Destination?: string;
    Amount?: XrplAmount;
    hash?: string;
    ledger_index?: number;
    date?: number | string;
  };
}

interface AccountTxResult {
  transactions?: AccountTxItem[];
}

type XrplAmount =
  | string
  | { value: string; currency: string; issuer?: string }
  | undefined;

/**
 * Decode XRPL 40-char hex currency code to ASCII string (trailing nulls removed).
 */
function decodeCurrencyHex(hex: string): string {
  if (hex.length !== 40 || !/^[0-9A-Fa-f]{40}$/.test(hex)) return hex;
  const bytes: number[] = [];
  for (let i = 0; i < 40; i += 2) {
    bytes.push(Number.parseInt(hex.slice(i, i + 2), 16));
  }
  const str = String.fromCharCode(...bytes);
  return str.replace(/\0+$/, "");
}

/**
 * Encode currency string to XRPL 40-char hex (20 bytes, zero-padded).
 */
function encodeCurrencyToHex(str: string): string {
  const bytes = new Uint8Array(20);
  const encoder = new TextEncoder();
  const encoded = encoder.encode(str);
  for (let i = 0; i < Math.min(encoded.length, 20); i++) {
    bytes[i] = encoded[i];
  }
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function isCurrencyRlusd(currency: string): boolean {
  if (currency === RLUSD_CURRENCY) return true;
  if (currency === RLUSD_CURRENCY_HEX) return true;
  if (currency.length === 40 && decodeCurrencyHex(currency) === RLUSD_CURRENCY)
    return true;
  return false;
}

function isRlusdAmount(
  amount: XrplAmount,
): amount is { value: string; currency: string; issuer?: string } {
  if (amount === undefined || typeof amount === "string") return false;
  if (typeof amount !== "object" || amount === null) return false;
  if (amount.issuer !== RLUSD_ISSUER) return false;
  return isCurrencyRlusd(amount.currency);
}

async function xrplRpc<T>(method: string, params: unknown[]): Promise<T> {
  const res = await fetch(XRPL_RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      method,
      params,
    }),
  });
  const data = (await res.json()) as XrplRpcResponse<T>;
  if (data.error || (data.status && data.status !== "success")) {
    throw new Error(data.error ?? "XRPL RPC error");
  }
  if (data.result === undefined) {
    throw new Error("XRPL RPC: no result");
  }
  return data.result;
}

function amountToValue(amount: XrplAmount): string {
  if (amount === undefined) return "0";
  if (typeof amount === "string") return amount;
  if (typeof amount === "object" && amount !== null && "value" in amount) {
    return String((amount as { value: string }).value);
  }
  return String(amount);
}

/**
 * XRPL（XRP Ledger）用Repository実装
 * 公開rippled API（account_info / account_tx）で残高・トランザクションを取得
 */
export class XrplRepository implements IBlockchainRepository {
  async getBalance(address: string): Promise<Balance> {
    try {
      const result = (await xrplRpc("account_info", [
        { account: address.trim(), ledger_index: "current" },
      ])) as AccountInfoResult;
      const balanceDrops = result.account_data?.Balance ?? "0";
      return {
        chainName: CHAIN_NAME,
        tokenSymbol: NATIVE_SYMBOL,
        balance: balanceDrops,
        balanceJPY: 0,
        decimals: XRP_DECIMALS,
      };
    } catch {
      return {
        chainName: CHAIN_NAME,
        tokenSymbol: NATIVE_SYMBOL,
        balance: "0",
        balanceJPY: 0,
        decimals: XRP_DECIMALS,
      };
    }
  }

  async getTransactions(address: string): Promise<Transaction[]> {
    try {
      const result = (await xrplRpc("account_tx", [
        {
          account: address.trim(),
          ledger_index_min: -1,
          ledger_index_max: -1,
          limit: 50,
          binary: false,
          forward: false,
        },
      ])) as AccountTxResult;

      const list = result.transactions ?? [];
      const transactions: Transaction[] = [];

      for (const item of list) {
        const txJson = item.tx ?? item.tx_json;

        const txType = txJson?.TransactionType ?? "";

        if (txType !== "Payment") {
          continue;
        }

        const from = txJson?.Account ?? "";
        const to =
          txJson?.TransactionType === "Payment" && txJson?.Destination
            ? txJson.Destination
            : "";
        const value = amountToValue(txJson?.Amount);
        const fee = txJson?.Fee ?? "0";
        const symbol = isRlusdAmount(txJson?.Amount)
          ? RLUSD_CURRENCY
          : NATIVE_SYMBOL;
        const dateVal = item.tx?.date ?? item.close_time_iso;
        const timestamp = dateVal
          ? typeof dateVal === "string"
            ? formatIsoToTokyo(dateVal)
            : formatIsoToTokyo(
                new Date(
                  ((dateVal as number) + RIPPLE_EPOCH_OFFSET) * 1000,
                ).toISOString(),
              )
          : "";

        transactions.push({
          chainName: CHAIN_NAME,
          blockNumber: String(item.ledger_index ?? 0),
          timestamp,
          // @ts-ignore
          txHash: item.tx.hash ?? "",
          from,
          to,
          value,
          fee,
          symbol,
        });
      }

      return transactions;
    } catch {
      return [];
    }
  }
}
