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
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-mono uppercase tracking-widest text-neutral">
        Timeframe
      </label>
      <div className="inline-flex rounded-xl p-1 bg-black/20 border border-white/5 shadow-inner h-12 items-center relative gap-1">
        {ALLOWED_PERIODS.map((period) => {
          const isActive = value === period;
          return (
            <button
              key={period}
              onClick={() => onChange(period)}
              disabled={disabled}
              className={cn(
                "relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-out z-10",
                isActive
                  ? "text-[#0e1117]"
                  : "text-[#e6edf3] hover:text-primary",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              {isActive && (
                <span className="absolute inset-0 bg-primary rounded-lg shadow-glow-hover -z-10 animate-slide-pill" />
              )}
              {period}
            </button>
          );
        })}
      </div>
    </div>
  );
}
