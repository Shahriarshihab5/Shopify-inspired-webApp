import type { Metadata } from "next";
import "./globals.css";
import { ThemeProviders } from "./components/theme-provider";

export const metadata: Metadata = {
  title: "Shopify-Inspired Platform",
  description: "E-commerce store builder platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProviders
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
