from fastapi import APIRouter

from .users import router as users_router
from .forms import router as forms_router
from .products import router as products_router


api_router = APIRouter()

api_router.include_router(users_router, prefix="/users", tags=["users"])
api_router.include_router(forms_router, prefix="/forms", tags=["forms"])
api_router.include_router(products_router, prefix="/products", tags=["products"])
