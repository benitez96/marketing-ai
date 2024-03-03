from typing import Type
from fastapi import HTTPException

from sqlmodel import select
from infrastructure.repositories.base import BaseRepository
from core.models import Input, Form


class InputRepository(BaseRepository[Input]):
    @property
    def model_type(self) -> Type[Input]:
        return Input

    def get_form_inputs(self, form: Form) -> list[Input]:
        statement = (
            select(Input).where(Input.forms.contains(form)).order_by(Input.priority)
        )
        results = self.db.exec(statement)

        inputs = results.all()

        if not inputs:
            raise HTTPException(status_code=404, detail="No inputs found")

        return inputs

    def get_user_inputs(self, form) -> list[Input]:
        statement = select(Input).where(
            Input.forms.contains(form), Input.source == "user"
        )
        results = self.db.exec(statement)

        inputs = results.all()

        if not inputs:
            raise HTTPException(status_code=404, detail="No inputs found")

        return inputs
