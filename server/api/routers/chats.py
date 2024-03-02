from typing import Annotated
from fastapi import APIRouter, Depends
from core.models import Chat, User
from core.schemas.chat import ChatCreate, ChatRead, ChatReadDetail, ChatUpdate
from core.services.auth_service import get_current_user
from core.services.chat_service import ChatService


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
    chat_service: ChatService = Depends(ChatService),
    chat: ChatCreate,
):
    return chat_service.create_chat(user=user, chat=chat)



@router.patch("/{chat_id}", response_model=ChatReadDetail, summary="Create chat")
async def update_chat(
    *,
    user: Annotated[User, Depends(get_current_user)],
    chat_service: ChatService = Depends(ChatService),
    chat_id: int,
    chat: ChatUpdate,
):

    return chat_service.update_chat(user=user, chat=chat, chat_id=chat_id)


@router.get("/{chat_id}", response_model=ChatReadDetail, summary="Get chat by id")
async def get_chat(
    *,
    user: Annotated[User, Depends(get_current_user)],
    chat_service: ChatService = Depends(ChatService),
    chat_id: int,
):
    return chat_service.get_chat_detail(user=user, chat_id=chat_id)

@router.post("/{chat_id}/init", summary="Create chat prompt")
async def generate_initial_prompt(
    *,
    user: Annotated[User, Depends(get_current_user)],
    chat_service: ChatService = Depends(ChatService),
    chat_id: int,
    config: dict[str, str],
):
    return HTTPException(status_code=501, detail="Not implemented")
