from django.contrib.auth import get_user_model
from django.db import models


# Create your models here.
class Bookmark(models.Model):
    """
    This model represents a bookmark.
    """
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    url = models.URLField(max_length=200)
    author = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="bookmarks"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["name"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return self.name
