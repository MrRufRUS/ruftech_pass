"""Unit tests for /api/v1/jwt/* endpoints (signup, login, me, logout, delete)."""

from .conftest import create_test_user


# ── Signup ──────────────────────────────────────────────────────────────────


def test_signup_creates_user(client):
    resp = client.post(
        "/api/v1/jwt/signup/",
        data={"username": "alice", "password": "secret123"},
    )
    assert resp.status_code == 201
    assert resp.json() == {"message": "User created"}


def test_signup_duplicate_username_returns_400(client):
    client.post("/api/v1/jwt/signup/", data={"username": "bob", "password": "pass"})
    resp = client.post(
        "/api/v1/jwt/signup/", data={"username": "bob", "password": "other"}
    )
    assert resp.status_code == 400
    assert "Username already exists" in resp.json()["detail"]


def test_signup_duplicate_email_returns_400(client):
    client.post(
        "/api/v1/jwt/signup/",
        data={"username": "user1", "password": "pass", "email": "same@example.com"},
    )
    resp = client.post(
        "/api/v1/jwt/signup/",
        data={"username": "user2", "password": "pass", "email": "same@example.com"},
    )
    assert resp.status_code == 400
    assert "Email already exists" in resp.json()["detail"]


# ── Login ────────────────────────────────────────────────────────────────────


def test_login_returns_token(client, db):
    create_test_user(db, username="carol", password="mypassword")
    resp = client.post(
        "/api/v1/jwt/login/",
        data={"username": "carol", "password": "mypassword"},
    )
    assert resp.status_code == 200
    body = resp.json()
    assert "access_token" in body
    assert body["token_type"] == "Bearer"


def test_login_wrong_password_returns_401(client, db):
    create_test_user(db, username="dave", password="correct")
    resp = client.post(
        "/api/v1/jwt/login/",
        data={"username": "dave", "password": "wrong"},
    )
    assert resp.status_code == 401


def test_login_nonexistent_user_returns_401(client):
    resp = client.post(
        "/api/v1/jwt/login/",
        data={"username": "ghost", "password": "pass"},
    )
    assert resp.status_code == 401


# ── /me ──────────────────────────────────────────────────────────────────────


def test_get_me_returns_user_info(auth_client):
    resp = auth_client.get("/api/v1/jwt/me/")
    assert resp.status_code == 200
    body = resp.json()
    assert body["username"] == "testuser"
    assert "id" in body


def test_get_me_without_auth_returns_401(client):
    resp = client.get("/api/v1/jwt/me/")
    assert resp.status_code == 401


def test_patch_me_updates_email(auth_client):
    resp = auth_client.patch(
        "/api/v1/jwt/me/", json={"email": "new@example.com"}
    )
    assert resp.status_code == 200
    assert resp.json()["email"] == "new@example.com"


# ── Logout / Delete ──────────────────────────────────────────────────────────


def test_logout_returns_ok(auth_client):
    resp = auth_client.post("/api/v1/jwt/logout/")
    assert resp.status_code == 200
    assert resp.json() == {"message": "Logged out"}


def test_delete_user_removes_account(auth_client):
    resp = auth_client.delete("/api/v1/jwt/delete/")
    assert resp.status_code == 200
    assert resp.json() == {"message": "User deleted"}
