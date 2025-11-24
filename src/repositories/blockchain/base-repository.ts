import type { Transaction, Balance } from "@/types";

/**
 * ブロックチェーンデータ取得の基底インターフェース
 * 各チェーン用Repositoryはこのインターフェースを実装する
 */
export interface IBlockchainRepository {
  /**
   * 指定されたアドレスのトランザクション一覧を取得
   * @param address ウォレットアドレス
   * @returns トランザクション配列
   */
  getTransactions(address: string): Promise<Transaction[]>;

  /**
   * 指定されたアドレスの残高を取得
   * @param address ウォレットアドレス
   * @returns 残高情報
   */
  getBalance(address: string): Promise<Balance>;
}
