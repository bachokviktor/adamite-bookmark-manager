from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, extend_schema_view

from .serializers import CreateUserSerializer, UserSerializer


# Create your views here.
@extend_schema_view(
    post=extend_schema(
        description=_("Create a new user."),
        summary=_("Create a new user")
    )
)
class UserCreateView(generics.CreateAPIView):
    """
    This view is used for user creation.
    """
    queryset = get_user_model().objects.all()
    serializer_class = CreateUserSerializer


@extend_schema_view(
    get=extend_schema(
        description=_("Get user info."),
        summary=_("Get user info")
    ),
    put=extend_schema(
        description=_("Update a user."),
        summary=_("Update a user")
    ),
    patch=extend_schema(
        exclude=True
    ),
    delete=extend_schema(
        description=_("Delete a user."),
        summary=_("Delete a user")
    )
)
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    This view is used to retrieve and modify the current user.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
