from typing import Optional
from fastapi import Depends, HTTPException, status
from jinja2 import Template
from core.dependencies import get_repository
from core.models import Chat, Prompt, User, Input
from core.schemas.chat import ChatCreate, ChatReadDetail, ChatUpdate
from core.services.gpt_service import OpenAIService
from core.settings import get_settings
from infrastructure.repositories.aimodel_repository import AIModelRepository
from infrastructure.repositories.chat_repository import ChatRepository

from pprint import pprint as print

from infrastructure.repositories.input_repository import InputRepository


settings = get_settings()


class ChatService:
    def __init__(
        self,
        chat_repository: ChatRepository = Depends(get_repository(ChatRepository)),
        input_repository: InputRepository = Depends(get_repository(InputRepository)),
        aimodel_repository: AIModelRepository = Depends(
            get_repository(AIModelRepository)
        ),
    ) -> None:
        self.chat_repository = chat_repository
        self.aimodel_repository = aimodel_repository
        self.input_repository = input_repository

    def get_chat_detail(self, user: User, chat_id: int) -> Chat:
        chat = self.chat_repository.get(chat_id)

        if user.id != chat.user_id:
            raise HTTPException(status_code=403, detail="User not authorized")

        return chat

    def create_chat(self, user: User, chat: ChatCreate) -> Chat:
        new_chat = Chat(**chat.model_dump(), user=user)
        return self.chat_repository.create(new_chat)

    def update_chat(self, user: User, chat_id: int, chat: ChatUpdate) -> ChatReadDetail:
        chat_to_edit = self.chat_repository.get(id=chat_id)

        if user.id != chat_to_edit.user_id:
            raise HTTPException(status_code=403, detail="User not authorized")

        return self.chat_repository.update(chat_id, chat)

    def init_chat(
        self, user: User, initial_conf: dict[str, str], chat_id: Optional[int] = None
    ) -> Chat:
        input_model = initial_conf.pop("ai_model")
        model = self.aimodel_repository.get_by_name(input_model)

        if not model:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="GPT model must be provided.",
            )

        model_name = model.name or "gpt-3.5-turbo"
        inputs = self.input_repository.get_form_inputs(user.suscription.product.form)

        messages = []
        for input in inputs:
            if input.name == "ai_model":
                continue
            template = Template(input.template)
            ctx = (
                initial_conf
                if input.source == "user"
                else {input.name: input.default_value}
            )
            messages.append({"role": input.role.value, "content": template.render(ctx)})

        gpt = OpenAIService(
            settings.gpt_key,
            model_name,
        )

        prompt = gpt.get_response(messages)

        if not chat_id:
            res = eval(prompt.response)
            chat = self.create_chat(
                user=user,
                chat=ChatCreate(
                    name=res.get("title", ""), description=res.get("description", "")
                ),
            )
            chat_id = chat.id

        chat = self.get_chat_detail(user=user, chat_id=chat_id)
        chat.config = initial_conf

        db_prompt = Prompt(**prompt.model_dump(), chat=chat, ai_model=model)
        chat.prompts.append(db_prompt)

        self.chat_repository.update(chat_id, chat)

        return chat
