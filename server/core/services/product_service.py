from fastapi import Depends
from core.dependencies import get_repository
from core.models import Product
from infrastructure.repositories.product_repository import ProductRepository


class ProductService:
    def __init__(
        self, product_repository: ProductRepository = Depends(get_repository(ProductRepository))
    ) -> None:
        self.product_repository = product_repository

    def get_products(self) -> list[Product]:
        return self.product_repository.get_available_products()
