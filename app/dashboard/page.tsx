"use client";

import { useStore } from "../store/useStore";
import { Package, ShoppingCart, Store, TrendingUp } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { products, stores } = useStore();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    {
      name: "Total Products",
      value: products.length,
      icon: Package,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      name: "Total Orders",
      value: 156,
      icon: ShoppingCart,
      color: "bg-green-500",
      change: "+8%",
    },
    {
      name: "Active Stores",
      value: stores.length,
      icon: Store,
      color: "bg-purple-500",
      change: "+3%",
    },
    {
      name: "Revenue",
      value: "$12,458",
      icon: TrendingUp,
      color: "bg-orange-500",
      change: "+23%",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="p-8 min-h-full bg-gray-50 dark:bg-gray-950">
      {/* Debug indicator - remove later */}
      <div className="fixed top-20 right-4 bg-blue-600 text-white px-3 py-1 rounded text-xs font-mono z-50">
        Theme: {theme}
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening with your stores.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {stat.name}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Products
        </h2>
        <div className="space-y-4">
          {products.slice(0, 5).map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-2 rounded transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
                  {product.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {product.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Stock: {product.stock}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
