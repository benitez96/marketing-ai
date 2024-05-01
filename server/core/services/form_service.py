from fastapi import Depends
from jinja2 import Template
from core.dependencies import get_repository
from core.models import Prompt, User, Input
from core.services.gpt_service import OpenAIService
from core.settings import get_settings
from infrastructure.repositories.form_repository import FormRepository
from infrastructure.repositories.input_repository import InputRepository


settings = get_settings()


class FormService:
    def __init__(
        self,
        form_repository: FormRepository = Depends(get_repository(FormRepository)),
        input_repository: InputRepository = Depends(get_repository(InputRepository)),
    ) -> None:
        self.form_repository = form_repository
        self.input_repository = input_repository

    def get_form(self, user: User = None) -> list[Input]:
        if not user:
            return self.form_repository.get_free_form()

        return self.form_repository.get_form(user)

    def call_form(self, form_id: int, params: dict[str, str]) -> Prompt:
        form = self.form_repository.get(form_id)
        model_name = getattr(params, "ai_model", "gpt-3.5-turbo")

        inputs = self.input_repository.get_form_inputs(form)

        messages = []
        for input in inputs:
            if input.name == "ai_model":
                continue
            template = Template(input.template)
            ctx = (
                params if input.source == "user" else {input.name: input.default_value}
            )
            messages.append({"role": input.role.value, "content": template.render(ctx)})

        gpt = OpenAIService(
            settings.gpt_key,
            model_name,
        )

        return gpt.get_response(messages)


    def call_form_by_slug(self, form_name: str, params: dict[str, str]) -> Prompt:
        form = self.form_repository.get_by_name(form_name)
        model_name = getattr(params, "ai_model", "gpt-3.5-turbo")

        inputs = self.input_repository.get_form_inputs(form)

        messages = []
        for input in inputs:
            if input.name == "ai_model":
                continue
            template = Template(input.template)
            ctx = (
                params if input.source == "user" else {input.name: input.default_value}
            )
            messages.append({"role": input.role.value, "content": template.render(ctx)})

        gpt = OpenAIService(
            settings.gpt_key,
            model_name,
        )

        return gpt.get_response(messages)
