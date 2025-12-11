from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field

class Inventory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    item_name: str
    quantity: int = Field(default=0)
    unit: str = Field(default="pcs")
    unit_price: float = Field(default=0.0)
    category: str = Field(default="general")
    low_stock_threshold: int = Field(default=5)
    created_at: datetime = Field(default_factory=datetime.utcnow)
