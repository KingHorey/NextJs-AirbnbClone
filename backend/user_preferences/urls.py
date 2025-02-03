from django.urls import path

from .views import UpdateUserPreferencesView

urlpatterns = [
	path("my-preferences/", UpdateUserPreferencesView.as_view(), name="my preferences"),
]
