from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.models import *
from core.database import create_db_and_tables
from api.routers import api_router
from internal.admin import mount_admin


origins = [
    "*",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


app.include_router(api_router, prefix="/api")


mount_admin(app)
