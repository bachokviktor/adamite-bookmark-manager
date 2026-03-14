from django.urls import path

from . import views


app_name = "users"

urlpatterns = [
    path("", views.UserCreateView.as_view(), name="register"),
    path("current/", views.UserDetailView.as_view(), name="detail"),
]
