"use client";

import { Settings, Bell, Lock, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8 bg-white dark:bg-gray-950 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-emerald-600 dark:text-emerald-400">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account and preferences</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            Account Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Name</label>
              <input type="text" placeholder="Shahriar Ahmed" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" disabled />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Email</label>
              <input type="email" placeholder="shahriar@example.com" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" disabled />
            </div>
            <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition">
              Update Profile
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            Notifications
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-emerald-600" />
              <span className="text-gray-900 dark:text-white">Email notifications for new orders</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-emerald-600" />
              <span className="text-gray-900 dark:text-white">Email notifications for low stock</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 accent-emerald-600" />
              <span className="text-gray-900 dark:text-white">Weekly sales summary</span>
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-600" />
            Security
          </h3>
          <div className="space-y-3">
            <button className="w-full px-6 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-bold transition">
              Change Password
            </button>
            <button className="w-full px-6 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-bold transition">
              Enable 2FA
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h3>
          <button className="w-full px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
