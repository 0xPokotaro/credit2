import { Avalanche } from "@avalanche-sdk/chainkit";
import type { Transaction, Balance } from "@/types";
import type { IBlockchainRepository } from "./base-repository";
import { formatTimestamp } from "@/utils/datetime";
import { getAvalancheConfig } from "@/config/chains";
import { serverEnv } from "@/config/env.server";

/**
 * Avalancheチェーン用のRepository実装
 */
export class AvalancheRepository implements IBlockchainRepository {
  private avalanche: Avalanche;
  private config = getAvalancheConfig();

  constructor() {
    this.avalanche = new Avalanche({
      apiKey: serverEnv.AVALANCHE_API_KEY,
      chainId: this.config.chainId,
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
        chainName: this.config.name,
        blockNumber: tx.blockNumber,
        timestamp: formatTimestamp(tx.blockTimestamp),
        txHash: tx.txHash,
        from: tx.from.address,
        to: tx.to.address,
        value: tx.value,
        fee: fee.toString(),
        symbol: this.config.nativeTokenSymbol,
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
      chainName: this.config.name,
      tokenSymbol: this.config.nativeTokenSymbol,
      balance: balanceWei,
      balanceJPY: 0,
      decimals: this.config.nativeTokenDecimals,
    };
  }

  /**
   * AvalancheのERC20残高一覧を取得
   * 登録されているコントラクトアドレスの残高のみを取得
   */
  async getErc20Balances(address: string): Promise<Balance[]> {
    // 登録されているコントラクトアドレスのリストを取得
    const registeredAddresses = Object.values(
      this.config.contractAddresses || {},
    )
      .filter((addr): addr is string => addr !== undefined)
      .map((addr) => addr.toLowerCase());

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
          chainName: this.config.name,
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
    // 登録されているコントラクトアドレスのリストを取得
    const registeredAddresses = Object.values(
      this.config.contractAddresses || {},
    )
      .filter((addr): addr is string => addr !== undefined)
      .map((addr) => addr.toLowerCase());

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
          chainName: this.config.name,
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
