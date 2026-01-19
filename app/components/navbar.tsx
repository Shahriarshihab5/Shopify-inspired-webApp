"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, ShoppingBag, User, Sparkles, LogOut, LogIn, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    router.push('/login');
  };

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
          {isOnDashboard && user?.role === 'merchant' && (
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

            {/* User Menu */}
            {user ? (
              <div className="relative">
                {/* User Button with Name (Desktop) */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:scale-105 transition"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-semibold">{user.name}</span>
                  {user.role === 'merchant' && (
                    <span className="text-xs bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full">
                      Merchant
                    </span>
                  )}
                </button>

                {/* User Button (Mobile) */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="md:hidden p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:scale-110 transition"
                >
                  <User className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    {/* Backdrop for mobile */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    ></div>

                    {/* Menu */}
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                        <span className="inline-block mt-1 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-full">
                          {user.role}
                        </span>
                      </div>

                      {/* Menu Items */}
                      {user.role === 'merchant' && !isOnDashboard && (
                        <Link
                          href="/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Dashboard
                        </Link>
                      )}

                      <Link
                        href="/dashboard/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                      >
                        <User className="w-4 h-4" />
                        Settings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Not logged in - Show Login/Signup buttons
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-xl transition"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                
                <Link
                  href="/signup"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:scale-105 transition"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>

                {/* Mobile Login Button */}
                <Link
                  href="/login"
                  className="md:hidden p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition"
                >
                  <LogIn className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
