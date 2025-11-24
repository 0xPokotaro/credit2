import type { CreditScore } from "@/types";

export async function GET() {
  // デモ用の固定値を返す
  const creditScore: CreditScore = {
    overallRank: "A",
    overallScore: 785,
    maxScore: 900,
    credit1_0: {
      incomeVerification: 85,
      employmentHistory: 78,
      assetOwnership: 72,
    },
    credit2_0: {
      snsReliability: 89,
      onchainHistory: 82,
      sideJobsSkills: 91,
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

  return new Response(JSON.stringify(creditScore), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
