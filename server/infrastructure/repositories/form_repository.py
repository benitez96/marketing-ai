from sqlmodel import select
from core.models import ChatConfig, Input, User
from .base import BaseRepository


class FormRepository(BaseRepository):
    def get_form(self, user: User) -> list[Input]:
        product = user.suscription.product.id
        statement = select(Input).where(Input.form.product.id == product)
        results = self.db.exec(statement)

        return results.all()
