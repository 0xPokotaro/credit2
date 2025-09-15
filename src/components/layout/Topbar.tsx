import Link from "next/link";

export function Topbar() {
  return (
    <div className="relative flex justify-center items-center p-4 h-16 border-b bg-white">
      <div className="absolute left-4 lg:left-20 flex items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold text-blue-900">CREDIT 2.0</h1>
        </Link>
      </div>
      <div className="absolute right-4 lg:right-20 flex items-center gap-6 text-sm text-gray-600">
        <a href="#" className="hover:text-blue-900 transition-colors">FAQ</a>
        <a href="#" className="hover:text-blue-900 transition-colors">SUPPORT</a>
        <div className="flex items-center gap-1">
          <span>EN</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
          </svg>
        </div>
      </div>
    </div>
  );
}
