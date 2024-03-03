from datetime import datetime, timedelta
from typing import Type
from fastapi import HTTPException
from sqlmodel import select
from core.models import Product, Subscription, User
from .base import BaseRepository


class ProductRepository(BaseRepository[Product]):
    @property
    def model_type(self) -> Type[Product]:
        return Product

    def get_available_products(self) -> list[Product]:
        statement = select(Product).where(Product.is_published)
        results = self.db.exec(statement)

        products = results.all()

        if not products:
            raise HTTPException(status_code=404, detail="No products found")

        return products

    def subscribe(self, user_id: int, product_id: int) -> Product:
        product = self.get(product_id)

        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        user = self.db.get(User, user_id)

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        subscription = Subscription(
            product_id=product_id,
            user_id=user_id,
            end_date=datetime.now() + timedelta(days=30),
        )

        self.db.add(subscription)
        self.db.commit()
        self.db.refresh(product)

        return product
