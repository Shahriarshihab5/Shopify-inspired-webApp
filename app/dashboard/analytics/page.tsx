"use client";

import { BarChart3, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-8 bg-white dark:bg-gray-950 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-emerald-600 dark:text-emerald-400">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Track your business metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Sales Trend (Last 7 Days)
          </h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-12">Day {i}</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                    style={{ width: `${30 + i * 15}%` }}
                  ></div>
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white w-12">${(30 + i * 15) * 10}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Metrics */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Key Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Conversion Rate</span>
              <span className="text-2xl font-bold text-emerald-600">3.24%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Avg Order Value</span>
              <span className="text-2xl font-bold text-teal-600">$125.50</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Customer Retention</span>
              <span className="text-2xl font-bold text-cyan-600">68%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Cart Abandonment</span>
              <span className="text-2xl font-bold text-orange-600">42%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
