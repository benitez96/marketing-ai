from typing import Optional
from core.schemas.session import SessionRead
from sqlmodel import SQLModel


class BrandRead(SQLModel):
    id: int
    name: str
    target_audience: str
    current_email_list_size: int
    niche: str


class BrandReadDetail(BrandRead):
    site_url: str
    description: Optional[str] = None
    mission_statement: str
    best_selling_products: str

    sessions: list[SessionRead]


class BrandCreate(SQLModel):
    name: str
    target_audience: str
    current_email_list_size: int
    niche: str
    site_url: str
    description: Optional[str] = None
    mission_statement: str
    best_selling_products: str
