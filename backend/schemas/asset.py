from typing import Optional
from pydantic import BaseModel


class AssetBase(BaseModel):
    name: str
    category: str
    type: str = "financial"
    value: float = 0
    status: str = "active"
    location_id: Optional[int] = None


class AssetCreate(AssetBase):
    pass


class AssetUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    type: Optional[str] = None
    value: Optional[float] = None
    status: Optional[str] = None
    location_id: Optional[int] = None


class AssetRead(AssetBase):
    id: int
    owner_id: Optional[int] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

