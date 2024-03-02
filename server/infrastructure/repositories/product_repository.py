from sqlmodel import select
from core.models import Product
from .base import BaseRepository


class ProductRepository(BaseRepository):

    def get_available_products(self) -> list[Product]:
        statement = select(Product).where(Product.is_published)
        results = self.db.exec(statement)

        return results.all()
