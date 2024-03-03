from typing import Type
from fastapi import HTTPException
from sqlmodel import select
from core.models import Chat, Input, Product, User
from .base import BaseRepository


class ChatRepository(BaseRepository[Chat]):
    @property
    def model_type(self) -> Type[Chat]:
        return Chat

    pass
