import type { Transaction, Balance } from "@/types";
import { AvalancheRepository } from "@/repositories/blockchain/avalanche-repository";
import type { IBlockchainRepository } from "@/repositories/blockchain/base-repository";

/**
 * ブロックチェーンデータ取得サービス
 * 複数チェーンのデータを統合して提供する
 */
export class BlockchainService {
  private repositories: IBlockchainRepository[];

  constructor() {
    this.repositories = [
      new AvalancheRepository(),
      // 将来的に new EthereumRepository(), new SuiRepository() などを追加
    ];
  }

  /**
   * 指定されたアドレスのトランザクション一覧を取得（全チェーン）
   * @param address ウォレットアドレス
   * @returns 全チェーンのトランザクション配列
   */
  async getTransactions(address: string): Promise<Transaction[]> {
    const results = await Promise.allSettled(
      this.repositories.map((repo) => repo.getTransactions(address)),
    );

    const transactions: Transaction[] = [];
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

    return transactions;
  }

  /**
   * 指定されたアドレスの残高一覧を取得（全チェーン）
   * @param address ウォレットアドレス
   * @returns 全チェーンの残高配列
   */
  async getBalances(address: string): Promise<Balance[]> {
    const results = await Promise.allSettled(
      this.repositories.map((repo) => repo.getBalance(address)),
    );

    const balances: Balance[] = [];
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

    return balances;
  }
}
