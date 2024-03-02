from fastapi import Depends
from core.dependencies import get_repository
from core.models import Chat, ChatConfig, User, Input
from core.schemas.chat import ChatCreate, ChatReadDetail, ChatUpdate
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

    def create_chat(self, user: User, chat: ChatCreate) -> ChatReadDetail:
        new_chat = Chat(**chat.model_dump())

        result = self.chat_repository.create_chat(user=user, chat=new_chat)

        return ChatReadDetail(**result.model_dump())

    def update_chat(self, user: User, chat_id: int, chat: ChatUpdate) -> ChatReadDetail:

        new_chat = Chat(**chat.model_dump())

        if chat.config:
            for k, v in chat.config.items():
                new_chat.configs.append(ChatConfig(field=k, value=v))

        result = self.chat_repository.update_chat(user=user, chat=new_chat, chat_id=chat_id)

        return ChatReadDetail(**result.model_dump(), config=chat.config)
