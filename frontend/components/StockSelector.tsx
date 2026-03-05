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
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="stock-select"
        className="text-sm font-medium text-black/60 dark:text-white/60"
      >
        Symbol
      </label>
      <select
        id="stock-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="h-10 px-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1a] text-black dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 appearance-none min-w-[160px] cursor-pointer"
      >
        {ALLOWED_SYMBOLS.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol.split(".")[0]} {/* Show friendly name without .NS */}
          </option>
        ))}
      </select>
    </div>
  );
}
