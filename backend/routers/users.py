from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from backend.core.db import get_session
from backend.models.user import User
from backend.schemas.user import UserRead

router = APIRouter(tags=["Users"])

@router.get("/users", response_model=List[UserRead])
def read_users(
    offset: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session)
):
    users = session.exec(select(User).offset(offset).limit(limit)).all()
    return users

@router.get("/users/{user_id}", response_model=UserRead)
def read_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
