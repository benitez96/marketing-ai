from fastapi import Depends
from core.dependencies import get_repository
from core.models import User, Input
from infrastructure.repositories.form_repository import FormRepository


class FormService:
    def __init__(
        self, form_repository: FormRepository = Depends(get_repository(FormRepository))
    ) -> None:
        self.form_repository = form_repository

    def get_form(self, user: User) -> list[Input]:
        return self.form_repository.get_form(user)
