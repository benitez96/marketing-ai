from typing import Annotated
from fastapi import APIRouter, Depends, status, Body, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from core.services.auth_service import get_current_user
from core.models import User

from core.schemas.user import Token, UserRead, UserCreate, UserReadWithToken, UserUpdate
from core.services.user_service import UserService


router = APIRouter()


@router.post("/", response_model=UserReadWithToken, status_code=status.HTTP_201_CREATED)
def create_user(new_user: UserCreate, user_service: UserService = Depends(UserService)):
    if not (validated_user := User.model_validate(new_user)):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid user data"
        )

    return user_service.create_user(user=validated_user)


@router.post("/signin", response_model=UserReadWithToken)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    user_service: UserService = Depends(UserService),
) -> UserReadWithToken:
    return user_service.create_token(
        username=form_data.username, password=form_data.password
    )


@router.get("/me", response_model=UserRead, summary="Read current user")
async def read_users_me(
    user: Annotated[User, Depends(get_current_user)],
):
    return user


@router.patch("/", response_model=UserRead, summary="Update current user")
async def update_user(
    user: Annotated[User, Depends(get_current_user)],
    user_modify: UserUpdate,
    user_service: UserService = Depends(UserService),
):
    return user_service.update_user(user_id=user.id, user=user_modify)
