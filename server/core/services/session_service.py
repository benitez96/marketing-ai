from typing import Optional
from fastapi import Depends, HTTPException, status
from jinja2 import Template
from core.dependencies import get_repository
from core.models import Session, Prompt, User, Input
from core.schemas.session import AnalyzedMetadata, SessionCreate, SessionReadDetail, SessionUpdate
from core.services.gpt_service import OpenAIService
from core.settings import get_settings
from infrastructure.repositories.aimodel_repository import AIModelRepository
from infrastructure.repositories.session_repository import SessionRepository

from pprint import pprint as print

from infrastructure.repositories.input_repository import InputRepository


settings = get_settings()


class SessionService:
    def __init__(
        self,
        session_repository: SessionRepository = Depends(get_repository(SessionRepository)),
        input_repository: InputRepository = Depends(get_repository(InputRepository)),
        aimodel_repository: AIModelRepository = Depends(
            get_repository(AIModelRepository)
        ),
    ) -> None:
        self.session_repository = session_repository
        self.aimodel_repository = aimodel_repository
        self.input_repository = input_repository

    def get_session_detail(self, user: User, session_id: int) -> Session:
        session = self.session_repository.get(session_id)

        if user.id != session.user_id:
            raise HTTPException(status_code=403, detail="User not authorized")

        return session

    def create_session(self, user: User, session: SessionCreate) -> Session:
        new_session = Session(**session.model_dump(), user=user)
        return self.session_repository.create(new_session)

    def update_session(self, user: User, session_id: int, session: SessionUpdate) -> SessionReadDetail:
        session_to_edit = self.session_repository.get(id=session_id)

        if user.id != session_to_edit.user_id:
            raise HTTPException(status_code=403, detail="User not authorized")

        return self.session_repository.update(session_id, session)

    def init_session(
        self, user: User, initial_conf: dict[str, str], session_id: Optional[int] = None
    ) -> Session:
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

        if not session_id:
            res = eval(prompt.response)
            session = self.create_session(
                user=user,
                session=SessionCreate(
                    name=res.get("title", ""), description=res.get("description", "")
                ),
            )
            session_id = session.id

        session = self.get_session_detail(user=user, session_id=session_id)
        session.config = initial_conf

        db_prompt = Prompt(**prompt.model_dump(), session=session, ai_model=model)
        session.prompts.append(db_prompt)

        self.session_repository.update(session_id, session)

        return session

    def analyze_metadata(
        self,
        metadata: str,
    ) -> AnalyzedMetadata:
        model = self.aimodel_repository.get_by_name("gpt-3.5-turbo")

        if not model:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="GPT model must be provided.",
            )

        model_name = model.name or "gpt-3.5-turbo"

        gpt = OpenAIService(
            settings.gpt_key,
            model_name,
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
