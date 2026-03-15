from users.serializers import UserSerializer, CreateUserSerializer
from bookmarks.serializers import BookmarkSerializer
from bookmarks.models import Bookmark
import pytest


@pytest.mark.django_db
class TestUserSerializer:
    def test_create_user(self, django_user_model):
        payload = {
            "username": "testuser",
            "password": "43Sn1Y5y",
        }

        serializer = CreateUserSerializer(data=payload)

        validation = serializer.is_valid()
        if validation:
            serializer.save()

        assert validation
        assert django_user_model.objects.count() == 1

    def test_serialize_user(self, django_user_model):
        payload = {
            "username": "testuser",
            "password": "43Sn1Y5y",
        }

        user = django_user_model.objects.create_user(**payload)

        serializer = UserSerializer(user)

        assert serializer.data["id"] == user.id
        assert serializer.data["username"] == user.username

    def test_update_user(self, django_user_model):
        payload = {
            "username": "testuser",
            "first_name": "Test",
            "last_name": "User",
            "email": "test.user@example.com",
        }

        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        serializer = UserSerializer(user, data=payload)

        validation = serializer.is_valid()
        if validation:
            serializer.save()

        assert validation
        assert user.first_name == payload["first_name"]
        assert user.last_name == payload["last_name"]
        assert user.email == payload["email"]


@pytest.mark.django_db
class TestBookmarkSerializer:
    def test_create_bookmark(self, django_user_model):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        payload = {
            "name": "Test Bookmark",
            "url": "https://example.com/",
        }

        serializer = BookmarkSerializer(data=payload)

        validation = serializer.is_valid()
        if validation:
            serializer.save(author=user)

        assert validation
        assert Bookmark.objects.count() == 1
        assert user.bookmarks.count() == 1

    def test_serialize_bookmark(self, django_user_model):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        bookmark = Bookmark.objects.create(
            name="Test Bookmark",
            url="https://example.com/",
            author=user
        )

        serializer = BookmarkSerializer(bookmark)

        assert serializer.data["id"] == bookmark.id
        assert serializer.data["name"] == bookmark.name
        assert serializer.data["url"] == bookmark.url
        assert serializer.data["author"] == user.id

    def test_update_bookmark(self, django_user_model):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        bookmark = Bookmark.objects.create(
            name="Test Bookmark",
            url="https://example.com/",
            author=user
        )

        payload = {
            "name": "Modified Test Bookmark",
            "url": "https://modified.com/",
            "description": "This is a modified bookmark.",
        }

        serializer = BookmarkSerializer(bookmark, data=payload)

        validation = serializer.is_valid()
        if validation:
            serializer.save()

        assert validation
        assert bookmark.name == payload["name"]
        assert bookmark.url == payload["url"]
        assert bookmark.description == payload["description"]
