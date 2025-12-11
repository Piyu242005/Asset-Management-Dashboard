from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from backend.core.config import get_settings
from backend.core.db import get_session
from backend.schemas import auth as auth_schema, user as user_schema
from backend.models.user import User
from backend.auth.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
    decode_token,
)
from backend.auth.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])
settings = get_settings()


@router.post("/login", response_model=auth_schema.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access = create_access_token(user.email)
    refresh = create_refresh_token(user.email)
    return {"access_token": access, "refresh_token": refresh, "token_type": "bearer"}


@router.post("/refresh", response_model=auth_schema.Token)
def refresh_tokens(body: auth_schema.RefreshRequest, session: Session = Depends(get_session)):
    email = decode_token(body.refresh_token, expected_type="refresh")
    if not email:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    access = create_access_token(email)
    refresh = create_refresh_token(email)
    return {"access_token": access, "refresh_token": refresh, "token_type": "bearer"}


@router.post("/register", response_model=user_schema.UserRead)
def register(user_in: user_schema.UserCreate, session: Session = Depends(get_session)):
    existing = session.exec(select(User).where(User.email == user_in.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(email=user_in.email, full_name=user_in.full_name, hashed_password=get_password_hash(user_in.password), is_admin=False)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.get("/me", response_model=user_schema.UserRead)
def read_me(current_user: User = Depends(get_current_user)):
    return current_user

