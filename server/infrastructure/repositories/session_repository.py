from typing import Type
from core.models import Session
from .base import BaseRepository


class SessionRepository(BaseRepository[Session]):
    @property
    def model_type(self) -> Type[Session]:
        return Session

    pass
