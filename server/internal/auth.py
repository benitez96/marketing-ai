from starlette.requests import Request
from starlette.responses import Response
from starlette_admin.auth import AdminConfig, AdminUser, AuthProvider
from starlette_admin.exceptions import FormValidationError, LoginFailed
from core.database import engine
from core.services.user_service import UserService
from infrastructure.repositories.user_repository import UserRepository
from sqlmodel import Session


session = Session(engine)
user_repository_instance = UserRepository(session=session)
user_service_instance = UserService(user_repository=user_repository_instance)


class UsernameAndPasswordProvider(AuthProvider):
    _user_service = user_service_instance

    async def login(
        self,
        username: str,
        password: str,
        remember_me: bool,
        request: Request,
        response: Response,
    ) -> Response:
        if len(username) < 3:
            """Form data validation"""
            raise FormValidationError(
                {"username": "Ensure username has at least 3 characters"}
            )

        user = self._user_service._authenticate_user(username, password)

        if user and user.is_admin:
            """Save `username` in session"""
            request.session.update({**user.model_dump(), "password": password})
            return response

        raise LoginFailed("Invalid username or password")

    async def is_authenticated(self, request) -> bool:
        username = request.session.get("username", None)
        password = request.session.get("password", None)

        if not username or not password:
            return False

        user = self._user_service._authenticate_user(username, password)
        if not user or not user.is_admin:
            return False

        request.state.user = user
        return True

    def get_admin_config(self, request: Request) -> AdminConfig:
        user = request.state.user  # Retrieve current user
        # Update app title according to current_user
        custom_app_title = f"Hello {user.username} !"

        return AdminConfig(
            app_title=custom_app_title,
        )

    def get_admin_user(self, request: Request) -> AdminUser:
        user = request.state.user  # Retrieve current user
        photo_url = None

        return AdminUser(username=user.username, photo_url=photo_url)

    async def logout(self, request: Request, response: Response) -> Response:
        request.session.clear()
        return response
