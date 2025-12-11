from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.core.config import get_settings
from backend.core.db import init_db
from backend.routers import auth, assets, dashboard, seed, maintenance, inventory, financial, schedule, users


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title=settings.app_name)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    api_prefix = settings.api_prefix
    app.include_router(auth.router, prefix=api_prefix)
    app.include_router(assets.router, prefix=api_prefix)
    app.include_router(dashboard.router, prefix=api_prefix)
    app.include_router(seed.router, prefix=api_prefix)
    app.include_router(maintenance.router, prefix=api_prefix)
    app.include_router(inventory.router, prefix=api_prefix)
    app.include_router(financial.router, prefix=api_prefix)
    app.include_router(schedule.router, prefix=api_prefix)
    app.include_router(users.router, prefix=api_prefix)

    @app.on_event("startup")
    def on_startup():
        init_db()

    @app.get("/")
    def health():
        return {"status": "ok"}

    return app


app = create_app()

