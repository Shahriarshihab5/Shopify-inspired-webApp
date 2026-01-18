"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Menu, ShoppingBag, User, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-200 dark:border-indigo-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl transition-colors shadow-lg shadow-emerald-100/50 dark:shadow-indigo-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
  <div className="relative p-1.5 md:p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all">
    <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-white" />
    <div className="absolute -top-1 -right-1">
      <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-300 animate-pulse" />
    </div>
  </div>
  <span className="hidden sm:inline text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
    StoreCraft
  </span>
</Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border-2 border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/products"
              className="px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-bold transition rounded-xl hover:bg-teal-50 dark:hover:bg-teal-950/50 border-2 border-transparent hover:border-teal-200 dark:hover:border-teal-800"
            >
              Products
            </Link>
            <Link
              href="/dashboard/stores"
              className="px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-bold transition rounded-xl hover:bg-cyan-50 dark:hover:bg-cyan-950/50 border-2 border-transparent hover:border-cyan-200 dark:hover:border-cyan-800"
            >
              Stores
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white shadow-lg hover:shadow-2xl transition-all hover:scale-110 duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
              </span>
            </button>

            {/* User Menu Button */}
            <button className="p-3 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 hover:from-emerald-700 hover:to-teal-700 dark:hover:from-emerald-800 dark:hover:to-teal-800 text-white shadow-lg hover:shadow-2xl transition-all hover:scale-110 duration-300">
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-3 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition shadow-lg">
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
