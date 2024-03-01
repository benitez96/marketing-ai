
from typing import Optional, Union
from sqlmodel import SQLModel


class FormRead(SQLModel):
    name: str
    type: str
    description: Optional[str] = None
    default: Optional[str] = None
    required: bool = False
    disabled: bool = False
    label: str
    values: Optional[Union[list[dict], dict]]
    placeholder: Optional[str] = None
