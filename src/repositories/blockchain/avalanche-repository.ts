import { Avalanche } from "@avalanche-sdk/chainkit";
import type { Transaction, Balance } from "@/types";
import type { IBlockchainRepository } from "./base-repository";
import { formatTimestamp } from "@/utils/datetime";
import { getAvalancheConfig } from "@/constants/blockchain";

/**
 * Avalancheチェーン用のRepository実装
 */
export class AvalancheRepository implements IBlockchainRepository {
  private avalanche: Avalanche;

  constructor() {
    const config = getAvalancheConfig();
    this.avalanche = new Avalanche({
      apiKey: process.env.AVALANCHE_API_KEY,
      chainId: config.chainId,
    });
  }

  /**
   * Avalancheのトランザクション一覧を取得
   */
  async getTransactions(address: string): Promise<Transaction[]> {
    const result =
      await this.avalanche.data.evm.address.transactions.listNative({
        address: address,
      });

    const transactions: Transaction[] = [];
    for (const tx of result.result.transactions) {
      const fee = BigInt(tx.gasUsed) * BigInt(tx.gasPrice);

      transactions.push({
        chainName: "Avalanche C-Chain",
        blockNumber: tx.blockNumber,
        timestamp: formatTimestamp(tx.blockTimestamp),
        txHash: tx.txHash,
        from: tx.from.address,
        to: tx.to.address,
        value: tx.value,
        fee: fee.toString(),
        symbol: "AVAX",
      });
    }

    return transactions;
  }

  /**
   * Avalancheの残高を取得
   */
  async getBalance(address: string): Promise<Balance> {
    const result = await this.avalanche.data.evm.address.balances.getNative({
      address: address,
    });

    const balanceWei = result.nativeTokenBalance.balance || "0";

    // JPY換算（1 AVAX = 50,000 JPY と仮定、実際のレート取得が必要な場合は外部APIを使用）
    const balanceJPY = (Number(balanceWei) / 1e18) * 50000;

    return {
      chainName: "Avalanche C-Chain",
      tokenSymbol: "AVAX",
      balance: balanceWei,
      balanceJPY: Math.floor(balanceJPY),
    };
  }
}
