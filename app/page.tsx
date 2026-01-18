"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Force update on theme change
  useEffect(() => {
    if (mounted && theme) {
      console.log("Theme changed to:", theme);
      console.log("Resolved theme:", resolvedTheme);
      console.log("HTML class:", document.documentElement.className);
    }
  }, [theme, resolvedTheme, mounted]);

  if (!mounted) {
    return null;
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
        color: isDark ? "#ededed" : "#171717",
        transition: "all 0.3s ease",
      }}
    >
      <main className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
        {/* Debug Panel */}
        <div
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "1rem",
            borderRadius: "0.5rem",
            fontSize: "0.75rem",
            fontFamily: "monospace",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          <div>Theme: {theme}</div>
          <div>System: {systemTheme}</div>
          <div>Resolved: {resolvedTheme}</div>
          <div>HTML class: {document.documentElement.className || "none"}</div>
          <div>Current: {isDark ? "DARK" : "LIGHT"}</div>
        </div>

        <div className="text-center space-y-4">
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: isDark ? "#ffffff" : "#000000",
            }}
          >
            🛍️ Shopify-Inspired Platform
          </h1>

          <p style={{ fontSize: "1.25rem" }}>
            Current theme:{" "}
            <span
              style={{
                fontWeight: "bold",
                color: isDark ? "#60a5fa" : "#2563eb",
              }}
            >
              {currentTheme}
            </span>
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => {
              console.log("🌞 Clicking Light");
              setTheme("light");
            }}
            style={{
              padding: "1rem 2rem",
              borderRadius: "0.5rem",
              backgroundColor: "#e5e7eb",
              color: "#111827",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            ☀️ Light
          </button>

          <button
            onClick={() => {
              console.log("🌙 Clicking Dark");
              setTheme("dark");
            }}
            style={{
              padding: "1rem 2rem",
              borderRadius: "0.5rem",
              backgroundColor: "#1f2937",
              color: "#ffffff",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            🌙 Dark
          </button>

          <button
            onClick={() => {
              console.log("💻 Clicking System");
              setTheme("system");
            }}
            style={{
              padding: "1rem 2rem",
              borderRadius: "0.5rem",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            💻 System
          </button>
        </div>

        {/* Visual Test Box */}
        <div
          style={{
            marginTop: "2rem",
            padding: "2rem",
            borderRadius: "1rem",
            backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
            border: `4px solid ${isDark ? "#4b5563" : "#d1d5db"}`,
            boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
        >
          <p
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: isDark ? "#f9fafb" : "#111827",
            }}
          >
            ✨ This box changes with theme
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              marginTop: "0.5rem",
              opacity: 0.75,
              color: isDark ? "#d1d5db" : "#6b7280",
            }}
          >
            Current mode: {isDark ? "DARK 🌙" : "LIGHT ☀️"}
          </p>
        </div>
      </main>
    </div>
  );
}
