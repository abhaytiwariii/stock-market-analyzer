import pandas as pd

def calculate_trend(df: pd.DataFrame) -> dict:
    if df.empty or 'Close' not in df.columns:
        return {
            "trend": "Sideways",
            "indicator_used": "50 Day Moving Average"
        }
        
    ma50 = df['Close'].rolling(window=50, min_periods=1).mean().iloc[-1]
    last_close = df['Close'].iloc[-1]
    
    if last_close > ma50:
        trend = "Bullish"
    elif last_close < ma50:
        trend = "Bearish"
    else:
        trend = "Sideways"
        
    return {
        "trend": trend,
        "indicator_used": "50 Day Moving Average"
    }

def calculate_support_resistance(df: pd.DataFrame) -> dict:
    if df.empty:
        return {
            "support_levels": [],
            "resistance_levels": []
        }
        
    col_min = 'Low' if 'Low' in df.columns else 'Close'
    col_max = 'High' if 'High' in df.columns else 'Close'

    # short-term window
    recent_df = df.tail(20)

    # medium-term window
    medium_df = df.tail(60)

    support1 = float(recent_df[col_min].min())
    support2 = float(medium_df[col_min].nsmallest(2).iloc[-1])  # second lowest value

    resistance1 = float(recent_df[col_max].max())
    resistance2 = float(medium_df[col_max].nlargest(2).iloc[-1])  # second highest value

    support_levels = sorted([support1, support2])
    resistance_levels = sorted([resistance1, resistance2])

    return {
        "support_levels": support_levels,
        "resistance_levels": resistance_levels
    }