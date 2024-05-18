from typing import Type
from sqlalchemy.orm import joinedload
from fastapi import HTTPException
from sqlmodel import select
from core.models import Form, Input
from .base import BaseRepository


class FormRepository(BaseRepository[Form]):
    @property
    def model_type(self) -> Type[Form]:
        return Form

    def get_public_forms(self) -> list[Form]:
        statement = select(Form).where(Form.is_public)
        results = self.db.exec(statement)
        return results.all()

    def get_form(self, name: str) -> list[Input]:
        form = self.get_by_name(name)

        if not form:
            raise HTTPException(status_code=404, detail="Form not found")

        statement = select(Input).where(
            Input.forms.contains(form), Input.source == "user"
        )
        results = self.db.exec(statement)

        inputs = results.all()

        if not inputs:
            raise HTTPException(status_code=404, detail="No inputs found")

        return inputs

    def get_by_name(self, name: str) -> Form:
        statement = select(Form).where(Form.name == name)
        result = self.db.exec(statement).first()
        if not result:
            raise HTTPException(status_code=404, detail="Form not found")
        return result

    def get_form_detail(self, name: str) -> Form:
        statement = (
            select(Form)
            .options(joinedload(Form.inputs))
            .where(Form.name == name)
        )
        form = self.db.exec(statement).first()
        if not form:
            raise HTTPException(status_code=404, detail="Form not found")

        return form

