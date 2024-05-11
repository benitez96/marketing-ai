import sqlmodel

"""make first n last name required

Revision ID: ca4d7276f01c
Revises: 9bf258dfeea0
Create Date: 2024-04-07 20:58:44.911118

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "ca4d7276f01c"
down_revision: Union[str, None] = "9bf258dfeea0"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    # Obtiene una referencia a la conexión en uso.
    conn = op.get_bind()

    # Prepara y ejecuta la actualización para firstname.
    update_firstname = (
        sa.update(sa.table("user", sa.column("firstname", sa.String)))
        .where(sa.column("firstname").is_(None))
        .values(firstname="John")
    )
    conn.execute(update_firstname)

    # Prepara y ejecuta la actualización para lastname.
    update_lastname = (
        sa.update(sa.table("user", sa.column("lastname", sa.String)))
        .where(sa.column("lastname").is_(None))
        .values(lastname="Doe")
    )
    conn.execute(update_lastname)

    op.alter_column("user", "firstname", existing_type=sa.VARCHAR(), nullable=False)

    op.alter_column("user", "lastname", existing_type=sa.VARCHAR(), nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column("user", "lastname", existing_type=sa.VARCHAR(), nullable=True)
    op.alter_column("user", "firstname", existing_type=sa.VARCHAR(), nullable=True)
    # ### end Alembic commands ###