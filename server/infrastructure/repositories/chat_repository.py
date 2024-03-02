from fastapi import HTTPException
from sqlmodel import select
from core.models import Chat, Input, Product, User
from .base import BaseRepository


class ChatRepository(BaseRepository):
    def get_chat_detail(self, user: User, chat_id: int) -> Chat:
        chat = self.db.get(Chat, chat_id)

        if not chat:
            raise HTTPException(status_code=404, detail="Chat not found")

        if chat.user_id != user.id:
            raise HTTPException(status_code=403, detail="User not authorized")

        return chat

    def create_chat(self, user: User, chat: Chat) -> Chat:
        chat.user = user

        self.db.add(chat)
        self.db.commit()
        self.db.refresh(chat)

        return chat
