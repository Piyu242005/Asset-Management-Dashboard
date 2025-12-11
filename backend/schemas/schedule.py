from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class ScheduleBase(BaseModel):
    title: str
    start_time: datetime
    end_time: datetime
    location: Optional[str] = None
    description: Optional[str] = None
    type: str = "event"

class ScheduleCreate(ScheduleBase):
    pass

class ScheduleUpdate(BaseModel):
    title: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    location: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None

class ScheduleRead(ScheduleBase):
    id: int
    created_at: datetime
