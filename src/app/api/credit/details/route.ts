import type { CreditDetails, Transaction, Balance } from "@/types";
import { BlockchainService } from "@/services/blockchain/blockchain-service";

const blockchainService = new BlockchainService();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("evm_address");

  // デモ用の固定値（他のチェーン用）
  const otherBalances: Balance[] = [
    {
      chainName: "Ethereum",
      tokenSymbol: "ETH",
      balance: "1000000000000000000", // 1 ETH
      balanceJPY: 350000, // 35万円
    },
    {
      chainName: "Polygon",
      tokenSymbol: "MATIC",
      balance: "5000000000000000000", // 5 MATIC
      balanceJPY: 50000, // 5万円
    },
    {
      chainName: "BSC",
      tokenSymbol: "BNB",
      balance: "1000000000000000000", // 1 BNB
      balanceJPY: 80000, // 8万円
    },
  ];

  // Avalancheの実データを取得（addressが指定されている場合）
  let avalancheBalances: Balance[] = [];
  let avalancheTransactions: Transaction[] = [];

  if (address) {
    try {
      avalancheBalances = await blockchainService.getBalances(address);
      avalancheTransactions = await blockchainService.getTransactions(address);
    } catch (error) {
      console.error("Failed to get Avalanche data:", error);
      // エラーが発生しても他のチェーンのデータは返す
    }
  }

  // 全チェーンのデータを統合
  const balances = [...otherBalances, ...avalancheBalances];
  const transactions = [...avalancheTransactions];

  const totalBalanceJPY = balances.reduce((sum, b) => sum + b.balanceJPY, 0);

  // 分析データの計算
  const totalTransactions = transactions.length;
  const averageTransactionValue =
    transactions.length > 0
      ? transactions.reduce((sum, tx) => sum + Number(tx.value), 0) /
        transactions.length
      : 0;

  const creditDetails: CreditDetails = {
    overallRank: "A",
    overallScore: 785,
    maxScore: 900,
    onchain: {
      score: 82,
      totalBalanceJPY,
      balances,
      transactions,
      analysis: {
        totalTransactions,
        averageTransactionValue: Math.floor(averageTransactionValue),
        transactionFrequency: "Regular",
        riskFactors: [],
      },
    },
    credit1_0: {
      incomeVerification: {
        score: 85,
        details: {
          verified: true,
          incomeRange: "$50,000 - $100,000",
        },
      },
      employmentHistory: {
        score: 78,
        details: {
          yearsOfExperience: 5,
          jobStability: "Stable",
        },
      },
      assetOwnership: {
        score: 72,
        details: {
          totalAssets: 50000,
          assetTypes: ["Savings", "Investments"],
        },
      },
    },
    credit2_0: {
      snsReliability: {
        score: 89,
        details: {
          postingFrequency: "Regular",
          engagementRate: 4.5,
          accountAge: 3,
        },
      },
      onchainHistory: {
        score: 82,
        details: {
          totalTransactions: 150,
          averageValue: 1000,
          activityScore: 8.2,
        },
      },
      sideJobsSkills: {
        score: 91,
        details: {
          verifiedSkills: 5,
          certifications: 2,
          portfolioScore: 9.1,
        },
      },
    },
    riskAlerts: [
      {
        id: "1",
        message: "High-frequency trading patterns detected in recent months",
      },
      {
        id: "2",
        message: "Inconsistent posting schedule on social platforms",
      },
    ],
  };

  return new Response(JSON.stringify(creditDetails), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
