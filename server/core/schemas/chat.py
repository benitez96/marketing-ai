from typing import Optional
from sqlmodel import SQLModel


class ChatRead(SQLModel):
    id: int
    name: str
    description: Optional[str] = None


class ChatReadDetail(ChatRead):
    prompts: Optional[list["PromptRead"]] = []
    config: Optional[dict[str, str]] = {}


class PromptRead(SQLModel):
    id: int
    prompt: str
    response: str


class ChatCreate(SQLModel):
    name: str
    description: Optional[str] = None
    config: Optional[dict[str, str]]


class ChatUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None
    config: Optional[dict[str, str]] = None
