from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class MaintenanceBase(BaseModel):
    title: str
    description: Optional[str] = None
    cost: float = 0.0
    scheduled_date: datetime
    status: str = "pending"
    asset_id: Optional[int] = None

class MaintenanceCreate(MaintenanceBase):
    pass

class MaintenanceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    cost: Optional[float] = None
    scheduled_date: Optional[datetime] = None
    status: Optional[str] = None
    asset_id: Optional[int] = None

class MaintenanceRead(MaintenanceBase):
    id: int
    created_at: datetime
