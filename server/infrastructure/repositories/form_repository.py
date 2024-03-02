from fastapi import HTTPException
from sqlmodel import select
from core.models import Input, Product, User
from .base import BaseRepository


class FormRepository(BaseRepository):
    def get_form(self, user: User) -> list[Input]:
        if not user.suscription:
            self.get_free_form()

        product = user.suscription.product

        if not product or not product.form or not product.is_published:
            raise HTTPException(status_code=404, detail="Form not found")

        return product.form.inputs.all()

    def get_free_form(self) -> list[Input]:
        statement = select(Product).where(
            Product.is_published, Product.name.contains("free")
        )
        results = self.db.exec(statement)

        product = results.first()
        if not product or not product.form:
            raise HTTPException(status_code=404, detail="Free form not found")

        return product.form.inputs.all()
