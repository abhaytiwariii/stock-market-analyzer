"use client";

import React, { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  CrosshairMode,
  LineStyle,
  CandlestickSeries,
  HistogramSeries,
} from "lightweight-charts";

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

interface StockChartProps {
  candles: CandleData[];
  volume: VolumeData[];
  supportLevels: number[];
  resistanceLevels: number[];
}

export default function StockChart({
  candles,
  volume,
  supportLevels,
  resistanceLevels,
}: StockChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const isDarkMode =
      document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: isDarkMode ? "#d1d5db" : "#374151",
      },
      grid: {
        vertLines: { color: isDarkMode ? "#374151" : "#e5e7eb" },
        horzLines: { color: isDarkMode ? "#374151" : "#e5e7eb" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: isDarkMode ? "#374151" : "#e5e7eb",
      },
      timeScale: {
        borderColor: isDarkMode ? "#374151" : "#e5e7eb",
        timeVisible: true,
      },
    });

    // Add Candlestick Series
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candlestickSeries.setData(candles);

    // Add Volume Series (Histogram)
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "", // set as an overlay
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8, // highest point of the series will be at 80% of the price scale
        bottom: 0,
      },
    });

    const volumeData = volume.map((item, index) => {
      // Color volume bars based on whether daily candle was up/down
      const candle = candles[index];
      const isUp = candle ? candle.close >= candle.open : true;
      return {
        time: item.time,
        value: item.value,
        color: isUp ? "rgba(38, 166, 154, 0.5)" : "rgba(239, 83, 80, 0.5)",
      };
    });
    volumeSeries.setData(volumeData);

    // Add support lines
    supportLevels.forEach((level) => {
      candlestickSeries.createPriceLine({
        price: level,
        color: "#3b82f6", // blue-500
        lineWidth: 2,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: true,
        title: "Support",
      });
    });

    // Add resistance lines
    resistanceLevels.forEach((level) => {
      candlestickSeries.createPriceLine({
        price: level,
        color: "#f97316", // orange-500
        lineWidth: 2,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: true,
        title: "Resistance",
      });
    });

    chart.timeScale().fitContent();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [candles, volume, supportLevels, resistanceLevels]);

  return (
    <div
      ref={chartContainerRef}
      className="w-full h-[500px] border border-black/10 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-[#111111]"
    />
  );
}
