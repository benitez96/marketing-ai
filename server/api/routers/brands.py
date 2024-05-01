from typing import Annotated
from core.schemas.brand import BrandCreate, BrandRead, BrandReadDetail
from core.services.brand_service import BrandService
from fastapi import APIRouter, Depends
from core.models import User
from core.services.auth_service import get_current_user


router = APIRouter()


@router.get("/", response_model=list[BrandRead], summary="Get user brands")
async def get_brands(
    user: Annotated[User, Depends(get_current_user)],
    brand_service: BrandService = Depends(BrandService),
):
    return brand_service.get_user_brands(user)


@router.post("/", response_model=BrandReadDetail, summary="Create brand")
async def create_brand(
    *,
    user: Annotated[User, Depends(get_current_user)],
    brand_service: BrandService = Depends(BrandService),
    brand: BrandCreate,
):
    return brand_service.create_brand(user=user, brand=brand)


@router.get("/{brand_id}", response_model=BrandReadDetail, summary="Get brand by id")
async def get_brand(
    *,
    user: Annotated[User, Depends(get_current_user)],
    brand_service: BrandService = Depends(BrandService),
    brand_id: int,
):
    return brand_service.get_brand(user=user, brand_id=brand_id)


@router.patch("/{brand_id}", response_model=BrandReadDetail, summary="Update brand")
async def update_brand(
    *,
    user: Annotated[User, Depends(get_current_user)],
    brand_service: BrandService = Depends(BrandService),
    brand_id: int,
    brand: BrandCreate,
):
    return brand_service.update_brand(user=user, brand_id=brand_id, brand=brand)


@router.delete("/{brand_id}", response_model=BrandReadDetail, summary="Delete brand")
async def delete_brand(
    *,
    user: Annotated[User, Depends(get_current_user)],
    brand_service: BrandService = Depends(BrandService),
    brand_id: int,
):
    return brand_service.delete_brand(user=user, brand_id=brand_id)
