from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Bookmark
from .serializers import BookmarkSerializer


class BookmarkViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing bookmark instances.
    """
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(author=self.request.user)
