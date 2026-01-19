"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, ShoppingBag, User, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isOnDashboard = pathname.includes("/dashboard");

  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-200 dark:border-emerald-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative p-1.5 md:p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg md:rounded-xl shadow-lg">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-300 animate-pulse" />
              </div>
            </div>
            <span className="hidden sm:inline text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              StoreCraft
            </span>
          </Link>

          {/* Navigation - ONLY on Dashboard Pages */}
          {isOnDashboard && (
            <div className="flex items-center gap-1 md:gap-2">
              <Link
                href="/dashboard"
                className="px-3 md:px-5 py-2 text-xs md:text-base text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold rounded-lg md:rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/products"
                className="px-3 md:px-5 py-2 text-xs md:text-base text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-bold rounded-lg md:rounded-xl hover:bg-teal-50 dark:hover:bg-teal-950/50 transition"
              >
                Products
              </Link>
              <Link
                href="/dashboard/stores"
                className="px-3 md:px-5 py-2 text-xs md:text-base text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-bold rounded-lg md:rounded-xl hover:bg-cyan-50 dark:hover:bg-cyan-950/50 transition"
              >
                Stores
              </Link>
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:scale-110 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Moon className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>

            {/* User Button - Desktop Only */}
            <button className="hidden md:flex p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:scale-110 transition">
              <User className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
