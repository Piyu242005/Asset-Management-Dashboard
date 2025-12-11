import sys
import os
sys.path.append(os.getcwd())
from sqlmodel import Session, select, inspect
from backend.core.db import engine
from backend.models.user import User
from backend.models.asset import Asset
from backend.models.inventory import Inventory

def check_db():
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print("Tables:", tables)
    
    with Session(engine) as session:
        users = session.exec(select(User)).all()
        print(f"Users: {len(users)}")
        for u in users:
            print(f" - {u.email} (id: {u.id})")
            
        assets = session.exec(select(Asset)).all()
        print(f"Assets: {len(assets)}")
        
        inventory = session.exec(select(Inventory)).all()
        print(f"Inventory: {len(inventory)}")

if __name__ == "__main__":
    check_db()
