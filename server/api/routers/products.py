from typing import Annotated
from fastapi import APIRouter, Body, Depends
from core.models import User
from core.schemas.form import FormRead
from core.services.auth_service import get_current_user
from core.services.product_service import ProductService


router = APIRouter()


@router.get("/", response_model=list[FormRead], summary="Get available products")
async def get_products(
    product_service: ProductService = Depends(ProductService),
):
    return product_service.get_products()


@router.post("/subscribe", summary="Subscribe to a product")
async def subscribe_to_product(
    user: Annotated[User, Depends(get_current_user)],
    product_id: int = Body(..., embed=True),
    product_service: ProductService = Depends(ProductService),
):
    return product_service.subscribe(user_id=user.id, product_id=product_id)
