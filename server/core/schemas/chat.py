from typing import Optional
from sqlmodel import SQLModel


class ChatRead(SQLModel):
    id: int
    name: str
    description: Optional[str] = None


class ChatReadDetail(ChatRead):
    prompts: list["PromptRead"]
    config: dict[str, str]


class PromptRead(SQLModel):
    id: int
    prompt: str
    response: str
