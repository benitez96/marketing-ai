from typing import Optional
from sqlmodel import SQLModel


class ProductRead(SQLModel):
    display_name: str
    description: Optional[str] = None
    price: float
    duration: int
