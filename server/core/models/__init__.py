from typing import List, Optional
from sqlmodel import Field, Relationship, SQLModel
from datetime import datetime


class BaseModel(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)


class User(BaseModel, table=True):
    username: str = Field(index=True, unique=True)
    email: str
    password: str
    disabled: Optional[bool] = Field(default=False)

    chats: List["Chat"] = Relationship(back_populates="user")


class Chat(BaseModel, table=True):
    name: str
    description: Optional[str] = None
    user_id: int = Field(foreign_key="user.id")

    user: User = Relationship(back_populates="chats")
    prompts: List["Prompts"] = Relationship(back_populates="chat")


class Prompts(BaseModel, table=True):
    tokens: int
    prompt: str
    response: str

    # Relations
    chat_id: int = Field(foreign_key="chat.id")
    chat: Chat = Relationship(back_populates="prompts")

    ai_model_id: int = Field(foreign_key="aimodel.id")
    ai_model: "AIModel" = Relationship(back_populates="prompts")

    created_at: datetime = datetime.now()


class AIModel(BaseModel, table=True):
    name: str

    display_name: str
    description: Optional[str] = None

    token_price: float
    public_price: float

    prompts: List["Prompts"] = Relationship(back_populates="ai_model")


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
