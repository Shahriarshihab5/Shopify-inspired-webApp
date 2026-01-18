/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          // Light mode: Fresh Green/Teal
          primary: {
            light: '#10b981', // emerald-500
            DEFAULT: '#059669', // emerald-600
            dark: '#047857', // emerald-700
          },
          secondary: {
            light: '#06b6d4', // cyan-500
            DEFAULT: '#0891b2', // cyan-600
            dark: '#0e7490', // cyan-700
          },
          accent: {
            light: '#8b5cf6', // violet-500
            DEFAULT: '#7c3aed', // violet-600
            dark: '#6d28d9', // violet-700
          },
          // Dark mode: Deep Purple/Blue
          darkPrimary: {
            light: '#818cf8', // indigo-400
            DEFAULT: '#6366f1', // indigo-500
            dark: '#4f46e5', // indigo-600
          },
          darkSecondary: {
            light: '#a78bfa', // violet-400
            DEFAULT: '#8b5cf6', // violet-500
            dark: '#7c3aed', // violet-600
          },
        },
      },
    },
    plugins: [],
  };
  