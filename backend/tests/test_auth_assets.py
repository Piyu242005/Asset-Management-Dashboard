from uuid import uuid4
from fastapi.testclient import TestClient
from backend.main import app
from backend.core.db import init_db


def test_register_login_and_create_asset():
    init_db()
    client = TestClient(app)
    email = f"user-{uuid4().hex[:6]}@example.com"
    password = "secret123"

    # register
    resp = client.post(
        "/api/auth/register",
        json={"email": email, "password": password, "full_name": "Test User"},
    )
    assert resp.status_code == 200
    user_id = resp.json()["id"]
    assert user_id

    # login
    resp = client.post(
        "/api/auth/login",
        data={"username": email, "password": password},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert resp.status_code == 200
    tokens = resp.json()
    assert "access_token" in tokens

    headers = {"Authorization": f"Bearer {tokens['access_token']}"}

    # create asset
    resp = client.post(
        "/api/assets/",
        json={
            "name": "Test Asset",
            "category": "Testing",
            "type": "financial",
            "value": 12345,
            "status": "active",
            "location_id": None,
        },
        headers=headers,
    )
    assert resp.status_code == 200
    asset = resp.json()
    assert asset["name"] == "Test Asset"

