"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  BarChart3,
  Settings,
  X,
  Menu,
} from "lucide-react";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Stores", href: "/dashboard/stores", icon: Store },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Menu Button - FIXED Z-INDEX */}
      <div className="md:hidden fixed top-16 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-lg shadow-lg"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar - FIXED Z-INDEX */}
      <aside
        className={`${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 top-16 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 flex flex-col shadow-lg md:shadow-none`}
      >
        {/* Header */}
        <div className="h-12 md:h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
          <span className="text-sm md:text-lg font-black bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            Merchant
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm md:text-base ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 text-emerald-700 dark:text-emerald-400 font-bold border-l-4 border-emerald-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold"
                }`}
              >
                <item.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-300 dark:border-emerald-700">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-xs md:text-base flex-shrink-0">
              SA
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm font-bold text-gray-900 dark:text-white truncate">
                Shahriar
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                ⭐ Merchant
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay on Mobile - FIXED Z-INDEX */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/50 md:hidden z-30"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
}
