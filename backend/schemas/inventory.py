from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class InventoryBase(BaseModel):
    item_name: str
    quantity: int = 0
    unit: str = "pcs"
    unit_price: float = 0.0
    category: str = "general"
    low_stock_threshold: int = 5

class InventoryCreate(InventoryBase):
    pass

class InventoryUpdate(BaseModel):
    item_name: Optional[str] = None
    quantity: Optional[int] = None
    unit: Optional[str] = None
    unit_price: Optional[float] = None
    category: Optional[str] = None
    low_stock_threshold: Optional[int] = None

class InventoryRead(InventoryBase):
    id: int
    created_at: datetime
