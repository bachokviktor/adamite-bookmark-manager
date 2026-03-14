from rest_framework import serializers

from .models import Bookmark


class BookmarkSerializer(serializers.ModelSerializer):
    """
    This serializers is used to retrieve and modify a bookmark.
    """
    class Meta:
        model = Bookmark
        fields = ["id", "name", "description", "url", "author", "created_at"]
        read_only_fields = ["author", "created_at"]
