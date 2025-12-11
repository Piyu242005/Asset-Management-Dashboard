from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from backend.schemas import asset as asset_schema
from backend.models.asset import Asset
from backend.auth.deps import require_active_user
from backend.core.db import get_session

router = APIRouter(prefix="/assets", tags=["assets"])


@router.get("/", response_model=List[asset_schema.AssetRead])
def list_assets(
    session: Session = Depends(get_session),
    current_user=Depends(require_active_user),
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    query = select(Asset)
    if search:
        query = query.where(Asset.name.contains(search))
    if status:
        query = query.where(Asset.status == status)
    if type:
        query = query.where(Asset.type == type)
    query = query.offset(offset).limit(limit)
    return session.exec(query).all()


@router.post("/", response_model=asset_schema.AssetRead)
def create_asset(asset_in: asset_schema.AssetCreate, session: Session = Depends(get_session), current_user=Depends(require_active_user)):
    asset = Asset(**asset_in.dict(), owner_id=current_user.id)
    session.add(asset)
    session.commit()
    session.refresh(asset)
    return asset


@router.get("/{asset_id}", response_model=asset_schema.AssetRead)
def get_asset(asset_id: int, session: Session = Depends(get_session), current_user=Depends(require_active_user)):
    asset = session.get(Asset, asset_id)
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset


@router.put("/{asset_id}", response_model=asset_schema.AssetRead)
def update_asset(asset_id: int, asset_in: asset_schema.AssetUpdate, session: Session = Depends(get_session), current_user=Depends(require_active_user)):
    asset = session.get(Asset, asset_id)
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    update_data = asset_in.dict(exclude_unset=True)
    for k, v in update_data.items():
        setattr(asset, k, v)
    asset.updated_at = datetime.utcnow()
    session.add(asset)
    session.commit()
    session.refresh(asset)
    return asset


@router.delete("/{asset_id}")
def delete_asset(asset_id: int, session: Session = Depends(get_session), current_user=Depends(require_active_user)):
    asset = session.get(Asset, asset_id)
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    session.delete(asset)
    session.commit()
    return {"ok": True}

