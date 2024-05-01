from typing import Optional
from sqlmodel import SQLModel


class SessionRead(SQLModel):
    id: int
    name: str
    description: Optional[str] = None


class SessionReadDetail(SessionRead):
    prompts: Optional[list["PromptRead"]] = []
    config: dict = {}


class PromptRead(SQLModel):
    id: int
    prompt: str
    response: str


class SessionCreate(SQLModel):
    name: str
    description: Optional[str] = None


class SessionUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None
    config: Optional[dict] = None


class AnalyzedMetadata(SQLModel):
    title: str
    description: str
