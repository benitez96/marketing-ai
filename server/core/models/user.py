from typing import List, Optional
from sqlmodel import Field, Relationship, SQLModel
from datetime import datetime


class BaseModel(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)


class UserRead(BaseModel):
    username: str = Field(index=True)
    email: str


class UserCreate(SQLModel):
    username: str
    email: str
    password: str


class User(UserCreate, UserRead, table=True):
    chats: List["Chat"] = Relationship(back_populates="user")


class UserReadWithChats(UserRead):
    chats: List["ChatRead"] = []


class ChatRead(BaseModel):
    name: str
    description: Optional[str] = None


class ChatCreate(SQLModel):
    name: str
    description: Optional[str] = None
    user_id: int = Field(foreign_key="user.id")


class Chat(ChatRead, ChatCreate, table=True):
    user: User = Relationship(back_populates="chats")
    prompts: List["Prompts"] = Relationship(back_populates="chat")


class Prompts(BaseModel, table=True):
    tokens: int
    prompt: str
    response: str

    # Relations
    chat_id: int = Field(foreign_key="chat.id")
    chat: Chat = Relationship(back_populates="prompts")
    model_id: int = Field(foreign_key="model.id")


class AIModel(BaseModel, table=True):
    __tablename__ = "model"

    name: str

    display_name: str
    description: Optional[str] = None

    token_price: float
    public_price: float

    prompts: List["Prompts"] = Relationship(back_populates="model")


class Product(BaseModel, table=True):
    name: str
    description: Optional[str] = None
    price: float
    duration: int


class Subscription(BaseModel, table=True):
    user_id: int = Field(foreign_key="user.id")
    product_id: int = Field(foreign_key="product.id")
    start_date: datetime = datetime.now()
    end_date: datetime
    active: bool = True
