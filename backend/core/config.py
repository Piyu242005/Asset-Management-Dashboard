from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Asset Dashboard API"
    api_prefix: str = "/api"
    secret_key: str = "change-me"
    access_token_expire_minutes: int = 30
    refresh_token_expire_minutes: int = 60 * 24 * 7
    algorithm: str = "HS256"

    sql_database_url: str = "sqlite:///./app.db"
    cors_origins: List[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"
        case_sensitive = False

    @property
    def cors_origin_list(self) -> List[str]:
        # allow comma separated origins in env
        origins: List[str] = []
        for origin in self.cors_origins:
            parts = [o.strip() for o in origin.split(",") if o.strip()]
            origins.extend(parts if parts else [origin])
        return origins or ["*"]


@lru_cache
def get_settings() -> Settings:
    return Settings()

