from typing import Optional
from sqlmodel import SQLModel


class UserRead(SQLModel):
    id: int
    username: str
    email: str

class UserCreate(SQLModel):
    username: str
    email: str
    password: str


class UserReadWithChats(UserRead):
    chats: list["ChatRead"] = []


class ChatRead(SQLModel):
    id: int
    name: str
    description: Optional[str] = None


class ChatCreate(SQLModel):
    name: str
    description: Optional[str] = None
    user_id: int


class Token(SQLModel):
    access_token: str
    token_type: str


class TokenData(SQLModel):
    user_id: int | str
