"""Unit tests for /api/v1/passwords/* endpoints (CRUD + ownership isolation)."""

from .conftest import create_test_user


def _make_payload(
    service_name="GitHub",
    login="user@example.com",
    password="secret",
    service_url=None,
):
    payload = {"service_name": service_name, "login": login, "password": password}
    if service_url:
        payload["service_url"] = service_url
    return payload


# ── Create ───────────────────────────────────────────────────────────────────


def test_create_password_returns_detail(auth_client):
    resp = auth_client.post("/api/v1/passwords/", json=_make_payload())
    assert resp.status_code == 200
    body = resp.json()
    assert body["service_name"] == "GitHub"
    assert body["login"] == "user@example.com"
    assert "id" in body


def test_create_password_with_service_url(auth_client):
    resp = auth_client.post(
        "/api/v1/passwords/",
        json=_make_payload(service_url="https://github.com"),
    )
    assert resp.status_code == 200
    assert resp.json()["service_url"] == "https://github.com"


def test_create_duplicate_password_returns_409(auth_client):
    auth_client.post("/api/v1/passwords/", json=_make_payload())
    resp = auth_client.post("/api/v1/passwords/", json=_make_payload())
    assert resp.status_code == 409


# ── List ─────────────────────────────────────────────────────────────────────


def test_list_passwords_returns_created_entries(auth_client):
    auth_client.post("/api/v1/passwords/", json=_make_payload("GitHub", "a@b.com", "p1"))
    auth_client.post("/api/v1/passwords/", json=_make_payload("GitLab", "a@b.com", "p2"))
    resp = auth_client.get("/api/v1/passwords/")
    assert resp.status_code == 200
    assert len(resp.json()) == 2


def test_list_passwords_empty_when_none_created(auth_client):
    resp = auth_client.get("/api/v1/passwords/")
    assert resp.status_code == 200
    assert resp.json() == []


# ── Detail ───────────────────────────────────────────────────────────────────


def test_get_password_detail_decrypts_password(auth_client):
    create_resp = auth_client.post(
        "/api/v1/passwords/", json=_make_payload(password="mysecret")
    )
    pid = create_resp.json()["id"]
    resp = auth_client.get(f"/api/v1/passwords/{pid}")
    assert resp.status_code == 200
    assert resp.json()["password"] == "mysecret"


def test_get_password_not_found_returns_404(auth_client):
    resp = auth_client.get("/api/v1/passwords/99999")
    assert resp.status_code == 404


def test_get_password_of_other_user_returns_404(client, db):
    """Password created by user A must not be visible to user B."""
    # Create user A and their password
    create_test_user(db, username="userA", password="passA")
    resp_a = client.post(
        "/api/v1/jwt/login/", data={"username": "userA", "password": "passA"}
    )
    assert resp_a.status_code == 200

    create_resp = client.post("/api/v1/passwords/", json=_make_payload())
    pid = create_resp.json()["id"]

    # Log out A, log in as B
    client.post("/api/v1/jwt/logout/")
    create_test_user(db, username="userB", password="passB")
    client.post(
        "/api/v1/jwt/login/", data={"username": "userB", "password": "passB"}
    )

    resp = client.get(f"/api/v1/passwords/{pid}")
    assert resp.status_code == 404


# ── Patch ────────────────────────────────────────────────────────────────────


def test_patch_password_updates_fields(auth_client):
    create_resp = auth_client.post("/api/v1/passwords/", json=_make_payload())
    pid = create_resp.json()["id"]
    resp = auth_client.patch(
        f"/api/v1/passwords/{pid}",
        json={"service_name": "Bitbucket", "password": "newpass"},
    )
    assert resp.status_code == 200
    assert resp.json()["service_name"] == "Bitbucket"


def test_patch_nonexistent_password_returns_404(auth_client):
    resp = auth_client.patch(
        "/api/v1/passwords/99999", json={"service_name": "X"}
    )
    assert resp.status_code == 404


# ── Delete ───────────────────────────────────────────────────────────────────


def test_delete_password_removes_entry(auth_client):
    create_resp = auth_client.post("/api/v1/passwords/", json=_make_payload())
    pid = create_resp.json()["id"]
    del_resp = auth_client.delete(f"/api/v1/passwords/{pid}")
    assert del_resp.status_code == 200
    assert auth_client.get(f"/api/v1/passwords/{pid}").status_code == 404


def test_delete_nonexistent_password_returns_404(auth_client):
    resp = auth_client.delete("/api/v1/passwords/99999")
    assert resp.status_code == 404
