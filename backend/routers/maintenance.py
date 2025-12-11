from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from backend.core.db import get_session
from backend.models.maintenance import Maintenance
from backend.schemas.maintenance import MaintenanceCreate, MaintenanceRead, MaintenanceUpdate

router = APIRouter(tags=["Maintenance"])

@router.get("/maintenance", response_model=List[MaintenanceRead])
def read_maintenance(
    offset: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session)
):
    maintenance_records = session.exec(select(Maintenance).offset(offset).limit(limit)).all()
    return maintenance_records

@router.post("/maintenance", response_model=MaintenanceRead)
def create_maintenance(
    maintenance: MaintenanceCreate,
    session: Session = Depends(get_session)
):
    db_maintenance = Maintenance.from_orm(maintenance)
    session.add(db_maintenance)
    session.commit()
    session.refresh(db_maintenance)
    return db_maintenance

@router.get("/maintenance/{maintenance_id}", response_model=MaintenanceRead)
def read_maintenance_record(maintenance_id: int, session: Session = Depends(get_session)):
    maintenance = session.get(Maintenance, maintenance_id)
    if not maintenance:
        raise HTTPException(status_code=404, detail="Maintenance record not found")
    return maintenance

@router.patch("/maintenance/{maintenance_id}", response_model=MaintenanceRead)
def update_maintenance(
    maintenance_id: int,
    maintenance_update: MaintenanceUpdate,
    session: Session = Depends(get_session)
):
    db_maintenance = session.get(Maintenance, maintenance_id)
    if not db_maintenance:
        raise HTTPException(status_code=404, detail="Maintenance record not found")
    
    maintenance_data = maintenance_update.dict(exclude_unset=True)
    for key, value in maintenance_data.items():
        setattr(db_maintenance, key, value)
    
    session.add(db_maintenance)
    session.commit()
    session.refresh(db_maintenance)
    return db_maintenance

@router.delete("/maintenance/{maintenance_id}")
def delete_maintenance(maintenance_id: int, session: Session = Depends(get_session)):
    db_maintenance = session.get(Maintenance, maintenance_id)
    if not db_maintenance:
        raise HTTPException(status_code=404, detail="Maintenance record not found")
    
    session.delete(db_maintenance)
    session.commit()
    return {"ok": True}
