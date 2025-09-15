"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <main className="px-6 py-12 lg:px-20 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Next-generation credit assessment
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-blue-900">A SAFE AND FAIR</span>
                <br />
                <span className="text-purple-600 relative">
                  SHARING EXPERIENCE
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-20 blur-sm"></div>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              With Credit 2.0, everyone can participate in a transparent and equitable financial ecosystem powered by advanced AI and blockchain technology.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 text-lg font-semibold rounded-lg">
                <Link href="/setup" className="flex items-center gap-2">
                  START APPLICATION
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </Button>
              <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50 px-8 py-3 text-lg font-semibold rounded-lg">
                LEARN HOW IT WORKS
              </Button>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Zero-knowledge proofs</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Blockchain verified</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">AI-powered assessment</span>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Rocket Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Phone */}
                  <div className="w-32 h-48 bg-gray-800 rounded-3xl p-2">
                    <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rocket */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-16 bg-gradient-to-b from-green-400 to-purple-500 rounded-t-full relative">
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gradient-to-r from-green-300 to-purple-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Smoke */}
                  <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-8 bg-white/60 rounded-full animate-pulse"></div>
                      <div className="w-2 h-6 bg-white/40 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-4 bg-white/20 rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Coins */}
              <div className="absolute top-8 right-8 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                B
              </div>
              <div className="absolute top-16 left-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                ETH
              </div>
              <div className="absolute bottom-20 right-12 w-6 h-6 bg-green-300 rounded-full"></div>
              <div className="absolute bottom-32 left-8 w-4 h-4 bg-purple-300 rounded-full"></div>
              
              {/* Background Elements */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-purple-200 rounded-full"></div>
              <div className="absolute top-12 right-16 w-3 h-3 bg-green-200 rounded-full"></div>
              <div className="absolute bottom-16 right-4 w-2 h-2 bg-purple-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
