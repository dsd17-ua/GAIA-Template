"""create_matches_table

Revision ID: a1b2c3d4e5f6
Revises: 
Create Date: 2026-02-06 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'a1b2c3d4e5f6'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table('matches',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('home_team', sa.String(), nullable=False),
    sa.Column('visitor_team', sa.String(), nullable=False),
    sa.Column('start_time', sa.DateTime(timezone=True), nullable=False),
    sa.Column('duration_half', sa.Integer(), nullable=False),
    sa.Column('current_half', sa.Integer(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

def downgrade() -> None:
    op.drop_table('matches')
