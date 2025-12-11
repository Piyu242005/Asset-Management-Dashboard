from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship


class Asset(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    category: str
    type: str = Field(default="financial")
    value: float = Field(default=0)
    status: str = Field(default="active")
    owner_id: Optional[int] = Field(default=None, foreign_key="user.id")
    location_id: Optional[int] = Field(default=None, foreign_key="location.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    owner: Optional["User"] = Relationship(back_populates="assets")
    location: Optional["Location"] = Relationship(back_populates="assets")

