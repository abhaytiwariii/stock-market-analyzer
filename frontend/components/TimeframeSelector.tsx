import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ALLOWED_PERIODS = ["1mo", "3mo", "6mo", "1y"];

interface TimeframeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function TimeframeSelector({
  value,
  onChange,
  disabled,
}: TimeframeSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-black/60 dark:text-white/60">
        Timeframe
      </label>
      <div className="inline-flex rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-1 max-w-fit">
        {ALLOWED_PERIODS.map((period) => {
          const isActive = value === period;
          return (
            <button
              key={period}
              onClick={() => onChange(period)}
              disabled={disabled}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white dark:bg-[#2c2c2c] text-black dark:text-white shadow-sm"
                  : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              {period}
            </button>
          );
        })}
      </div>
    </div>
  );
}
