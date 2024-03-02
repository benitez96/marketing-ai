from fastapi import Depends
from core.dependencies import get_repository
from core.models import User, Input
from core.schemas.chat import ChatReadDetail
from infrastructure.repositories.chat_repository import ChatRepository


class ChatService:
    def __init__(
        self, chat_repository: ChatRepository = Depends(get_repository(ChatRepository))
    ) -> None:
        self.chat_repository = chat_repository

    def get_chat_detail(self, user: User, chat_id: int) -> ChatReadDetail:
        chat = self.chat_repository.get_chat_detail(user=user, chat_id=chat_id)

        config = {config.field: config.value for config in chat.configs}

        return ChatReadDetail(**chat.model_dump(), config=config, prompts=chat.prompts)
