from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from backend.core.db import get_session
from backend.models.schedule import Schedule
from backend.schemas.schedule import ScheduleCreate, ScheduleRead, ScheduleUpdate

router = APIRouter(tags=["Schedule"])

@router.get("/schedule", response_model=List[ScheduleRead])
def read_schedule(
    offset: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session)
):
    schedule_items = session.exec(select(Schedule).offset(offset).limit(limit)).all()
    return schedule_items

@router.post("/schedule", response_model=ScheduleRead)
def create_schedule_item(
    schedule: ScheduleCreate,
    session: Session = Depends(get_session)
):
    db_schedule = Schedule.from_orm(schedule)
    session.add(db_schedule)
    session.commit()
    session.refresh(db_schedule)
    return db_schedule

@router.get("/schedule/{schedule_id}", response_model=ScheduleRead)
def read_schedule_item(schedule_id: int, session: Session = Depends(get_session)):
    schedule = session.get(Schedule, schedule_id)
    if not schedule:
        raise HTTPException(status_code=404, detail="Schedule item not found")
    return schedule

@router.patch("/schedule/{schedule_id}", response_model=ScheduleRead)
def update_schedule_item(
    schedule_id: int,
    schedule_update: ScheduleUpdate,
    session: Session = Depends(get_session)
):
    db_schedule = session.get(Schedule, schedule_id)
    if not db_schedule:
        raise HTTPException(status_code=404, detail="Schedule item not found")
    
    schedule_data = schedule_update.dict(exclude_unset=True)
    for key, value in schedule_data.items():
        setattr(db_schedule, key, value)
    
    session.add(db_schedule)
    session.commit()
    session.refresh(db_schedule)
    return db_schedule

@router.delete("/schedule/{schedule_id}")
def delete_schedule_item(schedule_id: int, session: Session = Depends(get_session)):
    db_schedule = session.get(Schedule, schedule_id)
    if not db_schedule:
        raise HTTPException(status_code=404, detail="Schedule item not found")
    
    session.delete(db_schedule)
    session.commit()
    return {"ok": True}
