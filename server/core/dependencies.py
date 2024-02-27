from typing import Callable, Type
from fastapi import Depends

from core.database import get_session, Session
from infrastructure.repositories.base import BaseRepository


def get_repository(Repo_type: Type[BaseRepository]) -> Callable:
    def get_repo(db: Session = Depends(get_session)) -> Type[BaseRepository]:
        return Repo_type(db)

    return get_repo
