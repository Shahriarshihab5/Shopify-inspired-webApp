"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center space-y-4 md:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white text-xs md:text-sm font-bold shadow-lg">
            ✨ New: AI-Powered Store Builder
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Build Your Dream Store
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Create, manage, and scale your e-commerce with StoreCraft 🚀
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <button className="px-6 md:px-10 py-2.5 md:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg md:rounded-xl font-bold text-sm md:text-base shadow-lg hover:shadow-xl transition-all">
              Get Started Free
            </button>
            <button className="px-6 md:px-10 py-2.5 md:py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg md:rounded-xl font-bold text-sm md:text-base shadow-lg transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl md:text-4xl font-black text-center text-gray-900 dark:text-white mb-8 md:mb-12">
          Everything You Need
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-all">
            <div className="text-3xl md:text-4xl mb-3">🏪</div>
            <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-2">
              Easy Setup
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Launch in minutes with intuitive builder
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/20 border border-teal-200 dark:border-teal-800 hover:shadow-lg transition-all">
            <div className="text-3xl md:text-4xl mb-3">📊</div>
            <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-2">
              Analytics
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Real-time insights and tracking
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/30 dark:to-cyan-900/20 border border-cyan-200 dark:border-cyan-800 hover:shadow-lg transition-all">
            <div className="text-3xl md:text-4xl mb-3">🚀</div>
            <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-2">
              Scale Easy
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Grow seamlessly with our platform
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl md:rounded-2xl p-6 md:p-12 text-white">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-5xl font-black mb-1">10K+</div>
              <div className="text-xs md:text-base font-semibold opacity-90">Active Stores</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-black mb-1">$2M+</div>
              <div className="text-xs md:text-base font-semibold opacity-90">Revenue</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-black mb-1">99.9%</div>
              <div className="text-xs md:text-base font-semibold opacity-90">Uptime</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
