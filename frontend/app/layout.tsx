import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Stock Market Analyzer",
    default: "Stock Market Analyzer | Real-Time Financial Dashboard",
  },
  description:
    "Advanced, production-grade stock market analysis dashboard providing real-time data, historical trends, and intelligent financial insights.",
  keywords: [
    "Stock Market",
    "Finance",
    "Dashboard",
    "Real-Time Trading",
    "Stock Analytics",
    "Trading",
  ],
  authors: [{ name: "Abhay Tiwari" }],
  creator: "Abhay Tiwari",
  publisher: "Abhay Tiwari",
  openGraph: {
    title: "Stock Market Analyzer | Premium Financial Dashboard",
    description:
      "Track real-time stock data and historical trends with this powerful, Next.js powered dashboard.",
    url: "https://stock-market-analyzer.vercel.app",
    siteName: "Stock Market Analyzer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stock Market Analyzer",
    description:
      "Production-grade financial dashboard built with Next.js and FastAPI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased bg-[#0e1117] text-[#e6edf3] font-sans selection:bg-[#00e5ff]/30 selection:text-[#00e5ff]`}
      >
        {children}
      </body>
    </html>
  );
}
