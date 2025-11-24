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

    return {
      chainName: "Avalanche C-Chain",
      tokenSymbol: "AVAX",
      balance: balanceWei,
      balanceJPY: 0,
      decimals: 18,
    };
  }

  /**
   * AvalancheのERC20残高一覧を取得
   * 登録されているコントラクトアドレスの残高のみを取得
   */
  async getErc20Balances(address: string): Promise<Balance[]> {
    const config = getAvalancheConfig();
    // 登録されているコントラクトアドレスのリストを取得
    const registeredAddresses = Object.values(
      config.contractAddresses || {},
    ).map((addr) => addr.toLowerCase());

    const result = await this.avalanche.data.evm.address.balances.listErc20({
      address: address,
    });

    const balances: Balance[] = [];
    for await (const page of result) {
      // ページの構造を確認: page.result.erc20TokenBalances または page.erc20TokenBalances
      const pageData = page as unknown as {
        result?: { erc20TokenBalances?: unknown[] };
        erc20TokenBalances?: unknown[];
      };
      const pageBalances =
        pageData.result?.erc20TokenBalances ||
        pageData.erc20TokenBalances ||
        [];

      for (const balance of pageBalances as Array<{
        address: string;
        symbol: string;
        decimals: number;
        balance: string;
      }>) {
        // 登録されているコントラクトアドレスのみをフィルタリング
        const tokenAddress = balance.address.toLowerCase();
        if (!registeredAddresses.includes(tokenAddress)) {
          continue;
        }

        balances.push({
          chainName: "Avalanche C-Chain",
          tokenSymbol: balance.symbol,
          balance: balance.balance,
          balanceJPY: 0,
          decimals: balance.decimals,
        });
      }
    }

    return balances;
  }

  /**
   * AvalancheのERC20トランザクション一覧を取得
   * 登録されているコントラクトアドレスのトランザクションのみを取得
   */
  async getErc20Transactions(
    address: string,
    startBlock?: number,
    endBlock?: number,
    pageSize: number = 10,
  ): Promise<Transaction[]> {
    const config = getAvalancheConfig();
    // 登録されているコントラクトアドレスのリストを取得
    const registeredAddresses = Object.values(
      config.contractAddresses || {},
    ).map((addr) => addr.toLowerCase());

    const result = await this.avalanche.data.evm.address.transactions.listErc20(
      {
        address: address,
        startBlock,
        endBlock,
        pageSize,
      },
    );

    const transactions: Transaction[] = [];
    for await (const page of result) {
      // ページの構造を確認: page.result.transactions または page.transactions
      const pageData = page as unknown as {
        result?: { transactions: unknown[] };
        transactions?: unknown[];
      };
      const pageTransactions =
        pageData.result?.transactions || pageData.transactions || [];

      for (const tx of pageTransactions as Array<{
        blockNumber: string;
        blockTimestamp: number;
        txHash: string;
        from: { address: string };
        to: { address: string };
        value: string;
        erc20Token: { symbol: string; address: string; decimals: number };
      }>) {
        // 登録されているコントラクトアドレスのみをフィルタリング
        const tokenAddress = tx.erc20Token.address.toLowerCase();
        if (!registeredAddresses.includes(tokenAddress)) {
          continue;
        }

        transactions.push({
          chainName: "Avalanche C-Chain",
          blockNumber: tx.blockNumber,
          timestamp: formatTimestamp(tx.blockTimestamp),
          txHash: tx.txHash,
          from: tx.from.address,
          to: tx.to.address,
          value: tx.value,
          fee: "0", // ERC20トランザクションではfeeは取得できない
          symbol: tx.erc20Token.symbol,
          tokenContractAddress: tx.erc20Token.address,
          tokenDecimals: tx.erc20Token.decimals,
        });
      }
    }

    return transactions;
  }
}
