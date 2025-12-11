from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class FinancialBase(BaseModel):
    title: str
    amount: float
    type: str = "expense"
    category: str
    date: datetime
    description: Optional[str] = None

class FinancialCreate(FinancialBase):
    pass

class FinancialUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    type: Optional[str] = None
    category: Optional[str] = None
    date: Optional[datetime] = None
    description: Optional[str] = None

class FinancialRead(FinancialBase):
    id: int
    created_at: datetime
