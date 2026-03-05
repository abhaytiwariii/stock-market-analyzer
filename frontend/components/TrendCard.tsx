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
        return "text-bullish bg-bullish/10 border-bullish/30";
      case "bearish":
        return "text-bearish bg-bearish/10 border-bearish/30";
      default:
        return "text-neutral bg-neutral/10 border-neutral/30";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full auto-rows-fr">
      {/* Trend Info */}
      <div className="p-6 rounded-2xl glass-panel flex flex-col justify-between group overflow-hidden relative shine-effect hover:-translate-y-1 transition-transform duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors pointer-events-none" />
        <div className="flex items-center space-x-3 text-neutral mb-6">
          <div className="p-2 bg-surface rounded-lg shadow-sm border border-white/5">
            <Activity size={20} className="text-primary" />
          </div>
          <h3 className="text-[13px] font-mono font-semibold uppercase tracking-widest text-[#8b949e]">
            Market Trend
          </h3>
        </div>
        <div>
          <span
            className={`inline-flex px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${getTrendColor(trend)}`}
          >
            {trend}
          </span>
          <p className="text-xs font-mono text-neutral mt-5 flex items-center gap-2">
            <Pickaxe size={14} />
            Based on {indicatorUsed || "Moving Averages"}
          </p>
        </div>
      </div>

      {/* Support Levels */}
      <div className="p-6 rounded-2xl glass-panel flex flex-col justify-between group overflow-hidden relative hover:-translate-y-1 transition-transform duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-bullish/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-bullish/10 transition-colors pointer-events-none" />
        <div className="flex items-center space-x-3 text-neutral mb-6">
          <div className="p-2 bg-surface rounded-lg shadow-sm border border-white/5">
            <TrendingDown size={20} className="text-bullish" />
          </div>
          <h3 className="text-[13px] font-mono font-semibold uppercase tracking-widest text-[#8b949e]">
            Support Levels
          </h3>
        </div>
        <div className="space-y-4">
          {supportLevels.map((lvl, idx) => (
            <div
              key={`support-${idx}`}
              className="flex justify-between items-center text-sm group-hover:bg-white/5 p-2 -mx-2 rounded transition-colors"
            >
              <span className="text-neutral font-medium">S{idx + 1}</span>
              <span className="font-mono font-bold text-[#e6edf3]">
                ₹{lvl.toFixed(2)}
              </span>
            </div>
          ))}
          {supportLevels.length === 0 && (
            <span className="text-sm font-medium text-neutral">N/A</span>
          )}
        </div>
      </div>

      {/* Resistance Levels */}
      <div className="p-6 rounded-2xl glass-panel flex flex-col justify-between group overflow-hidden relative hover:-translate-y-1 transition-transform duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-bearish/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-bearish/10 transition-colors pointer-events-none" />
        <div className="flex items-center space-x-3 text-neutral mb-6">
          <div className="p-2 bg-surface rounded-lg shadow-sm border border-white/5">
            <TrendingUp size={20} className="text-bearish" />
          </div>
          <h3 className="text-[13px] font-mono font-semibold uppercase tracking-widest text-[#8b949e]">
            Resistance Levels
          </h3>
        </div>
        <div className="space-y-4">
          {resistanceLevels.map((lvl, idx) => (
            <div
              key={`resistance-${idx}`}
              className="flex justify-between items-center text-sm group-hover:bg-white/5 p-2 -mx-2 rounded transition-colors"
            >
              <span className="text-neutral font-medium">R{idx + 1}</span>
              <span className="font-mono font-bold text-[#e6edf3]">
                ₹{lvl.toFixed(2)}
              </span>
            </div>
          ))}
          {resistanceLevels.length === 0 && (
            <span className="text-sm font-medium text-neutral">N/A</span>
          )}
        </div>
      </div>
    </div>
  );
}
