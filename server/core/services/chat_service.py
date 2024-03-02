from fastapi import Depends, HTTPException
from core.dependencies import get_repository
from core.models import Chat, ChatConfig, User, Input
from core.schemas.chat import ChatCreate, ChatReadDetail, ChatUpdate
from infrastructure.repositories.chat_repository import ChatRepository
# from infrastructure.repositories.openai_repository import OpenAIRepository


class ChatService:
    def __init__(
        self, 
        chat_repository: ChatRepository = Depends(get_repository(ChatRepository)),
        # openai_repository: OpenAIRepository = Depends(get_repository(OpenAIRepository))
    ) -> None:
        self.chat_repository = chat_repository

    def get_chat_detail(self, user: User, chat_id: int) -> ChatReadDetail:
        chat = self.chat_repository.get(chat_id)

        if user.id != chat.user_id:
            raise HTTPException(status_code=403, detail="User not authorized")

        config = {}
        if chat.configs:
            config = {config.field: config.value for config in chat.configs}

        return ChatReadDetail(**chat.model_dump(), config=config, prompts=chat.prompts)

    def create_chat(self, user: User, chat: ChatCreate) -> Chat:
        new_chat = Chat(**chat.model_dump(), user=user)
        return self.chat_repository.create(new_chat)

    def update_chat(self, user: User, chat_id: int, chat: ChatUpdate) -> ChatReadDetail:


        chat_to_edit = self.chat_repository.get(id=chat_id)

        if user.id != chat_to_edit.user_id:
            raise HTTPException(status_code=403, detail="User not authorized")

        new_chat = Chat(**chat.model_dump())

        if chat.config:
            for k, v in chat.config.items():
                new_chat.configs.append(ChatConfig(field=k, value=v))

        result = self.chat_repository.update(chat_id, new_chat)

        return ChatReadDetail(**result.model_dump(), config=chat.config)


    # def init_chat(self, user: User, chat_id: int, initial_conf: dict[str, str]) -> ChatReadDetail:

    #     chat = self.get_chat_detail(user=user, chat_id=chat_id)
    #     self.update_chat(user=user, chat_id=chat_id, chat=ChatUpdate(config=initial_conf))

    #     prompt = self.openai_repository.init_chat(config=initial_conf)

    #     chat.prompts.append(prompt)

    #     self.update_chat(chat_id=chat_id, data=chat)

    #     return ChatReadDetail(**chat.model_dump(), config={}, prompts=chat.prompts)
