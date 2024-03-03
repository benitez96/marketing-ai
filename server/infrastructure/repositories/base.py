from typing import Type, TypeVar, Generic, List
from sqlmodel import SQLModel, Session, select
from abc import ABC, abstractmethod

ModelType = TypeVar("ModelType", bound=SQLModel)


class BaseRepository(Generic[ModelType], ABC):
    def __init__(self, session: Session):
        self.db = session

    @property
    @abstractmethod
    def model_type(self) -> Type[ModelType]:
        pass

    def get(self, id: int) -> ModelType:
        return self.db.get(self.model_type, id)

    def get_all(self) -> List[ModelType]:
        return self.db.exec(select(self.model_type)).all()

    def create(self, obj_in: ModelType) -> ModelType:
        self.db.add(obj_in)
        self.db.commit()
        self.db.refresh(obj_in)
        return obj_in

    def update(self, id: int, obj_in: ModelType) -> ModelType:
        db_obj = self.get(id)
        if db_obj:
            obj_data = obj_in.model_dump(exclude_unset=True)
            for key, value in obj_data.items():
                setattr(db_obj, key, value)
            self.db.add(db_obj)
            self.db.commit()
            self.db.refresh(db_obj)
        return db_obj

    def delete(self, id: int) -> ModelType:
        obj = self.get(id)
        if obj:
            self.db.delete(obj)
            self.db.commit()
        return obj
