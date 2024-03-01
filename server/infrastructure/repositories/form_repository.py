from sqlmodel import select
from core.models import ChatConfig, InputConfigField, User
from .base import BaseRepository


class FormRepository(BaseRepository):
    def get_form(self, user: User) -> list[InputConfigField]:
        product = user.suscription.product.id
        statement = select(InputConfigField).where(
            InputConfigField.product_id == product
        )
        results = self.db.exec(statement)

        return results.all()
