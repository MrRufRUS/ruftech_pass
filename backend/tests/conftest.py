import os

# Set env vars before ANY app imports so session.py creates engine with valid URL
os.environ.setdefault("DATABASE_URL", "sqlite:///:memory:")
# Valid Fernet key (32 null bytes, base64url encoded — safe for tests only)
os.environ.setdefault(
    "PASSWORD_SECRET_KEY", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
)

import bcrypt
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

TEST_DB_URL = "sqlite:///:memory:"


@pytest.fixture(scope="session")
def test_engine():
    """
    Single in-memory SQLite engine shared across all tests in the session.

    StaticPool ensures all sessions reuse the same underlying connection so
    tables created by create_all() are visible to every subsequent query.
    Models must be imported before create_all() so SQLAlchemy knows the schema.
    """
    import db.models  # registers User/Password with Base.metadata  # noqa: F401
    from db.database import Base

    engine = create_engine(
        TEST_DB_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(bind=engine)
    yield engine
    engine.dispose()


@pytest.fixture(autouse=True)
def clean_tables(test_engine):
    """Delete all rows between tests to keep tests isolated."""
    yield
    from db.database import Base

    with test_engine.connect() as conn:
        for table in reversed(Base.metadata.sorted_tables):
            conn.execute(table.delete())
        conn.commit()


@pytest.fixture
def db(test_engine):
    """Function-scoped SQLAlchemy session bound to the test engine."""
    TestingSession = sessionmaker(
        autocommit=False, autoflush=False, bind=test_engine
    )
    session = TestingSession()
    yield session
    session.close()


@pytest.fixture
def client(db):
    """TestClient with get_db overridden to use the test session."""
    from db.depedency import get_db
    from main import app

    def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


def create_test_user(db, username="testuser", password="testpass", email=None):
    """
    Insert a user whose password_hash is stored in PostgreSQL hex format.

    The app reads passwords back with:
        bytes.fromhex(user.password_hash[2:])
    meaning it strips the first two chars (\\x) then hex-decodes.
    We replicate this format in SQLite by storing "\\x" + bcrypt_bytes.hex().
    """
    from db.models import User

    raw_hash: bytes = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    # Simulate PostgreSQL bytea storage: \x<hex>
    pg_hex_hash = "\\x" + raw_hash.hex()
    user = User(username=username, password_hash=pg_hex_hash, email=email)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@pytest.fixture
def auth_client(client, db):
    """TestClient pre-authenticated as 'testuser'."""
    create_test_user(db, username="testuser", password="testpass")
    resp = client.post(
        "/api/v1/jwt/login/",
        data={"username": "testuser", "password": "testpass"},
    )
    assert resp.status_code == 200, resp.text
    return client
