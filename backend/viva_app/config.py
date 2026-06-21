import os

_database_url = os.environ.get("DATABASE_URL", "sqlite:///viva_coordination.db")
if _database_url.startswith("postgres://"):
    # Some providers hand out the legacy "postgres://" scheme, which SQLAlchemy 1.4+ rejects.
    _database_url = _database_url.replace("postgres://", "postgresql://", 1)


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")

    SQLALCHEMY_DATABASE_URI = _database_url

    SQLALCHEMY_TRACK_MODIFICATIONS = False