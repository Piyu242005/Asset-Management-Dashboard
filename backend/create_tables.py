import sys
import os
sys.path.append(os.getcwd())
from backend.core.db import init_db, engine
from sqlmodel import Session
from backend.models.user import User
from backend.models.asset import Asset
from backend.models.inventory import Inventory
from backend.models.financial import Financial
from backend.models.maintenance import Maintenance
from backend.models.schedule import Schedule
# Import Location if it exists, wrapping in try/except just in case
try:
    from backend.models.location import Location
except ImportError:
    pass

def create_tables():
    init_db()
    print("Tables created successfully.")

if __name__ == "__main__":
    create_tables()
