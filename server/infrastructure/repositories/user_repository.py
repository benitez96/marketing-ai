from datetime import datetime, timedelta
from typing import Type
from fastapi import HTTPException
from sqlmodel import or_, select
from core.models import Product, Subscription, User
from .base import BaseRepository


class UserRepository(BaseRepository[User]):
    @property
    def model_type(self) -> Type[User]:
        return User

    def get_user_by_username(self, username: str) -> User | None:
        statement = select(User).where(User.username == username)
        results = self.db.exec(statement)
        user = results.first()

        return user

    def get_user_by_username_or_email(self, username: str) -> User | None:
        statement = select(User).where(
            or_(User.username == username, User.email == username)
        )
        results = self.db.exec(statement)
        user = results.first()

        return user

    def get_user_by_email(self, email: str) -> User | None:
        statement = select(User).where(User.email == email)
        results = self.db.exec(statement)
        user = results.first()

        return user

    def get_user(self, user_id: int) -> User | None:
        return self.get(user_id)
