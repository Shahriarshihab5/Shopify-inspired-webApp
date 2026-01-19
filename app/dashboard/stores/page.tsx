"use client";

import { Store, Plus } from "lucide-react";

export default function StoresPage() {
  const stores = [
    { id: 1, name: "TechHub Store", sales: "$5,240", products: 42 },
    { id: 2, name: "Fashion Plus", sales: "$3,180", products: 28 },
    { id: 3, name: "Home Goods", sales: "$2,150", products: 35 },
  ];

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-gray-950 min-h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-emerald-600 dark:text-emerald-400">
            Stores
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your stores</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-lg font-bold shadow-lg hover:scale-105 transition">
          <Plus className="w-5 h-5" />
          New Store
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div key={store.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{store.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Store</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Sales:</span>
                <span className="font-bold text-gray-900 dark:text-white">{store.sales}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Products:</span>
                <span className="font-bold text-gray-900 dark:text-white">{store.products}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

