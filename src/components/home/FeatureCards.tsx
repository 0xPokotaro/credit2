export function FeatureCards() {
  return (
    <section className="px-6 py-16 lg:px-20 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Safety First Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-4">SAFETY FIRST</h3>
            <p className="text-gray-600 leading-relaxed">
              Your data is protected with advanced encryption and zero-knowledge proofs, ensuring maximum security throughout the process.
            </p>
          </div>

          {/* Fair Assessment Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 01-6.001 0M18 7l-3 9m3-9l-6-2m0 2l3 1m-3-1l-3 9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-4">FAIR ASSESSMENT</h3>
            <p className="text-gray-600 leading-relaxed">
              Our AI-driven assessment considers multiple data sources for a more comprehensive and equitable evaluation of your creditworthiness.
            </p>
          </div>

          {/* Simple Process Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-4">SIMPLE PROCESS</h3>
            <p className="text-gray-600 leading-relaxed">
              Quick and intuitive application process with real-time results and complete transparency in our scoring methodology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
