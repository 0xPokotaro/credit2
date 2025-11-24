"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GiftIcon, CheckmarkIcon, WarningIcon } from "@/components/icons";

interface Step5CongratulationsProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function Step5Congratulations({
  onNext,
  onPrevious,
}: Step5CongratulationsProps) {
  return (
    <div className="space-y-6">
      <Card className="mb-6 bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-800">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <GiftIcon size={20} />
            </div>
            Congratulations! You are eligible to use this service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 mb-6">
            Based on your excellent Credit 2.0 score, you qualify for premium
            benefits
          </p>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-gray-900 mb-3">
              Your Premium Benefits:
            </h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <CheckmarkIcon className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">
                  0% deposit requirement
                </span>
              </div>
              <div className="flex items-center">
                <CheckmarkIcon className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">
                  Priority customer support
                </span>
              </div>
              <div className="flex items-center">
                <CheckmarkIcon className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">
                  Enhanced credit limits
                </span>
              </div>
              <div className="flex items-center">
                <CheckmarkIcon className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">
                  Exclusive partner benefits
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Comprehensive Score Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Overall Credit Score
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  785/900
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Traditional Credit (1.0)
                </span>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                  78/100
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Enhanced Credit (2.0)
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  87/100
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Risk Assessment</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  Low Risk
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <CheckmarkIcon size={16} className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">
                  Identity verification completed
                </span>
              </div>
              <div className="flex items-center">
                <CheckmarkIcon size={16} className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">
                  Data processing via ZKP security
                </span>
              </div>
              <div className="flex items-center">
                <CheckmarkIcon size={16} className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">
                  Multi-source assessment completed
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
              <WarningIcon size={12} />
            </div>
            Risk Assessment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-800 text-sm">
            Minor volatility detected in trading patterns. Monitoring
            recommended for future assessments.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button variant="outline">Save Results</Button>
        <Button onClick={onNext}>Go to My Page</Button>
      </div>
    </div>
  );
}
