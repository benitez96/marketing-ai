from functools import lru_cache
from fastapi import FastAPI
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    sql_engine: str = ""

    gpt_key: str
    jwt_secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    db_host: str = ""
    db_port: int = 5432
    postgres_db: str = ""
    postgres_user: str = ""
    postgres_password: str = ""


@lru_cache
def get_settings():
    return Settings()
