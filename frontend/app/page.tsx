"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import StockSelector, { ALLOWED_SYMBOLS } from "@/components/StockSelector";
import TimeframeSelector, {
  ALLOWED_PERIODS,
} from "@/components/TimeframeSelector";
import TrendCard from "@/components/TrendCard";
import StockChart from "@/components/StockChart";
import { getStockData } from "@/services/stockService";

export default function Home() {
  const [symbol, setSymbol] = useState(ALLOWED_SYMBOLS[0]);
  const [period, setPeriod] = useState(ALLOWED_PERIODS[1]); // Default to 3mo
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getStockData(symbol, period);
      setData(response);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail || "An error occurred while fetching data.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [symbol, period]);

  return (
    <main className="min-h-screen p-4 sm:p-8 font-[family-name:var(--font-geist-sans)] bg-[#f9fafb] dark:bg-[#0a0a0a] text-black dark:text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header Section */}
        <header className="flex flex-col gap-2 border-b border-black/10 dark:border-white/10 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Indian Stock Market Analysis Dashboard
          </h1>
          <p className="text-sm sm:text-base opacity-70">
            Real-time insights and technical indicators.
          </p>
        </header>

        {/* Controls Section */}
        <section className="flex flex-col sm:flex-row gap-6 items-start sm:items-end p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#111111] shadow-sm">
          <StockSelector
            value={symbol}
            onChange={setSymbol}
            disabled={loading}
          />
          <TimeframeSelector
            value={period}
            onChange={setPeriod}
            disabled={loading}
          />

          {loading && (
            <div className="text-sm font-medium animate-pulse text-blue-500 ml-auto pb-2">
              Syncing data...
            </div>
          )}
        </section>

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Dashboard Content */}
        {data && !error && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Analysis Section (Trend Card) */}
            <section>
              <TrendCard
                trend={data.trend}
                indicatorUsed={data.indicator_used}
                supportLevels={data.support_levels}
                resistanceLevels={data.resistance_levels}
              />
            </section>

            {/* Chart Section */}
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold tracking-tight">
                Price Action & Volume
              </h2>
              <StockChart
                candles={data.candles}
                volume={data.volume}
                supportLevels={data.support_levels}
                resistanceLevels={data.resistance_levels}
              />
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
