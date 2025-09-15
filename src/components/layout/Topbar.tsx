"use client";

import Link from "next/link";
import { useState } from "react";

export function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative flex justify-center items-center p-4 h-16 border-b bg-white">
      <div className="absolute left-4 lg:left-20 flex items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-900">CREDIT 2.0</h1>
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex absolute right-4 lg:right-20 items-center gap-6 text-sm text-gray-600">
        <a href="#" className="hover:text-blue-900 transition-colors">FAQ</a>
        <a href="#" className="hover:text-blue-900 transition-colors">SUPPORT</a>
        <div className="flex items-center gap-1">
          <span>EN</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
          </svg>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden absolute right-4 p-2 text-gray-600 hover:text-blue-900 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50">
          <div className="px-4 py-4 space-y-4">
            <a 
              href="#" 
              className="block text-sm text-gray-600 hover:text-blue-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <a 
              href="#" 
              className="block text-sm text-gray-600 hover:text-blue-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              SUPPORT
            </a>
            <div className="flex items-center gap-1 pt-2 border-t">
              <span className="text-sm text-gray-600">EN</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
