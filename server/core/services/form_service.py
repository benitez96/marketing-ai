from fastapi import Depends
from core.dependencies import get_repository
from core.models import InputConfigField, User
from infrastructure.repositories.form_repository import FormRepository

class FormService:

    def __init__(
        self, form_repository: FormRepository = Depends(get_repository(FormRepository))
    ) -> None:
        self.form_repository = form_repository

    def get_form(self, user: User) -> list[InputConfigField]:
        return self.form_repository.get_form(user)

