"use client";

import { useState } from "react";
import {
  Step1BasicInformation,
  Step2AdditionalAuthentication,
  Step3DataConsent,
  Step4CreditRank,
  Step5Congratulations,
} from "@/components/setup";

export function SetupContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInformation
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 2:
        return (
          <Step2AdditionalAuthentication
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <Step3DataConsent onNext={handleNext} onPrevious={handlePrevious} />
        );
      case 4:
        return (
          <Step4CreditRank onNext={handleNext} onPrevious={handlePrevious} />
        );
      case 5:
        return (
          <Step5Congratulations
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      default:
        return (
          <Step1BasicInformation
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step Card */}
      {renderCurrentStep()}
    </div>
  );
}
