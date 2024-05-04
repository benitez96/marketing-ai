from typing import Annotated
from fastapi import APIRouter, Depends
from core.models import User
from core.schemas.form import FormDetail, FormRead
from core.services.auth_service import get_current_user
from core.services.form_service import FormService


router = APIRouter()


@router.get("/", response_model=list[FormRead], summary="Get available forms")
async def get_forms(
    _: Annotated[User, Depends(get_current_user)],
    slug: str | None = None,
    form_type: str | None = None,
    form_service: FormService = Depends(FormService),
):
    forms = form_service.get_forms()
    print(forms)

    if slug:
        forms = [form for form in forms if form.name == slug]

    if form_type:
        forms = [form for form in forms if form.form_type == form_type]

    return forms


@router.get(
    "/{slug:str}",
    response_model=FormDetail,
    summary="Get a specific form",
)
async def get_form_by_slug(
    _: Annotated[User, Depends(get_current_user)],
    slug: str,
    form_service: FormService = Depends(FormService),
):
    return form_service.get_form(slug)


@router.post("/{slug:str}", summary="Call a specific form")
async def call_form_by_slug(
    _: Annotated[User, Depends(get_current_user)],
    slug: str,
    params: dict[str, str],
    form_service: FormService = Depends(FormService),
):
    return form_service.call_form_by_slug(slug, params)
