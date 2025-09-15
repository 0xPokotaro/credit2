export function StatsSection() {
  return (
    <section className="px-6 py-16 lg:px-20 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-900 mb-2">99.9%</div>
            <div className="text-gray-600">Data Security Rate</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-900 mb-2">5 min</div>
            <div className="text-gray-600">Average Processing Time</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-900 mb-2">50k+</div>
            <div className="text-gray-600">Successful Applications</div>
          </div>
        </div>
      </div>
    </section>
  );
}
