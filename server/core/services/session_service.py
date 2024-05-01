from typing import Optional
from fastapi import Depends, HTTPException, status
from jinja2 import Template
from core.dependencies import get_repository
from core.models import Session, Prompt, User, Input
from core.schemas.session import (
    AnalyzedMetadata,
    SessionCreate,
    SessionRead,
    SessionReadDetail,
    SessionUpdate,
)
from core.services.gpt_service import OpenAIService
from core.settings import get_settings
from infrastructure.repositories.aimodel_repository import AIModelRepository
from infrastructure.repositories.session_repository import SessionRepository
from infrastructure.repositories.brand_repository import BrandRepository

from pprint import pprint as print

from infrastructure.repositories.input_repository import InputRepository


settings = get_settings()


class SessionService:
    def __init__(
        self,
        session_repository: SessionRepository = Depends(
            get_repository(SessionRepository)
        ),
        input_repository: InputRepository = Depends(get_repository(InputRepository)),
        aimodel_repository: AIModelRepository = Depends(
            get_repository(AIModelRepository)
        ),
        brand_repository: BrandRepository = Depends(get_repository(BrandRepository)),
    ) -> None:
        self.session_repository = session_repository
        self.aimodel_repository = aimodel_repository
        self.input_repository = input_repository
        self.brand_repository = brand_repository

    def get_session_detail(self, user: User, session_id: int) -> Session:
        session = self.session_repository.get(session_id)

        if user.id != session.user_id:
            raise HTTPException(status_code=403, detail="User not authorized")

        return session

    def update_session(
        self, user: User, session_id: int, session: SessionUpdate
    ) -> SessionReadDetail:
        session_to_edit = self.session_repository.get(id=session_id)

        if user.id != session_to_edit.user_id:
            raise HTTPException(status_code=403, detail="User not authorized")

        return self.session_repository.update(session_id, session)

    def init_session(
        self,
        user: User,
        brand_id: int,
        initial_conf: dict[str, str],
    ) -> Session:
        model = self.aimodel_repository.get_by_name(settings.gpt_model)
        brand = self.brand_repository.get_brand(user, brand_id)
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
            model.name,
        )

        prompt = gpt.get_response(messages)

        res = eval(prompt.response)

        session = Session(
            user=user,
            name=res.get("title", ""),
            description=res.get("description", ""),
            brand=brand,
            config=initial_conf,
            prompts=[Prompt(**prompt.model_dump(), ai_model=model)],
        )

        return self.session_repository.create(session)

    def analyze_metadata(
        self,
        metadata: str,
    ) -> AnalyzedMetadata:
        model = self.aimodel_repository.get_by_name(settings.gpt_model)

        gpt = OpenAIService(
            settings.gpt_key,
            model.name,
        )

        title_messages = [
            {
                "role": "system",
                "content": "You are a useful assistant. You always answer precisely, you do not give introductions to the answers",
            },
            {
                "role": "user",
                "content": "I dont want anything else, just the name of the website. For example: Youtube, Google, Facebook, etc.",
            },
            {
                "role": "user",
                "content": f"Extract the name of the website from the given metadata: ```{metadata}```",
            },
        ]

        description_messages = [
            {
                "role": "system",
                "content": "You are a useful assistant. You always answer precisely, you do not give introductions to the answers",
            },
            {
                "role": "user",
                "content": "I dont want anything else, just the description.",
            },
            {
                "role": "user",
                "content": f"Extract a brief description of the website from the given metadata: ```{metadata}```",
            },
        ]

        title_res = gpt.get_response(title_messages)
        description_res = gpt.get_response(description_messages)

        return {"title": title_res.response, "description": description_res.response}

    def delete_session(self, user: User, session_id: int):
        session = self.session_repository.get(session_id)

        if user.id != session.user_id:
            raise HTTPException(status_code=403, detail="User not authorized")

        return self.session_repository.delete(session_id)
