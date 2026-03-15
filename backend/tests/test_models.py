import pytest

from django.contrib.auth import get_user_model


@pytest.mark.django_db
def test_mytest():
    user = get_user_model().objects.create_user(
        username="testuser",
        password="43Sn1Y5y"
    )

    assert user.id == 1
