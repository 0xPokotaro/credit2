"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSkeleton } from "@/components/common/loading-skeleton";
import { Step4DetailDialog } from "./step-4-detail-dialog";
import { useGetCreditDetails } from "./_hooks/use-get-credit-details";
import { useWalletStore } from "@/lib/stores/wallet-store";
import { WarningIcon } from "@/components/icons";

interface Step4CreditRankProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function Step4CreditRank({ onNext, onPrevious }: Step4CreditRankProps) {
  const { address } = useWalletStore();
  const { data, isLoading } = useGetCreditDetails(address);

  const progressPercentage = data
    ? (data.overallScore / data.maxScore) * 100
    : 0;

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
              4
            </span>
            Overall Credit Rank
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingSkeleton variant="credit-score" />
          ) : (
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {data?.overallRank}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Overall Credit Rank
              </h2>
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {data?.overallScore}
              </div>
              <div className="text-lg text-gray-600 mb-2">
                out of {data?.maxScore}
              </div>
              <div className="w-32 h-2 bg-blue-200 rounded-full mx-auto mb-4">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-gray-600">
                Excellent creditworthiness with high reliability indicators
              </p>
            </div>
          )}

          {isLoading ? (
            <LoadingSkeleton variant="credit-cards" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Credit 1.0 (Traditional)
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      $ Income Verification
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {data?.credit1_0.incomeVerification.score}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Employment History
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {data?.credit1_0.employmentHistory.score}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Asset Ownership
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {data?.credit1_0.assetOwnership.score}/100
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Credit 2.0 (Enhanced)
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      SNS Reliability
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {data?.credit2_0.snsReliability.score}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      On-chain History
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {data?.credit2_0.onchainHistory.score}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Side Jobs & Skills
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {data?.credit2_0.sideJobsSkills.score}/100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <LoadingSkeleton variant="risk-alert" />
          ) : (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <WarningIcon size={12} />
                </div>
                <h4 className="font-semibold text-gray-900">
                  Risk Alert Details
                </h4>
              </div>
              <div className="space-y-2">
                {data?.riskAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <WarningIcon size={8} />
                    </div>
                    <span className="text-sm text-gray-700">
                      {alert.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onPrevious}>
              Back
            </Button>
            <Step4DetailDialog />
            <Button onClick={onNext}>Proceed to Review</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
