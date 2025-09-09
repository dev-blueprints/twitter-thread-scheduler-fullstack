# app/schemas/finance.py
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class StockData(BaseModel):
    symbol: str
    price: float
    change: float
    change_percent: float
    volume: Optional[int] = None
    market_cap: Optional[float] = None
    pe_ratio: Optional[float] = None

class StockRequest(BaseModel):
    symbol: str
    metrics: Optional[List[str]] = ["price", "change", "volume"]