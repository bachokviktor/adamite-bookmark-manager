from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, extend_schema_view

from .serializers import CreateUserSerializer, UserSerializer


# Create your views here.
@extend_schema_view(
    post=extend_schema(
        description="Create a new user.",
        summary="Create a new user"
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
        description="Get user info.",
        summary="Get user info"
    ),
    put=extend_schema(
        description="Update a user.",
        summary="Update a user"
    ),
    patch=extend_schema(
        exclude=True
    ),
    delete=extend_schema(
        description="Delete a user.",
        summary="Delete a user"
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
