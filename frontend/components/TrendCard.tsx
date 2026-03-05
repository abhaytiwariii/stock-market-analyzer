import React from "react";
import { Pickaxe, TrendingUp, TrendingDown, Activity } from "lucide-react";

interface TrendCardProps {
  trend: string;
  indicatorUsed: string;
  supportLevels: number[];
  resistanceLevels: number[];
}

export default function TrendCard({
  trend,
  indicatorUsed,
  supportLevels,
  resistanceLevels,
}: TrendCardProps) {
  const getTrendColor = (t: string) => {
    switch (t.toLowerCase()) {
      case "bullish":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "bearish":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      default:
        return "text-gray-500 bg-gray-500/10 border-gray-500/20 dark:text-gray-300 dark:bg-gray-700/30";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {/* Trend Info */}
      <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111111] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-2 text-black/50 dark:text-white/50 mb-4">
          <Activity size={18} />
          <h3 className="text-sm font-medium">Market Trend</h3>
        </div>
        <div>
          <span
            className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold border ${getTrendColor(trend)}`}
          >
            {trend}
          </span>
          <p className="text-xs text-black/40 dark:text-white/40 mt-3 flex items-center gap-1">
            <Pickaxe size={12} />
            Based on {indicatorUsed}
          </p>
        </div>
      </div>

      {/* Support Levels */}
      <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111111] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-2 text-black/50 dark:text-white/50 mb-4">
          <TrendingDown size={18} className="text-blue-500" />
          <h3 className="text-sm font-medium">Support Levels</h3>
        </div>
        <div className="space-y-2">
          {supportLevels.map((lvl, idx) => (
            <div
              key={`support-${idx}`}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-black/60 dark:text-white/60">
                S{idx + 1}
              </span>
              <span className="font-mono font-medium text-black dark:text-white">
                ₹{lvl.toFixed(2)}
              </span>
            </div>
          ))}
          {supportLevels.length === 0 && (
            <span className="text-sm text-black/40 dark:text-white/40">
              N/A
            </span>
          )}
        </div>
      </div>

      {/* Resistance Levels */}
      <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111111] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-2 text-black/50 dark:text-white/50 mb-4">
          <TrendingUp size={18} className="text-orange-500" />
          <h3 className="text-sm font-medium">Resistance Levels</h3>
        </div>
        <div className="space-y-2">
          {resistanceLevels.map((lvl, idx) => (
            <div
              key={`resistance-${idx}`}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-black/60 dark:text-white/60">
                R{idx + 1}
              </span>
              <span className="font-mono font-medium text-black dark:text-white">
                ₹{lvl.toFixed(2)}
              </span>
            </div>
          ))}
          {resistanceLevels.length === 0 && (
            <span className="text-sm text-black/40 dark:text-white/40">
              N/A
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
