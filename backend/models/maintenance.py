from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field

class Maintenance(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    cost: float = Field(default=0.0)
    scheduled_date: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="pending") # pending, completed, cancelled
    asset_id: Optional[int] = Field(default=None, foreign_key="asset.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
