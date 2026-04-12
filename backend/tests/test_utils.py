"""Unit tests for utils.py and db/depedency.py — branch coverage."""

import sys
from datetime import timedelta
from unittest.mock import MagicMock, patch

sys.path.insert(0, "/home/r/common/code/itmo-devops-project/backend/app")


# ── encode_jwt / decode_jwt branch coverage ───────────────────────────────────


def test_encode_jwt_with_explicit_key_and_expire_timedelta():
    """
    Covers two branches in encode_jwt:
    - key is NOT None → skip private_key_path.read_text() (line 26->28)
    - expire_timedelta is provided → use it instead of minutes (line 31)
    """
    from api.v1.users.utils import decode_jwt, encode_jwt
    from core.config import settings

    private_key = settings.auth_jwt.private_key_path.read_text()
    public_key = settings.auth_jwt.public_key_path.read_text()

    token = encode_jwt(
        {"username": "alice", "sub": "1"},
        key=private_key,
        expire_timedelta=timedelta(minutes=10),
    )
    payload = decode_jwt(token, public_key=public_key)
    assert payload["username"] == "alice"


def test_decode_jwt_with_explicit_public_key():
    """
    Covers the branch in decode_jwt where public_key is NOT None (line 45->47).
    """
    from api.v1.users.utils import decode_jwt, encode_jwt
    from core.config import settings

    public_key = settings.auth_jwt.public_key_path.read_text()
    token = encode_jwt({"username": "bob", "sub": "2"})

    payload = decode_jwt(token, public_key=public_key)
    assert payload["username"] == "bob"


# ── get_db branch coverage ────────────────────────────────────────────────────


def test_get_db_yields_session_and_closes_on_exit():
    """
    Covers depedency.py lines 8-12 (try: yield db; finally: db.close()).
    """
    from db.depedency import get_db

    mock_session = MagicMock()
    with patch("db.depedency.SessionLocal", return_value=mock_session):
        gen = get_db()
        session = next(gen)
        assert session is mock_session
        # Exhaust generator (triggers finally block)
        try:
            next(gen)
        except StopIteration:
            pass
        mock_session.close.assert_called_once()
