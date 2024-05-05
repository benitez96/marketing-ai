from typing import Optional
from sqlmodel import SQLModel
from .brand import BrandRead


class UserRead(SQLModel):
    id: int
    username: str
    email: str
    firstname: str
    lastname: str
    brands: list["BrandRead"] = []


class UserCreate(SQLModel):
    username: str
    email: str
    password: str
    firstname: str
    lastname: str


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


class UserReadWithToken(UserRead, Token):
    pass


class UserUpdate(SQLModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    firstname: Optional[str] = None
    lastname: Optional[str] = None
