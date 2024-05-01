from typing import Type
from core.schemas.brand import BrandCreate
from fastapi import HTTPException
from sqlmodel import select
from core.models import Brand, Form, Input, Product, Session, User
from .base import BaseRepository


class BrandRepository(BaseRepository[Brand]):
    @property
    def model_type(self) -> Type[Brand]:
        return Brand

    def get_user_brands(self, user: User) -> list[Brand]:
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user.brands

    def create_brand(self, user: User, brand: BrandCreate) -> Brand:
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return self.create(Brand(**brand.dict(), user_id=user.id))

    def get_brand(self, user: User, brand_id: int) -> Brand:
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        statement = select(Brand).where(Brand.id == brand_id, Brand.user_id == user.id)

        brand = self.db.exec(statement).first()

        if not brand:
            raise HTTPException(status_code=404, detail="Brand not found")

        return brand

    def update_brand(self, user: User, brand_id: int, brand: BrandCreate) -> Brand:
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        statement = select(Brand).where(Brand.id == brand_id, Brand.user_id == user.id)

        brand_db = self.db.exec(statement).first()

        if not brand_db:
            raise HTTPException(status_code=404, detail="Brand not found")

        return self.update(brand_id, brand)

    def delete_brand(self, user: User, brand_id: int) -> Brand:
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        statement = select(Brand).where(Brand.id == brand_id, Brand.user_id == user.id)
        brand = self.db.exec(statement).first()

        if not brand:
            raise HTTPException(status_code=404, detail="Brand not found")

        return self.delete(brand_id)
