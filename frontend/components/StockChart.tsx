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

    // Use new theme tokens
    const textColor = "#8b949e";
    const gridColor = "rgba(255, 255, 255, 0.05)";
    const primaryColor = "#00e5ff";
    const bullishColor = "#00e676";
    const bearishColor = "#ff4d4d";

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: textColor,
        fontFamily: "var(--font-mono), monospace",
      },
      grid: {
        vertLines: { color: gridColor },
        horzLines: { color: gridColor },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: gridColor,
      },
      timeScale: {
        borderColor: gridColor,
        timeVisible: true,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    // Add Candlestick Series
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: bullishColor,
      downColor: bearishColor,
      borderVisible: false,
      wickUpColor: bullishColor,
      wickDownColor: bearishColor,
    });
    candlestickSeries.setData(candles);

    // Add Volume Series (Histogram)
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: primaryColor,
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
        color: isUp ? "rgba(0, 230, 118, 0.2)" : "rgba(255, 77, 77, 0.2)", // bullish/bearish with opacity
      };
    });
    volumeSeries.setData(volumeData);

    // Add support lines
    supportLevels.forEach((level) => {
      candlestickSeries.createPriceLine({
        price: level,
        color: bullishColor,
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
        color: bearishColor,
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
      className="w-full h-[500px] border border-white/5 rounded-2xl overflow-hidden glass-panel"
    />
  );
}
