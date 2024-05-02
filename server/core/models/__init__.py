from typing import Optional, Union
from sqlalchemy.orm import relationship
from sqlmodel import Column, Field, Relationship, SQLModel, JSON
from datetime import datetime
from enum import Enum


class InputType(str, Enum):
    text = "text"
    select = "select"
    checkbox = "checkbox"
    radio = "radio"


class Source(str, Enum):
    admin = "admin"
    user = "user"


class Role(str, Enum):
    system = "system"
    user = "user"
    assistant = "assistant"


class FormType(str, Enum):
    campaign = "campaign"
    flow = "flow"


class BaseModel(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)


class Brand(BaseModel, table=True):
    name: str
    description: Optional[str] = None

    mission_statement: str
    best_selling_products: str
    site_url: str
    target_audience: str
    current_email_list_size: int

    niche: str  # TODO: could be a relationship with a Niche model

    user_id: int = Field(foreign_key="user.id")
    user: "User" = Relationship(back_populates="brands")

    sessions: list["Session"] = Relationship(back_populates="brand")


class User(BaseModel, table=True):
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)

    firstname: str
    lastname: str

    password: str
    active: Optional[bool] = Field(default=True)
    is_admin: Optional[bool] = Field(default=False)

    sessions: list["Session"] = Relationship(back_populates="user")
    brands: list["Brand"] = Relationship(back_populates="user")
    suscription: "Subscription" = Relationship(back_populates="users")


class Session(BaseModel, table=True):
    name: str
    description: Optional[str] = None

    user_id: int = Field(foreign_key="user.id")
    user: User = Relationship(back_populates="sessions")

    brand_id: int = Field(foreign_key="brand.id")
    brand: Brand = Relationship(back_populates="sessions")

    config: Optional[Union[list[dict], dict]] = Field(
        default={}, sa_column=Column(JSON)
    )

    prompts: Optional[list["Prompt"]] = Relationship(
        back_populates="session",
        sa_relationship=relationship("Prompt", cascade="all, delete"),
    )


class Prompt(BaseModel, table=True):
    input_tokens: int
    output_tokens: int
    prompt: str
    response: str
    visible: Optional[bool] = Field(default=True)

    # Relations
    session_id: int = Field(foreign_key="session.id")
    session: Session = Relationship(back_populates="prompts")

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

    prompts: Optional[list["Prompt"]] = Relationship(back_populates="ai_model")


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

    is_public: bool = False

    form_type: Optional[FormType]

    products: Optional[list["Product"]] = Relationship(back_populates="form")

    inputs: Optional[list["Input"]] = Relationship(
        back_populates="forms",
        link_model=FormInputLink,
    )


class Input(BaseModel, table=True):
    name: str
    description: Optional[str] = None
    source: Source
    role: Role
    type: InputType
    default_value: Optional[str] = None
    label: Optional[str] = None
    placeholder: Optional[str] = None
    required: bool = False
    enabled: bool = False
    priority: Optional[int] = None
    values: Optional[Union[list[dict], dict]] = Field(
        default={}, sa_column=Column(JSON)
    )
    template: str = Field(max_length=500)

    forms: Optional[list[Form]] = Relationship(
        back_populates="inputs", link_model=FormInputLink
    )
