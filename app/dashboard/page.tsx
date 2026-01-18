"use client";

import { useStore } from "../store/useStore";
import { Package, ShoppingCart, Store, TrendingUp, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { products, stores } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    {
      name: "Total Products",
      value: products.length,
      icon: Package,
      gradient: "from-emerald-500 to-teal-600",
      bg: "from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/30",
      border: "border-emerald-300 dark:border-emerald-700",
      change: "+12%",
      changeColor: "text-emerald-700 dark:text-emerald-400",
      changeBg: "bg-emerald-100 dark:bg-emerald-950/50",
    },
    {
      name: "Total Orders",
      value: 156,
      icon: ShoppingCart,
      gradient: "from-teal-500 to-cyan-600",
      bg: "from-teal-50 to-cyan-50 dark:from-teal-950/50 dark:to-cyan-950/30",
      border: "border-teal-300 dark:border-teal-700",
      change: "+8%",
      changeColor: "text-teal-700 dark:text-teal-400",
      changeBg: "bg-teal-100 dark:bg-teal-950/50",
    },
    {
      name: "Active Stores",
      value: stores.length,
      icon: Store,
      gradient: "from-cyan-500 to-emerald-600",
      bg: "from-cyan-50 to-emerald-50 dark:from-cyan-950/50 dark:to-emerald-950/30",
      border: "border-cyan-300 dark:border-cyan-700",
      change: "+3%",
      changeColor: "text-cyan-700 dark:text-cyan-400",
      changeBg: "bg-cyan-100 dark:bg-cyan-950/50",
    },
    {
      name: "Revenue",
      value: "$12,458",
      icon: TrendingUp,
      gradient: "from-emerald-600 to-cyan-600",
      bg: "from-emerald-50 to-cyan-50 dark:from-emerald-950/50 dark:to-cyan-950/30",
      border: "border-emerald-300 dark:border-emerald-700",
      change: "+23%",
      changeColor: "text-emerald-700 dark:text-emerald-400",
      changeBg: "bg-emerald-100 dark:bg-emerald-950/50",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-gray-950 min-h-full">
      {/* Header - ADD TOP MARGIN FOR MOBILE MENU */}
      <div className="mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mt-12 md:mt-0">
        <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-emerald-600 dark:text-emerald-400 animate-pulse flex-shrink-0" />
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm md:text-lg font-semibold text-gray-600 dark:text-gray-400 mt-1 md:mt-2">
            🚀 Welcome back! Your empire is growing strong.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-10">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className={`relative bg-gradient-to-br ${stat.bg} rounded-xl md:rounded-3xl border-2 ${stat.border} p-4 md:p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden group`}
          >
            <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${stat.gradient} opacity-10 group-hover:opacity-20 transition-all rounded-full blur-3xl`}></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3 md:mb-6">
                <div className={`bg-gradient-to-br ${stat.gradient} p-2 md:p-4 rounded-lg md:rounded-2xl shadow-lg md:shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all`}>
                  <stat.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <span className={`text-xs md:text-sm font-black ${stat.changeColor} px-2 md:px-3 py-1 md:py-1.5 rounded-full ${stat.changeBg}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-1 md:mb-2">
                {stat.value}
              </h3>
              <p className="text-xs md:text-sm font-bold text-gray-600 dark:text-gray-400 uppercase">
                {stat.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border-2 border-emerald-200 dark:border-emerald-800 p-4 md:p-8 shadow-xl">
        <h2 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
          <Package className="w-6 h-6 md:w-8 md:h-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span>Recent Products</span>
        </h2>
        <div className="space-y-2 md:space-y-3">
          {products.slice(0, 5).map((product, index) => {
            const gradients = [
              "from-emerald-500 to-teal-600",
              "from-teal-500 to-cyan-600",
              "from-cyan-500 to-emerald-600",
              "from-emerald-600 to-cyan-600",
              "from-teal-600 to-emerald-600",
            ];
            const grad = gradients[index % 5];
            return (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 md:p-5 rounded-lg md:rounded-2xl border-2 border-emerald-100 dark:border-emerald-800 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 dark:hover:from-emerald-950/30 dark:hover:to-teal-950/30 transition-all group hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex items-center gap-3 md:gap-5 min-w-0">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-black text-lg md:text-2xl shadow-lg md:shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all flex-shrink-0`}>
                    {product.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-black text-base md:text-xl text-gray-900 dark:text-white truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400">
                      📦 {product.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-lg md:text-2xl text-gray-900 dark:text-white">
                    ${product.price}
                  </p>
                  <p className="text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
