from django.contrib.auth import get_user_model
from rest_framework import serializers


class CreateUserSerializer(serializers.ModelSerializer):
    """
    This serializer is used ONLY for user creation.
    """
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "password"]
        extra_kwargs = {
            "password": {
                "write_only": True,
            },
        }

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)

        return user


class UserSerializer(serializers.ModelSerializer):
    """
    This serializer is used to retrieve and update a user.
    """
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "email", "first_name", "last_name"]
