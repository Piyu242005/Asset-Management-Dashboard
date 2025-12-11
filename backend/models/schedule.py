from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field

class Schedule(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    start_time: datetime
    end_time: datetime
    location: Optional[str] = None
    description: Optional[str] = None
    type: str = Field(default="event") # meeting, maintenance, reminder
    created_at: datetime = Field(default_factory=datetime.utcnow)
