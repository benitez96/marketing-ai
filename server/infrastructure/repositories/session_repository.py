from sqlmodel import select
from typing import Type
from core.models import Session, User
from .base import BaseRepository


class SessionRepository(BaseRepository[Session]):
    @property
    def model_type(self) -> Type[Session]:
        return Session

    def get_filtered_sessions(self, user: User, filters: dict) -> list[Session]:
        statement = select(Session).where(Session.user_id == user.id)

        for key, value in filters.items():
            if not value:
                continue
            if not hasattr(Session, key):
                continue

            statement = statement.where(getattr(Session, key) == value)

        results = self.db.exec(statement)

        return results.all()
