"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Step3DataConsentProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function Step3DataConsent({
  onNext,
  onPrevious,
}: Step3DataConsentProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
            3
          </span>
          Consent to Data Acquisition
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">
          Please review and consent to the types of data we'll analyze for your
          credit assessment.
        </p>

        <div className="space-y-4 mb-8">
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="sns-posting"
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <label htmlFor="sns-posting" className="block">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    SNS Posting Tendencies
                  </h4>
                  <p className="text-sm text-gray-600">
                    Analyze your social media posting patterns and engagement
                    behavior to assess communication reliability and social
                    presence.
                  </p>
                </label>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="onchain-history"
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <label htmlFor="onchain-history" className="block">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    On-chain History
                  </h4>
                  <p className="text-sm text-gray-600">
                    Review your blockchain transaction history and DeFi activity
                    to evaluate financial behavior and digital asset management.
                  </p>
                </label>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="did-verification"
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <label htmlFor="did-verification" className="block">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    DID Verification
                  </h4>
                  <p className="text-sm text-gray-600">
                    Verify your decentralized identity credentials and
                    reputation scores from verified identity providers.
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex items-center justify-center w-8 h-8 bg-cyan-500 rounded-lg mr-3 flex-shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-3">
                Zero-Knowledge Proof Security
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">•</span>
                  <span>
                    ZKP technology ensures your personal data is never stored or
                    exposed during processing
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">•</span>
                  <span>
                    Only mathematical proofs of your behavioral patterns are
                    generated, not raw data
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">•</span>
                  <span>
                    Your privacy is protected throughout the entire assessment
                    process
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onPrevious}>
            Back
          </Button>
          <Button onClick={onNext}>Agree & Proceed to Scoring</Button>
        </div>
      </CardContent>
    </Card>
  );
}
