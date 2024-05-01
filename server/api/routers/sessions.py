from typing import Annotated
from fastapi import APIRouter, Body, Depends
from core.models import User
from core.schemas.session import (
    AnalyzedMetadata,
    SessionRead,
    SessionReadDetail,
    SessionUpdate,
)
from core.services.auth_service import get_current_user
from core.services.session_service import SessionService


router = APIRouter()


@router.get("/", response_model=list[SessionRead], summary="Get user sessions")
async def get_sessions(
    user: Annotated[User, Depends(get_current_user)],
):
    return user.sessions


@router.post(
    "/{brand_id:int}",
    response_model=SessionReadDetail,
    summary="Create session prompt",
)
async def generate_prompt(
    *,
    user: Annotated[User, Depends(get_current_user)],
    brand_id: int,
    session_service: SessionService = Depends(SessionService),
    config: dict[str, str],
):
    return session_service.init_session(
        user=user, brand_id=brand_id, initial_conf=config
    )


@router.patch(
    "/{session_id}", response_model=SessionReadDetail, summary="Update session"
)
async def update_session(
    *,
    user: Annotated[User, Depends(get_current_user)],
    session_service: SessionService = Depends(SessionService),
    session_id: int,
    session: SessionUpdate,
):
    return session_service.update_session(
        user=user, session=session, session_id=session_id
    )


@router.get(
    "/{session_id}", response_model=SessionReadDetail, summary="Get session by id"
)
async def get_session(
    *,
    user: Annotated[User, Depends(get_current_user)],
    session_service: SessionService = Depends(SessionService),
    session_id: int,
):
    return session_service.get_session_detail(user=user, session_id=session_id)


@router.post(
    "/analyze_metadata",
    response_model=AnalyzedMetadata,
    summary="Get a title & description from a give metadata website",
)
async def analyze_metadata(
    *,
    _: Annotated[User, Depends(get_current_user)],
    session_service: SessionService = Depends(SessionService),
    metadata: Annotated[str, Body(embed=True)],
):
    return session_service.analyze_metadata(metadata=metadata)


@router.delete(
    "/{session_id}", response_model=SessionReadDetail, summary="Delete session"
)
async def delete_session(
    *,
    user: Annotated[User, Depends(get_current_user)],
    session_service: SessionService = Depends(SessionService),
    session_id: int,
):
    return session_service.delete_session(user=user, session_id=session_id)
