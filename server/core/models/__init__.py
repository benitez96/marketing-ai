from typing import Optional, Union
from sqlmodel import Column, Field, Relationship, SQLModel, JSON
from datetime import datetime
from enum import Enum


class BaseModel(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)


class User(BaseModel, table=True):
    username: str = Field(index=True, unique=True)
    email: str
    password: str
    active: Optional[bool] = Field(default=True)

    chats: list["Chat"] = Relationship(back_populates="user")

    suscription: "Subscription" = Relationship(back_populates="users")


class Chat(BaseModel, table=True):
    name: str
    description: Optional[str] = None
    user_id: int = Field(foreign_key="user.id")

    user: User = Relationship(back_populates="chats")
    configs: list["ChatConfig"] = Relationship(back_populates="chat")
    prompts: list["Prompt"] = Relationship(back_populates="chat")


class ChatConfig(BaseModel, table=True):
    chat_id: int = Field(foreign_key="chat.id")
    chat: Chat = Relationship(back_populates="configs")

    field: str
    value: str


class Prompt(BaseModel, table=True):
    input_tokens: int
    output_tokens: int
    prompt: str
    response: str
    visible: bool = Field(default=True)

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

    input_token_price: float
    output_token_price: float

    public_price: float

    prompts: list["Prompt"] = Relationship(back_populates="ai_model")


class Product(BaseModel, table=True):
    name: str
    display_name: str
    description: Optional[str] = None
    price: float
    duration: int

    is_published: bool = False

    form_id: Optional[int] = Field(foreign_key="form.id", default=None)
    form: Optional["Form"] = Relationship(back_populates="products")

    suscriptions: list["Subscription"] = Relationship(back_populates="product")


class Subscription(BaseModel, table=True):
    start_date: datetime = datetime.now()
    end_date: datetime
    active: bool = True

    user_id: int = Field(foreign_key="user.id")
    users: User = Relationship(back_populates="suscription")

    product_id: int = Field(foreign_key="product.id")
    product: Product = Relationship(back_populates="suscriptions")


class FormInputLink(SQLModel, table=True):
    form_id: Optional[int] = Field(
        default=None, foreign_key="form.id", primary_key=True
    )
    input_id: Optional[int] = Field(
        default=None, foreign_key="input.id", primary_key=True
    )


class Form(BaseModel, table=True):
    name: str
    display_name: str
    # title: Optional[str] = None
    description: Optional[str] = None

    products: Optional[list["Product"]] = Relationship(back_populates="form")

    fields: Optional[list["Input"]] = Relationship(
        back_populates="forms", link_model=FormInputLink
    )


class InputType(str, Enum):
    text = "text"
    select = "select"
    checkbox = "checkbox"
    radio = "radio"


class Input(BaseModel, table=True):
    name: str
    type: InputType
    description: Optional[str] = None
    default: Optional[str] = None
    required: bool = False
    enabled: bool = False
    label: str
    values: Optional[Union[list[dict], dict]] = Field(
        default={}, sa_column=Column(JSON)
    )
    placeholder: Optional[str] = None

    forms: Optional[list[Form]] = Relationship(
        back_populates="fields", link_model=FormInputLink
    )
