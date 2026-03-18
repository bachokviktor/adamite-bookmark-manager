from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from bookmarks.models import Bookmark
import pytest


@pytest.fixture
def api_client():
    client = APIClient()

    return client


@pytest.mark.django_db
class TestUserViews:
    def test_anonymous_user(self, api_client):
        response = api_client.get(reverse("users:detail"), format="json")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_create_user(self, django_user_model, api_client):
        payload = {
            "username": "testuser",
            "password": "43Sn1Y5y",
        }

        response = api_client.post(
            reverse("users:register"),
            data=payload,
            format="json"
        )

        assert response.status_code == status.HTTP_201_CREATED
        assert django_user_model.objects.count() == 1

    def test_retrieve_user(self, django_user_model, api_client):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        api_client.force_authenticate(user=user)

        response = api_client.get(reverse("users:detail"), format="json")

        api_client.force_authenticate(user=None)

        assert response.status_code == status.HTTP_200_OK
        assert response.data["username"] == user.username

    def test_update_user(self, django_user_model, api_client):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        payload = {
            "username": "testuser",
            "email": "testuser@example.com",
            "first_name": "Test",
            "last_name": "User"
        }

        api_client.force_authenticate(user=user)

        response = api_client.put(
            reverse("users:detail"),
            data=payload,
            format="json"
        )

        api_client.force_authenticate(user=None)

        assert response.status_code == status.HTTP_200_OK
        assert user.email == payload["email"]
        assert user.first_name == payload["first_name"]
        assert user.last_name == payload["last_name"]

    def test_delete_user(self, django_user_model, api_client):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        api_client.force_authenticate(user=user)

        response = api_client.delete(
            reverse("users:detail"),
            format="json"
        )

        api_client.force_authenticate(user=None)

        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert django_user_model.objects.count() == 0


@pytest.mark.django_db
class TestBookmarkViews:
    def test_unauthorized_bookmark(self, django_user_model, api_client):
        user1 = django_user_model.objects.create_user(
            username="testuser1",
            password="43Sn1Y5y"
        )

        user2 = django_user_model.objects.create_user(
            username="testuser2",
            password="43Sn1Y5y"
        )

        bookmark = Bookmark.objects.create(
            name="Bookmark",
            url="https://testbookmark.com/",
            author=user1
        )

        api_client.force_authenticate(user=user2)

        response = api_client.get(
            reverse("bookmarks:bookmark-detail", kwargs={"pk": bookmark.id}),
            format="json"
        )

        api_client.force_authenticate(user=None)

        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_list_bookmarks(self, django_user_model, api_client):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        Bookmark.objects.create(
            name="Bookmark 1",
            url="https://testbookmark1.com/",
            author=user
        )

        Bookmark.objects.create(
            name="Bookmark 2",
            url="https://testbookmark2.com/",
            author=user
        )

        api_client.force_authenticate(user=user)

        response = api_client.get(
            reverse("bookmarks:bookmark-list"),
            format="json"
        )

        api_client.force_authenticate(user=None)

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data["results"]) == 2

    def test_create_bookmark(self, django_user_model, api_client):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        payload = {
            "name": "Bookmark",
            "url": "https://testbookmark.com/",
        }

        api_client.force_authenticate(user=user)

        response = api_client.post(
            reverse("bookmarks:bookmark-list"),
            data=payload,
            format="json"
        )

        api_client.force_authenticate(user=None)

        assert response.status_code == status.HTTP_201_CREATED
        assert Bookmark.objects.count() == 1
        assert user.bookmarks.count() == 1

        bookmark = Bookmark.objects.get()

        assert bookmark.name == payload["name"]
        assert bookmark.url == payload["url"]

    def test_retrieve_bookmark(self, django_user_model, api_client):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        bookmark = Bookmark.objects.create(
            name="Bookmark",
            url="https://testbookmark.com/",
            author=user
        )

        api_client.force_authenticate(user=user)

        response = api_client.get(
            reverse("bookmarks:bookmark-detail", kwargs={"pk": bookmark.id}),
            format="json"
        )

        api_client.force_authenticate(user=None)

        assert response.status_code == status.HTTP_200_OK
        assert response.data["name"] == bookmark.name

    def test_update_bookmark(self, django_user_model, api_client):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        bookmark = Bookmark.objects.create(
            name="Bookmark",
            url="https://testbookmark.com/",
            author=user
        )

        payload = {
            "name": "Modified Bookmark",
            "url": "https://modifiedbookmark.com/",
            "description": "This is a modified bookmark.",
        }

        api_client.force_authenticate(user=user)

        response = api_client.put(
            reverse("bookmarks:bookmark-detail", kwargs={"pk": bookmark.id}),
            data=payload,
            format="json"
        )

        api_client.force_authenticate(user=None)

        bookmark = Bookmark.objects.get()

        assert response.status_code == status.HTTP_200_OK
        assert bookmark.name == payload["name"]
        assert bookmark.url == payload["url"]
        assert bookmark.description == payload["description"]

    def test_delete_bookmark(self, django_user_model, api_client):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        bookmark = Bookmark.objects.create(
            name="Bookmark",
            url="https://testbookmark.com/",
            author=user
        )

        api_client.force_authenticate(user=user)

        response = api_client.delete(
            reverse("bookmarks:bookmark-detail", kwargs={"pk": bookmark.id}),
            format="json"
        )

        api_client.force_authenticate(user=None)

        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert Bookmark.objects.count() == 0
