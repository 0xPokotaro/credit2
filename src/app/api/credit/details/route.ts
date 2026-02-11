import type { CreditDetails, Transaction, Balance } from "@/types";
import { BlockchainService } from "@/services/blockchain/blockchain-service";
import { isEvmAddress, isXrplAddress } from "@/utils/address";

const blockchainService = new BlockchainService();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("evm_address");

  let balances: Balance[] = [];
  let transactions: Transaction[] = [];

  if (address && (isEvmAddress(address) || isXrplAddress(address))) {
    try {
      balances = await blockchainService.getBalances(address);
      transactions = await blockchainService.getTransactions(address);
    } catch (error) {
      console.error("Failed to get blockchain data:", error);
    }
  }

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
