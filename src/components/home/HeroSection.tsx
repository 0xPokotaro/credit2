"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("HeroSection");

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-12 lg:px-20 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {t("tagline")}
            </div>

            {/* Main Headline */}
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-blue-900">{t("title1")}</span>
                <br />
                <span className="text-purple-600 relative">
                  {t("title2")}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-20 blur-sm"></div>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
              {t("description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                asChild
                className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 sm:px-8 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto"
              >
                <Link
                  href="/setup"
                  className="flex items-center justify-center gap-2"
                >
                  {t("startApplication")}
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-blue-900 text-blue-900 hover:bg-blue-50 px-6 py-3 sm:px-8 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto"
              >
                {t("learnHowItWorks")}
              </Button>
            </div>

            {/* Key Features */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-2 h-2 sm:w-3 sm:h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  {t("feature1")}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-2 h-2 sm:w-3 sm:h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  {t("feature2")}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-2 h-2 sm:w-3 sm:h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  {t("feature3")}
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Rocket Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Phone */}
                  <div className="w-24 h-36 sm:w-32 sm:h-48 bg-gray-800 rounded-2xl sm:rounded-3xl p-1.5 sm:p-2">
                    <div className="w-full h-full bg-black rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-purple-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 sm:w-12 sm:h-12 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Rocket */}
                  <div className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-12 sm:w-8 sm:h-16 bg-gradient-to-b from-green-400 to-purple-500 rounded-t-full relative">
                      <div className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-8 sm:w-12 h-3 sm:h-4 bg-gradient-to-r from-green-300 to-purple-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Smoke */}
                  <div className="absolute -top-16 sm:-top-20 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-0.5 sm:space-x-1">
                      <div className="w-1.5 h-6 sm:w-2 sm:h-8 bg-white/60 rounded-full animate-pulse"></div>
                      <div className="w-1.5 h-4 sm:w-2 sm:h-6 bg-white/40 rounded-full animate-pulse delay-100"></div>
                      <div className="w-1.5 h-3 sm:w-2 sm:h-4 bg-white/20 rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Coins */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 bg-green-400 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                B
              </div>
              <div className="absolute top-12 left-3 sm:top-16 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                ETH
              </div>
              <div className="absolute bottom-16 right-8 sm:bottom-20 sm:right-12 w-4 h-4 sm:w-6 sm:h-6 bg-green-300 rounded-full"></div>
              <div className="absolute bottom-24 left-6 sm:bottom-32 sm:left-8 w-3 h-3 sm:w-4 sm:h-4 bg-purple-300 rounded-full"></div>

              {/* Background Elements */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-200 rounded-full"></div>
              <div className="absolute top-8 right-12 sm:top-12 sm:right-16 w-2 h-2 sm:w-3 sm:h-3 bg-green-200 rounded-full"></div>
              <div className="absolute bottom-12 right-3 sm:bottom-16 sm:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
