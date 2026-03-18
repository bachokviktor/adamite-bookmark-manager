from django.utils.translation import gettext_lazy as _
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import (
    extend_schema_view, extend_schema, OpenApiParameter
)

from .models import Bookmark
from .serializers import BookmarkSerializer


@extend_schema_view(
    list=extend_schema(
        description=_("Get a list of bookmarks for the current user."),
        summary=_("Get a list of bookmarks for the current user")
    ),
    create=extend_schema(
        description=_("Create a bookmark."),
        summary=_("Create a bookmark")
    ),
    retrieve=extend_schema(
        description=_("Get a specific bookmark."),
        summary=_("Get a specific bookmark"),
        parameters=[
            OpenApiParameter(
                name="id",
                description=_("Bookmark ID"),
                location=OpenApiParameter.PATH,
                required=True,
                type=int
            )
        ]
    ),
    update=extend_schema(
        description=_("Update a specific bookmark."),
        summary=_("Update a specific bookmark"),
        parameters=[
            OpenApiParameter(
                name="id",
                description=_("Bookmark ID"),
                location=OpenApiParameter.PATH,
                required=True,
                type=int
            )
        ]
    ),
    partial_update=extend_schema(
        exclude=True
    ),
    destroy=extend_schema(
        description=_("Delete a specific bookmark."),
        summary=_("Delete a specific bookmark"),
        parameters=[
            OpenApiParameter(
                name="id",
                description=_("Bookmark ID"),
                location=OpenApiParameter.PATH,
                required=True,
                type=int
            )
        ]
    )
)
class BookmarkViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing bookmark instances.
    """
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
