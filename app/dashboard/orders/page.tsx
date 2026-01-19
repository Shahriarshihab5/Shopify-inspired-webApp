"use client";

import { ShoppingCart } from "lucide-react";

export default function OrdersPage() {
  const orders = [
    { id: 1, customer: "John Doe", amount: "$450", status: "Delivered", date: "Jan 18" },
    { id: 2, customer: "Jane Smith", amount: "$320", status: "Processing", date: "Jan 17" },
    { id: 3, customer: "Bob Wilson", amount: "$580", status: "Pending", date: "Jan 16" },
  ];

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-gray-950 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-emerald-600 dark:text-emerald-400">
          Orders
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage customer orders</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-emerald-600" />
          Recent Orders
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-bold text-gray-900 dark:text-white">Order ID</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900 dark:text-white">Customer</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900 dark:text-white">Amount</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900 dark:text-white">Status</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900 dark:text-white">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">#{order.id}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{order.customer}</td>
                  <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
