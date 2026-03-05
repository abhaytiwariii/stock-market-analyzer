"use client";

import React, { useState, useEffect } from "react";
import StockSelector, { ALLOWED_SYMBOLS } from "@/components/StockSelector";
import TimeframeSelector, {
  ALLOWED_PERIODS,
} from "@/components/TimeframeSelector";
import TrendCard from "@/components/TrendCard";
import StockChart from "@/components/StockChart";
import { getStockData } from "@/services/stockService";

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface VolumeData {
  time: string;
  value: number;
}

interface StockResponse {
  symbol: string;
  trend: string;
  indicator_used: string;
  support_levels: number[];
  resistance_levels: number[];
  candles: CandleData[];
  volume: VolumeData[];
}

interface ErrorWithResponse {
  response?: {
    data?: {
      detail?: string;
    };
  };
}

export default function Home() {
  const [symbol, setSymbol] = useState(ALLOWED_SYMBOLS[0]);
  const [period, setPeriod] = useState(ALLOWED_PERIODS[1]); // Default to 3mo
  const [data, setData] = useState<StockResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getStockData(symbol, period);
      setData(response);
    } catch (err: unknown) {
      console.error(err);
      let errorMessage = "An error occurred while fetching data.";
      if (err && typeof err === "object" && "response" in err) {
        const errorResponse = (err as ErrorWithResponse).response;
        if (errorResponse?.data?.detail) {
          errorMessage = errorResponse.data.detail;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, period]);

  return (
    <main className="min-h-screen p-4 sm:p-8 relative overflow-hidden font-sans">
      {/* Dynamic Background Mesh Effect */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10 animate-fade-in-up">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Live Market Data
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#e6edf3]">
              Indian Stock <span className="text-gradient">Analyzer</span>
            </h1>
            <p className="text-sm sm:text-base text-neutral font-medium">
              Real-time insights, technical analysis, and price action tracking.
            </p>
          </div>
        </header>

        {/* Controls Section */}
        <section className="flex flex-col sm:flex-row gap-6 items-start sm:items-end p-5 glass-panel rounded-2xl">
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

          {loading && data && (
            <div className="flex items-center gap-3 text-sm font-mono text-primary ml-auto pb-2 animate-pulse">
              <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              Syncing Updates...
            </div>
          )}
        </section>

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-xl bg-bearish/10 border border-bearish/20 text-bearish flex items-center gap-3 animate-fade-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-mono text-sm">{error}</span>
          </div>
        )}

        {/* Skeleton Shimmer Loading State */}
        {loading && !data && !error && (
          <div className="flex flex-col gap-8 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-40 rounded-2xl bg-surface/60 border border-white/5 backdrop-blur-md"
                />
              ))}
            </div>
            <div className="flex items-center justify-between mb-[-12px] mt-4">
              <div className="h-6 w-48 bg-surface/60 rounded-md" />
              <div className="h-4 w-64 bg-surface/60 rounded-md hidden sm:block" />
            </div>
            <div className="h-[500px] w-full rounded-2xl bg-surface/60 border border-white/5 backdrop-blur-md" />
          </div>
        )}

        {/* Dashboard Content */}
        {data && !error && (
          <div className="flex flex-col gap-8 animate-fade-in-up-staggered">
            {/* Analysis Section (Trend Card) */}
            <section
              className="animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <TrendCard
                trend={data.trend}
                indicatorUsed={data.indicator_used}
                supportLevels={data.support_levels}
                resistanceLevels={data.resistance_levels}
              />
            </section>

            {/* Chart Section */}
            <section
              className="flex flex-col gap-6 glass-panel p-6 rounded-[32px] animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-[#e6edf3]">
                    Price Action & Volume
                  </h2>
                  <p className="text-sm text-neutral mt-1">
                    Interactive chart with embedded support and resistance
                    mapping.
                  </p>
                </div>
              </div>
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
