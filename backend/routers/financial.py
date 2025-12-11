from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from backend.core.db import get_session
from backend.models.financial import Financial
from backend.schemas.financial import FinancialCreate, FinancialRead, FinancialUpdate

router = APIRouter(tags=["Financial"])

@router.get("/financial", response_model=List[FinancialRead])
def read_financial(
    offset: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session)
):
    financial_records = session.exec(select(Financial).offset(offset).limit(limit)).all()
    return financial_records

@router.post("/financial", response_model=FinancialRead)
def create_financial_record(
    financial: FinancialCreate,
    session: Session = Depends(get_session)
):
    db_financial = Financial.from_orm(financial)
    session.add(db_financial)
    session.commit()
    session.refresh(db_financial)
    return db_financial

@router.get("/financial/{financial_id}", response_model=FinancialRead)
def read_financial_record(financial_id: int, session: Session = Depends(get_session)):
    financial = session.get(Financial, financial_id)
    if not financial:
        raise HTTPException(status_code=404, detail="Financial record not found")
    return financial

@router.patch("/financial/{financial_id}", response_model=FinancialRead)
def update_financial_record(
    financial_id: int,
    financial_update: FinancialUpdate,
    session: Session = Depends(get_session)
):
    db_financial = session.get(Financial, financial_id)
    if not db_financial:
        raise HTTPException(status_code=404, detail="Financial record not found")
    
    financial_data = financial_update.dict(exclude_unset=True)
    for key, value in financial_data.items():
        setattr(db_financial, key, value)
    
    session.add(db_financial)
    session.commit()
    session.refresh(db_financial)
    return db_financial

@router.delete("/financial/{financial_id}")
def delete_financial_record(financial_id: int, session: Session = Depends(get_session)):
    db_financial = session.get(Financial, financial_id)
    if not db_financial:
        raise HTTPException(status_code=404, detail="Financial record not found")
    
    session.delete(db_financial)
    session.commit()
    return {"ok": True}
