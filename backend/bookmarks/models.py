from django.db import models


# Create your models here.
class Bookmark(models.Model):
    """
    This model represents a bookmark.
    """
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    url = models.URLField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
