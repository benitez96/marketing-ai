from sqlmodel import select
from core.models import User
from .base import BaseRepository


class UserRepository(BaseRepository):
    def create_user(self, user: User) -> User:
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def get_user_by_username(self, username: str) -> User | None:
        statement = select(User).where(User.username == username)
        results = self.db.exec(statement)
        user = results.first()

        return user

    def get_user(self, user_id: int | str) -> User | None:
        return self.db.get(User, user_id)
