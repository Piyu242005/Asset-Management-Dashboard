from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field

class Financial(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    amount: float
    type: str = Field(default="expense") # income, expense
    category: str
    date: datetime = Field(default_factory=datetime.utcnow)
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
