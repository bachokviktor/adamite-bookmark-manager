from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import (
    extend_schema_view, extend_schema, OpenApiParameter
)

from .models import Bookmark
from .serializers import BookmarkSerializer


@extend_schema_view(
    list=extend_schema(
        description="Get a list of bookmarks for the current user.",
        summary="Get a list of bookmarks for the current user"
    ),
    create=extend_schema(
        description="Create a bookmark.",
        summary="Create a bookmark"
    ),
    retrieve=extend_schema(
        description="Get a specific bookmark.",
        summary="Get a specific bookmark",
        parameters=[
            OpenApiParameter(
                name="id",
                description="Bookmark ID",
                location=OpenApiParameter.PATH,
                required=True,
                type=int
            )
        ]
    ),
    update=extend_schema(
        description="Update a specific bookmark.",
        summary="Update a specific bookmark",
        parameters=[
            OpenApiParameter(
                name="id",
                description="Bookmark ID",
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
        description="Delete a specific bookmark.",
        summary="Delete a specific bookmark",
        parameters=[
            OpenApiParameter(
                name="id",
                description="Bookmark ID",
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
