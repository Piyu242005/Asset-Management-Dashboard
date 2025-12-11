from datetime import datetime, timedelta
from typing import Any, Optional
from jose import jwt, JWTError
from passlib.context import CryptContext
from backend.core.config import get_settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
settings = get_settings()


def _create_token(subject: str, expires_delta: timedelta, token_type: str) -> str:
    expire = datetime.utcnow() + expires_delta
    to_encode = {"exp": expire, "sub": subject, "type": token_type}
    return jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)


def create_access_token(subject: str) -> str:
    return _create_token(
        subject=subject,
        expires_delta=timedelta(minutes=settings.access_token_expire_minutes),
        token_type="access",
    )


def create_refresh_token(subject: str) -> str:
    return _create_token(
        subject=subject,
        expires_delta=timedelta(minutes=settings.refresh_token_expire_minutes),
        token_type="refresh",
    )


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def decode_token(token: str, expected_type: str = "access") -> Optional[str]:
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        if payload.get("type") != expected_type:
            return None
        return payload.get("sub")
    except JWTError:
        return None

