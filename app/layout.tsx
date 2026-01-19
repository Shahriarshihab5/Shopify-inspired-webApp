import type { Metadata } from "next";
import "./globals.css";
import { ThemeProviders } from "./components/theme-provider";
import { AuthProvider } from "./providers/AuthProvider";
import Navbar from "./components/navbar";

export const metadata: Metadata = {
  title: "StoreCraft - E-commerce Store Builder",
  description: "Build and manage your online store with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <ThemeProviders
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
