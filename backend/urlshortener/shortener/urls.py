from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("shorten", views.shortenURL, name="shorten"),
    path("fetch", views.fetchStoredURL, name="fetch"),
]