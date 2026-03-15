from bookmarks.models import Bookmark
import pytest


@pytest.mark.django_db
class TestUsers:
    def test_create_user(self, django_user_model):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        assert user.id == 1
        assert user in django_user_model.objects.all()

    def test_delete_user(self, django_user_model):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        user.delete()

        assert django_user_model.objects.count() == 0


@pytest.mark.django_db
class TestBookmarks:
    def test_create_bookmark(self, django_user_model):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        bookmark = Bookmark.objects.create(
            name="Test Bookmark",
            url="https://example.com/",
            author=user
        )

        assert bookmark.id == 1
        assert bookmark in Bookmark.objects.all()
        assert bookmark.author == user
        assert bookmark in user.bookmarks.all()

    def test_delete_bookmark(self, django_user_model):
        user = django_user_model.objects.create_user(
            username="testuser",
            password="43Sn1Y5y"
        )

        bookmark = Bookmark.objects.create(
            name="Test Bookmark",
            url="https://example.com/",
            author=user
        )

        bookmark.delete()

        assert Bookmark.objects.count() == 0
        assert user.bookmarks.count() == 0
