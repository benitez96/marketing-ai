from typing import Annotated
from fastapi import APIRouter, Depends
from core.models import User
from core.schemas.form import FormRead
from core.services.auth_service import get_current_user
from core.services.form_service import FormService


router = APIRouter()


@router.get(
    "/", response_model=list[FormRead], summary="Form fields for the current user"
)
async def read_users_me(
    user: Annotated[User, Depends(get_current_user)],
    form_service: FormService = Depends(FormService),
):
    return form_service.get_form(user)
