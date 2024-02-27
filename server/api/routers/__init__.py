from fastapi import APIRouter

from .users import router as users_router
# from .organization import router as organization_router
# from .event import router as event_router


api_router = APIRouter()

api_router.include_router(users_router, prefix="/users", tags=["users"])
# router.include_router(organization_router, prefix="/organizations", tags=["organizations"])
# router.include_router(event_router, prefix="/events", tags=["events"])
