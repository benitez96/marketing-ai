from sqlmodel import Session, SQLModel, create_engine

from core.settings import get_settings


settings = get_settings()

if settings.sql_engine == "postgresql":
    # db_connection_string = f"postgresql://{settings.postgres_user}:{settings.postgres_password}@postgres/{settings.postgres_db}"
    db_connection_string = f"postgresql://{settings.postgres_user}:{settings.postgres_password}@db/{settings.postgres_db}"
else:
    db_connection_string = "sqlite:///database.db"


engine = create_engine(db_connection_string, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
