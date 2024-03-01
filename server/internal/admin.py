from fastapi import Depends
from starlette_admin.contrib.sqla import Admin, ModelView
from core.dependencies import get_repository
import core.models as models
from core.database import engine, get_session
from infrastructure.repositories.user_repository import UserRepository


class ChatView(ModelView):
    exclude_fields_from_create = ["config", "prompts"]
    fields = ["name", "description", "user"]


def mount_admin(app):
    admin = Admin(
        engine,
        title="Marketing AI admin",
        logo_url="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png",
    )

    # Add view
    admin.add_view(ModelView(models.User, icon="fa fa-user"))
    admin.add_view(ModelView(models.Subscription, icon="fa-solid fa-ticket"))
    admin.add_view(ChatView(models.Chat, icon="fa fa-comment"))
    admin.add_view(ModelView(models.ChatConfig, icon="fa fa-comment"))
    admin.add_view(ModelView(models.Prompt, icon="fa-solid fa-terminal"))
    admin.add_view(ModelView(models.Product, icon="fa-brands fa-product-hunt"))
    admin.add_view(ModelView(models.Form, icon="fa fa-cog"))
    admin.add_view(ModelView(models.Input, icon="fa fa-cog"))
    admin.add_view(ModelView(models.AIModel, icon="fa-solid fa-brain"))

    # Mount admin to your app
    admin.mount_to(app)
