# app/services/finance_service.py
import yfinance as yf
import redis
import json
from typing import Dict, Optional, List
from app.core.config import settings
from app.schemas.finance import StockData

class FinanceService:
    def __init__(self):
        self.redis_client = redis.from_url(settings.REDIS_URL)
        self.cache_ttl = 300  # 5 minutes

    async def get_stock_data(self, symbol: str) -> Optional[StockData]:
        """Get stock data with Redis caching"""
        cache_key = f"stock:{symbol.upper()}"
        
        # Try to get from cache first
        cached_data = self.redis_client.get(cache_key)
        if cached_data:
            data = json.loads(cached_data)
            return StockData(**data)
        
        try:
            # Fetch from Yahoo Finance
            ticker = yf.Ticker(symbol)
            info = ticker.info
            hist = ticker.history(period="1d")
            
            if hist.empty:
                return None
            
            current_price = hist['Close'].iloc[-1]
            prev_close = info.get('previousClose', current_price)
            change = current_price - prev_close
            change_percent = (change / prev_close) * 100 if prev_close else 0
            
            stock_data = StockData(
                symbol=symbol.upper(),
                price=round(current_price, 2),
                change=round(change, 2),
                change_percent=round(change_percent, 2),
                volume=info.get('volume'),
                market_cap=info.get('marketCap'),
                pe_ratio=info.get('trailingPE')
            )
            
            # Cache the result
            self.redis_client.setex(
                cache_key, 
                self.cache_ttl, 
                stock_data.model_dump_json()
            )
            
            return stock_data
            
        except Exception as e:
            print(f"Error fetching stock data for {symbol}: {e}")
            return None

    async def get_multiple_stocks(self, symbols: List[str]) -> Dict[str, Optional[StockData]]:
        """Get data for multiple stocks"""
        result = {}
        for symbol in symbols:
            result[symbol] = await self.get_stock_data(symbol)
        return result



