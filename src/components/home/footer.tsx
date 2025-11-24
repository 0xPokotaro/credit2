"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="px-4 py-6 sm:px-6 sm:py-8 lg:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
            <a href="#" className="hover:text-blue-900 transition-colors">
              {t("termsOfService")}
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-blue-900 transition-colors">
              {t("privacyPolicy")}
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-blue-900 transition-colors">
              {t("contactUs")}
            </a>
          </div>
          <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-right">
            {t("copyright")}
          </div>
        </div>
      </div>

      {/* Help Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
        <button className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
