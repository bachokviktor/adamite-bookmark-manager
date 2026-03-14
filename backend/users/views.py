from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .serializers import CreateUserSerializer, UserSerializer


# Create your views here.
class UserCreateView(generics.CreateAPIView):
    """
    This view is used for user creation.
    """
    queryset = get_user_model().objects.all()
    serializer_class = CreateUserSerializer


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    This view is used to retrieve and modify the current user.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
