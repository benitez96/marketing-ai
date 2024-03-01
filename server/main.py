from fastapi import FastAPI

from core.models import *
from core.database import create_db_and_tables
from api.routers import api_router
from internal.admin import mount_admin

app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


app.include_router(api_router, prefix="/api")


mount_admin(app)
