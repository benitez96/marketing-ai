from typing import Type
from infrastructure.repositories.base import BaseRepository
from core.models import AIModel


class AIModelRepository(BaseRepository[AIModel]):
    @property
    def model_type(self) -> Type[AIModel]:
        return AIModel

    def get_by_name(self, name: str) -> AIModel:
        return (
            self.db.query(self.model_type).filter(self.model_type.name == name).first()
        )
