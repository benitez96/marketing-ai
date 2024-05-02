from typing import List, Optional, Union
from core.models import Input
from sqlmodel import SQLModel


class FormRead(SQLModel):
    id: int
    name: str
    display_name: str


class FormDetail(SQLModel):
    id: int
    name: str
    display_name: str
    form_type: str
    description: Optional[str]
    inputs: list[Input]
