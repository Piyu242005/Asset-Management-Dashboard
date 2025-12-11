from fastapi import APIRouter, Depends
from sqlmodel import Session
from backend.core.db import get_session
from backend.auth.deps import require_admin
from backend.models import User, Asset, Location
from backend.auth.security import get_password_hash

router = APIRouter(prefix="/seed", tags=["seed"])


from sqlmodel import select

@router.post("/")
def seed_data(session: Session = Depends(get_session), current_user=Depends(require_admin)):
    # 1. Ensure Piyu admin exists
    piyu = session.exec(select(User).where(User.email == "piyu.143247@gmail.com")).first()
    if not piyu:
        piyu_admin = User(email="piyu.143247@gmail.com", full_name="Piyu", hashed_password=get_password_hash("Piyu24"), is_admin=True)
        session.add(piyu_admin)
        session.commit()
        print("Created admin user: Piyu")

    # 2. Run standard seed if DB is empty
    if session.query(User).count() <= 1: # account for the just-created user
        # Check if default admin exists to avoid duplication if Piyu was the only one
        default_admin = session.exec(select(User).where(User.email == "admin@example.com")).first()
        if not default_admin:
            admin = User(email="admin@example.com", full_name="Admin", hashed_password=get_password_hash("admin123"), is_admin=True)
            user = User(email="user@example.com", full_name="User", hashed_password=get_password_hash("password"), is_admin=False)
            session.add(admin)
            session.add(user)
            session.commit()

            hq = Location(name="HQ", city="New York", country="USA", status="active")
            eu = Location(name="EU Hub", city="Berlin", country="Germany", status="active")
            session.add(hq)
            session.add(eu)
            session.commit()
            session.refresh(hq)
            session.refresh(eu)

            assets = [
                Asset(name="Office Building", category="Real Estate", type="tangible", value=1500000, status="active", owner_id=admin.id, location_id=hq.id),
                Asset(name="Patent Portfolio", category="IP", type="intangible", value=750000, status="active", owner_id=admin.id, location_id=eu.id),
                Asset(name="Treasury Bills", category="Financial", type="financial", value=2000000, status="active", owner_id=user.id, location_id=hq.id),
                Asset(name="Cash Reserve", category="Financial", type="financial", value=500000, status="active", owner_id=user.id, location_id=eu.id),
            ]
            session.add_all(assets)
            session.commit()
    
    return {"detail": "Seeded"}

