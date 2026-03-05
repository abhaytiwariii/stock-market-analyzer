import yfinance as yf
from fastapi import HTTPException
import pandas as pd
from app.utils.indicators import calculate_trend, calculate_support_resistance

ALLOWED_SYMBOLS = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "ITC.NS", "SUNPHARMA.NS"]
ALLOWED_PERIODS = ["1mo", "3mo", "6mo", "1y"]

def get_stock_data(symbol: str, period: str = "1mo"):
    if symbol not in ALLOWED_SYMBOLS:
        raise HTTPException(status_code=400, detail=f"Invalid symbol '{symbol}'. Allowed symbols are: {', '.join(ALLOWED_SYMBOLS)}")
    
    if period not in ALLOWED_PERIODS:
        raise HTTPException(status_code=400, detail=f"Invalid period '{period}'. Allowed periods are: {', '.join(ALLOWED_PERIODS)}")
        
    try:
        ticker = yf.Ticker(symbol)
        df = ticker.history(period=period)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data from Yahoo Finance: {str(e)}")
    
    if df.empty:
        raise HTTPException(status_code=404, detail="No data found for the given symbol and period")
        
    trend_data = calculate_trend(df)
    sr_data = calculate_support_resistance(df)
        
    df = df.reset_index()
    
    # Check if index is Date or Datetime
    date_col = "Date" if "Date" in df.columns else "Datetime"
    
    # Convert timezone-aware datetime to string YYYY-MM-DD
    df[date_col] = pd.to_datetime(df[date_col]).dt.strftime('%Y-%m-%d')
        
    candles = []
    volume = []
    
    for _, row in df.iterrows():
        time_val = row[date_col]
        candles.append({
            "time": time_val,
            "open": float(row["Open"]),
            "high": float(row["High"]),
            "low": float(row["Low"]),
            "close": float(row["Close"])
        })
        volume.append({
            "time": time_val,
            "value": int(row["Volume"])
        })
        
    return {
        "symbol": symbol,
        "trend": trend_data["trend"],
        "indicator_used": trend_data["indicator_used"],
        "support_levels": sr_data["support_levels"],
        "resistance_levels": sr_data["resistance_levels"],
        "candles": candles,
        "volume": volume
    }
