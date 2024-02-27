from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status
from jose import jwt
from passlib.context import CryptContext
from core.dependencies import get_repository
from core.models import User
from core.schemas.user import Token
from infrastructure.repositories.user_repository import UserRepository


JWT_SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class UserService:
    _pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    _credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    def __init__(
        self, user_repository: UserRepository = Depends(get_repository(UserRepository))
    ) -> None:
        self.user_repository = user_repository

    def create_user(self, user: User):
        if self.user_repository.get_user_by_username(username=user.username):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists"
            )

        user.password = self._get_password_hash(user.password)

        return self.user_repository.create_user(user)

    def create_token(self, username: str, password: str):
        user = self._authenticate_user(username, password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = self._create_access_token(
            data={"user_id": user.id}, expires_delta=access_token_expires
        )
        return Token(access_token=access_token, token_type="bearer")

    def _authenticate_user(self, username: str, password: str):
        user = self.user_repository.get_user_by_username(username)
        if user and self._verify_password(password, user.password):
            return user
        return None

    def _verify_password(self, plain_password, hashed_password):
        return self._pwd_context.verify(plain_password, hashed_password)

    def _get_password_hash(self, password):
        return self._pwd_context.hash(password)

    def _create_access_token(self, data: dict, expires_delta: timedelta | None = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
