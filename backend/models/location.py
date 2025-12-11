from typing import Optional
from sqlmodel import SQLModel, Field, Relationship


class Location(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    status: str = Field(default="active")
    city: Optional[str] = None
    country: Optional[str] = None

    assets: list["Asset"] = Relationship(back_populates="location")

