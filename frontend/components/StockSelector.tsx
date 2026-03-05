import React from "react";

export const ALLOWED_SYMBOLS = [
  "RELIANCE.NS",
  "TCS.NS",
  "HDFCBANK.NS",
  "ITC.NS",
  "SUNPHARMA.NS",
];

interface StockSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function StockSelector({
  value,
  onChange,
  disabled,
}: StockSelectorProps) {
  return (
    <div className="flex flex-col gap-2 relative z-50">
      <label className="text-[11px] font-mono uppercase tracking-widest text-neutral transition-colors">
        Select Stock Symbol
      </label>
      <div className="relative group w-full sm:w-[220px]">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`h-12 w-full appearance-none pl-4 pr-10 rounded-xl border border-white/10 bg-surface/80 backdrop-blur-xl text-[#e6edf3] font-mono text-sm outline-none transition-all duration-300 disabled:opacity-50 cursor-pointer ${
            !disabled &&
            "hover:bg-white/5 hover:border-primary/50 hover:shadow-glow focus:border-primary focus:shadow-glow"
          }`}
        >
          {ALLOWED_SYMBOLS.map((symbol) => (
            <option
              key={symbol}
              value={symbol}
              className="bg-[#161b22] text-[#e6edf3] py-2"
            >
              {symbol.split(".")[0]}
            </option>
          ))}
        </select>

        {/* Custom Chevron Array */}
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none transition-colors duration-300 text-neutral group-hover:text-primary">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
