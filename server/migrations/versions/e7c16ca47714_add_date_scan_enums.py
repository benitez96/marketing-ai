import sqlmodel

"""add date/scan enums

Revision ID: e7c16ca47714
Revises: 4b4df39f15e6
Create Date: 2024-05-12 22:34:49.480720

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "e7c16ca47714"
down_revision: Union[str, None] = "4b4df39f15e6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute("ALTER TYPE inputtype ADD VALUE 'date' AFTER 'radio';")
    op.execute("ALTER TYPE inputtype ADD VALUE 'scan' AFTER 'date';")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
