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


# ── Cookie-based auth ─────────────────────────────────────────────────────────


def test_get_me_via_cookie_auth(client, db):
    """Token sent as cookie (not Authorization header) must be accepted."""
    create_test_user(db, username="cookieuser", password="cookiepass")
    login_resp = client.post(
        "/api/v1/jwt/login/",
        data={"username": "cookieuser", "password": "cookiepass"},
    )
    assert login_resp.status_code == 200
    token = login_resp.json()["access_token"]

    # Call /me/ with only the cookie, no Authorization header
    client.cookies.set("access_token", token)
    resp = client.get("/api/v1/jwt/me/")
    assert resp.status_code == 200
    assert resp.json()["username"] == "cookieuser"


# ── Invalid / malformed tokens ────────────────────────────────────────────────


def test_invalid_jwt_token_returns_401(client):
    """Garbage Bearer token triggers InvalidTokenError → 401."""
    resp = client.get(
        "/api/v1/jwt/me/",
        headers={"Authorization": "Bearer not.a.valid.jwt"},
    )
    assert resp.status_code == 401


def test_jwt_without_username_claim_returns_401(client):
    """Valid JWT signed with the correct key but missing 'username' → 401."""
    import sys

    sys.path.insert(0, "/home/r/common/code/itmo-devops-project/backend/app")
    from api.v1.users.utils import encode_jwt

    # Payload deliberately omits 'username'
    token = encode_jwt({"sub": "42"})
    resp = client.get(
        "/api/v1/jwt/me/",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 401


def test_token_for_deleted_user_returns_401(client, db):
    """Token issued to a user who was later deleted → 401."""
    create_test_user(db, username="ghost2", password="pass")
    login_resp = client.post(
        "/api/v1/jwt/login/",
        data={"username": "ghost2", "password": "pass"},
    )
    token = login_resp.json()["access_token"]

    # Remove the user directly from DB
    from db.models import User

    user = db.query(User).filter(User.username == "ghost2").first()
    db.delete(user)
    db.commit()

    resp = client.get(
        "/api/v1/jwt/me/",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 401


# ── Patch password field ──────────────────────────────────────────────────────


def test_patch_me_updates_password(auth_client):
    """PATCH /me/ with a new password updates the hash and clears the cookie."""
    resp = auth_client.patch("/api/v1/jwt/me/", json={"password": "newpassword123"})
    assert resp.status_code == 200
    # Cookie should be cleared (set-cookie with empty value or max-age=0)
    set_cookie = resp.headers.get("set-cookie", "")
    assert "access_token" in set_cookie


def test_patch_me_only_password_no_email_change(auth_client):
    """PATCH with only password — email branch must be skipped without error."""
    resp = auth_client.patch("/api/v1/jwt/me/", json={"password": "another123"})
    assert resp.status_code == 200
    # email field untouched (was None for testuser)
    assert resp.json()["email"] is None
