from fastapi import APIRouter, Query
from app.services.stock_service import get_stock_data

router = APIRouter()

@router.get("/api/stock/{symbol}")
def fetch_stock_data(symbol: str, period: str = Query("1mo", description="Period to fetch data for")):
    return get_stock_data(symbol, period)
