from fastapi import Depends
from core.dependencies import get_repository
from core.models import Brand, User
from infrastructure.repositories.brand_repository import BrandRepository


class BrandService:
    def __init__(
        self,
        brand_repository: BrandRepository = Depends(get_repository(BrandRepository)),
    ) -> None:
        self.brand_repository = brand_repository

    def get_user_brands(self, user: User) -> list[Brand]:
        return self.brand_repository.get_user_brands(user)

    def get_brand(self, user: User, brand_id: int) -> Brand:
        return self.brand_repository.get_brand(user, brand_id)

    def create_brand(self, user: User, brand: Brand) -> Brand:
        return self.brand_repository.create_brand(user, brand)

    def update_brand(self, user: User, brand_id: int, brand: Brand) -> Brand:
        return self.brand_repository.update_brand(user, brand_id, brand)

    def delete_brand(self, user: User, brand_id: int) -> Brand:
        return self.brand_repository.delete_brand(user, brand_id)
