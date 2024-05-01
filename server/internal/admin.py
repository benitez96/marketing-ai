from starlette_admin.contrib.sqla import Admin, ModelView
import core.models as models
from core.database import engine
from internal.auth import UsernameAndPasswordProvider
from starlette.middleware import Middleware
from starlette.middleware.sessions import SessionMiddleware


class SessionView(ModelView):
    exclude_fields_from_create = ["prompts"]
    fields = ["name", "description", "user", "config"]


def mount_admin(app):
    admin = Admin(
        engine,
        title="Marketing AI admin",
        # logo_url="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png",
        auth_provider=UsernameAndPasswordProvider(),
        middlewares=[Middleware(SessionMiddleware, secret_key="SECRET")],
    )

    # Add view
    admin.add_view(ModelView(models.User, icon="fa fa-user"))
    admin.add_view(ModelView(models.Subscription, icon="fa-solid fa-ticket"))
    admin.add_view(SessionView(models.Session, icon="fa fa-comment"))
    admin.add_view(ModelView(models.Prompt, icon="fa-solid fa-terminal"))
    admin.add_view(ModelView(models.Product, icon="fa-brands fa-product-hunt"))
    admin.add_view(ModelView(models.Form, icon="fa-solid fa-align-justify"))
    admin.add_view(ModelView(models.Input, icon="fa fa-cog"))
    # admin.add_view(InputView(models.Input, icon="fa fa-cog"))
    admin.add_view(ModelView(models.AIModel, icon="fa-solid fa-brain"))

    # Mount admin to your app
    admin.mount_to(app)
