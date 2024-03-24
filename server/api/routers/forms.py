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


@router.get("/free", summary="Get free form fields")
async def get_free_form_fields(
    form_service: FormService = Depends(FormService),
):
    return form_service.get_form()


@router.post("/{form_id}", summary="Call a specific form")
async def call_form(
    user: Annotated[User, Depends(get_current_user)],
    form_id: int,
    params: dict[str, str],
    form_service: FormService = Depends(FormService),
):
    return form_service.call_form(form_id, params)
