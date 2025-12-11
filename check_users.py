from sqlmodel import Session, select, create_engine
from backend.models.user import User
from backend.auth.security import verify_password

sqlite_url = "sqlite:///./app.db"
engine = create_engine(sqlite_url)

with Session(engine) as session:
    user = session.exec(select(User).where(User.email == "piyu.143247@gmail.com")).first()
    if user:
        print(f"User found: {user.email}")
        is_valid = verify_password("Piyu24", user.hashed_password)
        print(f"Password 'Piyu24' matches: {is_valid}")
    else:
        print("User not found")
