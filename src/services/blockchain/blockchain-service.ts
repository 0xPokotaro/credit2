import type { Transaction, Balance } from "@/types";
import { AvalancheRepository } from "@/repositories/blockchain/avalanche-repository";
import { XrplRepository } from "@/repositories/blockchain/xrpl-repository";
import { isEvmAddress, isXrplAddress } from "@/utils/address";

/**
 * ブロックチェーンデータ取得サービス
 * アドレス種別に応じてEVM（Avalanche）またはXRPLのデータを取得する
 */
export class BlockchainService {
  private avalancheRepository: AvalancheRepository;
  private xrplRepository: XrplRepository;

  constructor() {
    this.avalancheRepository = new AvalancheRepository();
    this.xrplRepository = new XrplRepository();
  }

  /**
   * 指定されたアドレスのトランザクション一覧を取得
   * EVMアドレスの場合はAvalanche（+ERC20）、XRPLアドレスの場合はXRPLのみ
   */
  async getTransactions(address: string): Promise<Transaction[]> {
    const transactions: Transaction[] = [];

    if (isEvmAddress(address)) {
      const results = await Promise.allSettled([
        this.avalancheRepository.getTransactions(address),
      ]);
      for (const result of results) {
        if (result.status === "fulfilled") {
          transactions.push(...result.value);
        } else {
          console.error(
            "Failed to get transactions from a repository:",
            result.reason,
          );
        }
      }
      try {
        const erc20Transactions =
          await this.avalancheRepository.getErc20Transactions(address);
        transactions.push(...erc20Transactions);
      } catch (error) {
        console.error("Failed to get ERC20 transactions:", error);
      }
    } else if (isXrplAddress(address)) {
      try {
        const xrplTxs = await this.xrplRepository.getTransactions(address);
        transactions.push(...xrplTxs);
      } catch (error) {
        console.error(
          "Failed to get transactions from XRPL repository:",
          error,
        );
      }
    }

    transactions.sort((a, b) => {
      return Number(b.blockNumber) - Number(a.blockNumber);
    });

    return transactions;
  }

  /**
   * 指定されたアドレスの残高一覧を取得
   * EVMアドレスの場合はAvalanche（+ERC20）、XRPLアドレスの場合はXRPLのみ
   */
  async getBalances(address: string): Promise<Balance[]> {
    const balances: Balance[] = [];

    if (isEvmAddress(address)) {
      const results = await Promise.allSettled([
        this.avalancheRepository.getBalance(address),
      ]);
      for (const result of results) {
        if (result.status === "fulfilled") {
          balances.push(result.value);
        } else {
          console.error(
            "Failed to get balance from a repository:",
            result.reason,
          );
        }
      }
      try {
        const erc20Balances =
          await this.avalancheRepository.getErc20Balances(address);
        balances.push(...erc20Balances);
      } catch (error) {
        console.error("Failed to get ERC20 balances:", error);
      }
    } else if (isXrplAddress(address)) {
      try {
        const balance = await this.xrplRepository.getBalance(address);
        balances.push(balance);
      } catch (error) {
        console.error("Failed to get balance from XRPL repository:", error);
      }
    }

    return balances;
  }
}
