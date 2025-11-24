/**
 * Unified transaction interface for multiple blockchain chains
 * This interface is designed to work with transactions from different chains
 * (e.g., Avalanche, Ethereum, Polygon, etc.)
 */
export interface Transaction {
  /** Chain identifier (e.g., 'Avalanche C-Chain', 'Ethereum Mainnet', 'Polygon') */
  chainName: string;

  /** Block number where the transaction was included */
  blockNumber: string;

  /** Formatted timestamp string in yyyy-mm-dd hh:ii:ss format (Asia/Tokyo timezone) */
  timestamp: string;

  /** Transaction hash (unique identifier) */
  txHash: string;

  /** Sender address */
  from: string;

  /** Recipient address */
  to: string;

  /** Transaction value in the smallest unit (e.g., wei for ETH, nAVAX for AVAX) */
  value: string;

  /** Transaction fee in the smallest unit */
  fee: string;

  /** Native token symbol (e.g., 'AVAX', 'ETH', 'MATIC') */
  symbol: string;
}

/**
 * Credit score response interface
 */
export interface CreditScore {
  overallRank: string;
  overallScore: number;
  maxScore: number;
  credit1_0: {
    incomeVerification: number;
    employmentHistory: number;
    assetOwnership: number;
  };
  credit2_0: {
    snsReliability: number;
    onchainHistory: number;
    sideJobsSkills: number;
  };
  riskAlerts: Array<{
    id: string;
    message: string;
  }>;
}

/**
 * Balance interface for multi-chain balance details
 */
export interface Balance {
  chainName: string;
  tokenSymbol: string;
  balance: string; // 最小単位
  balanceJPY: number; // JPY換算額
}

/**
 * Credit details response interface
 */
export interface CreditDetails {
  overallRank: string;
  overallScore: number;
  maxScore: number;
  onchain: {
    score: number;
    totalBalanceJPY: number; // 総残高(JPY)
    balances: Balance[]; // 残高詳細配列
    transactions: Transaction[];
    analysis: {
      totalTransactions: number;
      averageTransactionValue: number;
      transactionFrequency: string;
      riskFactors: string[];
    };
  };
  credit1_0: {
    incomeVerification: {
      score: number;
      details: Record<string, unknown>;
    };
    employmentHistory: {
      score: number;
      details: Record<string, unknown>;
    };
    assetOwnership: {
      score: number;
      details: Record<string, unknown>;
    };
  };
  credit2_0: {
    snsReliability: {
      score: number;
      details: Record<string, unknown>;
    };
    onchainHistory: {
      score: number;
      details: Record<string, unknown>;
    };
    sideJobsSkills: {
      score: number;
      details: Record<string, unknown>;
    };
  };
  riskAlerts: Array<{
    id: string;
    message: string;
  }>;
}
