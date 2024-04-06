from typing import Optional
from sqlmodel import SQLModel


class ChatRead(SQLModel):
    id: int
    name: str
    description: Optional[str] = None


class ChatReadDetail(ChatRead):
    prompts: Optional[list["PromptRead"]] = []
    config: dict = {}


class PromptRead(SQLModel):
    id: int
    prompt: str
    response: str


class ChatCreate(SQLModel):
    name: str
    description: Optional[str] = None


class ChatUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None
    config: Optional[dict] = None

class AnalyzedMetadata(SQLModel):
    title: str
    description: str
