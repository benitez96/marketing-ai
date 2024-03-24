from typing import Annotated
from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from core.dependencies import get_repository
from core.models import User

from core.settings import get_settings

from core.schemas.user import TokenData
from infrastructure.repositories.user_repository import UserRepository

settings = get_settings()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/users/signin")

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    user_repository: UserRepository = Depends(get_repository(UserRepository)),
) -> User:
    try:
        payload = jwt.decode(
            token, settings.jwt_secret_key, algorithms=[settings.algorithm]
        )
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
        token_data = TokenData(user_id=user_id)
    except JWTError:
        raise credentials_exception
    user = user_repository.get_user(token_data.user_id)
    if user is None:
        raise credentials_exception

    if not user.active:
        raise HTTPException(status_code=400, detail="Inactive user")

    return user
