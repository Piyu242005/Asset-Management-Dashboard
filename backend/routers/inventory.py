from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from backend.core.db import get_session
from backend.models.inventory import Inventory
from backend.schemas.inventory import InventoryCreate, InventoryRead, InventoryUpdate

router = APIRouter(tags=["Inventory"])

@router.get("/inventory", response_model=List[InventoryRead])
def read_inventory(
    offset: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session)
):
    inventory_items = session.exec(select(Inventory).offset(offset).limit(limit)).all()
    return inventory_items

@router.post("/inventory", response_model=InventoryRead)
def create_inventory_item(
    inventory: InventoryCreate,
    session: Session = Depends(get_session)
):
    db_inventory = Inventory.from_orm(inventory)
    session.add(db_inventory)
    session.commit()
    session.refresh(db_inventory)
    return db_inventory

@router.get("/inventory/{inventory_id}", response_model=InventoryRead)
def read_inventory_item(inventory_id: int, session: Session = Depends(get_session)):
    inventory = session.get(Inventory, inventory_id)
    if not inventory:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    return inventory

@router.patch("/inventory/{inventory_id}", response_model=InventoryRead)
def update_inventory_item(
    inventory_id: int,
    inventory_update: InventoryUpdate,
    session: Session = Depends(get_session)
):
    db_inventory = session.get(Inventory, inventory_id)
    if not db_inventory:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    
    inventory_data = inventory_update.dict(exclude_unset=True)
    for key, value in inventory_data.items():
        setattr(db_inventory, key, value)
    
    session.add(db_inventory)
    session.commit()
    session.refresh(db_inventory)
    return db_inventory

@router.delete("/inventory/{inventory_id}")
def delete_inventory_item(inventory_id: int, session: Session = Depends(get_session)):
    db_inventory = session.get(Inventory, inventory_id)
    if not db_inventory:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    
    session.delete(db_inventory)
    session.commit()
    return {"ok": True}
