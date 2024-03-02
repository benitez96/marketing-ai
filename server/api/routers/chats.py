from typing import Annotated
from fastapi import APIRouter, Depends
from core.models import User
from core.schemas.chat import ChatRead, ChatReadDetail
from core.services.auth_service import get_current_user
from core.services.chat_service import ChatService


router = APIRouter()


@router.get("/", response_model=list[ChatRead], summary="Get user chats")
async def get_chats(
    user: Annotated[User, Depends(get_current_user)],
):
    return user.chats


@router.get("/{chat_id}", response_model=ChatReadDetail, summary="Get chat by id")
async def get_chat(
    *,
    user: Annotated[User, Depends(get_current_user)],
    chat_service: ChatService = Depends(ChatService),
    chat_id: int,
):
    return chat_service.get_chat_detail(user=user, chat_id=chat_id)
