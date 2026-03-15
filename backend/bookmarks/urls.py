from rest_framework.routers import SimpleRouter

from . import views


app_name = "bookmarks"

router = SimpleRouter()
router.register(r"", views.BookmarkViewSet, basename="bookmark")

urlpatterns = router.urls
