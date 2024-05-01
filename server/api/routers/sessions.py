from typing import Annotated
from fastapi import APIRouter, Body, Depends
from core.models import Session, User
from core.schemas.chat import (
    AnalyzedMetadata,
    ChatCreate,
    ChatRead,
    ChatReadDetail,
    ChatUpdate,
)
from core.schemas.prompt import PromptRead
from core.services.auth_service import get_current_user
from core.services.session_service import SessionService


router = APIRouter()


@router.get("/", response_model=list[ChatRead], summary="Get user chats")
async def get_chats(
    user: Annotated[User, Depends(get_current_user)],
):
    return user.chats


@router.post("/", response_model=ChatReadDetail, summary="Create chat")
async def create_chat(
    *,
    user: Annotated[User, Depends(get_current_user)],
    session_service: SessionService = Depends(SessionService),
    chat: ChatCreate,
):
    return session_service.create_chat(user=user, chat=chat)


@router.patch("/{chat_id}", response_model=ChatReadDetail, summary="Create chat")
async def update_chat(
    *,
    user: Annotated[User, Depends(get_current_user)],
    session_service: SessionService = Depends(SessionService),
    chat_id: int,
    chat: ChatUpdate,
):
    return session_service.update_chat(user=user, chat=chat, chat_id=chat_id)


@router.get("/{chat_id}", response_model=ChatReadDetail, summary="Get chat by id")
async def get_chat(
    *,
    user: Annotated[User, Depends(get_current_user)],
    session_service: SessionService = Depends(SessionService),
    chat_id: int,
):
    return session_service.get_chat_detail(user=user, chat_id=chat_id)


@router.post("/{chat_id}/init", response_model=PromptRead, summary="Create chat prompt")
async def generate_initial_prompt(
    *,
    user: Annotated[User, Depends(get_current_user)],
    session_service: SessionService = Depends(SessionService),
    chat_id: int,
    config: dict[str, str],
):
    return session_service.init_chat(user=user, chat_id=chat_id, initial_conf=config)


@router.post("/init", response_model=ChatReadDetail, summary="Create chat prompt")
async def generate_prompt(
    *,
    user: Annotated[User, Depends(get_current_user)],
    session_service: SessionService = Depends(SessionService),
    config: dict[str, str],
):
    return session_service.init_chat(user=user, initial_conf=config)


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
    return chat_service.analyze_metadata(metadata=metadata)


@router.delete("/{chat_id}", response_model=ChatReadDetail, summary="Delete chat")
async def delete_chat(
    *,
    user: Annotated[User, Depends(get_current_user)],
    chat_service: SessionService = Depends(SessionService),
    chat_id: int,
):
    return chat_service.delete_chat(user=user, chat_id=chat_id)
