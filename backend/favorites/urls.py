from django.urls import path

from favorites.views import FavoriteView, FavoriteAction

urlpatterns = [
    path("/create", FavoriteView.as_view(), name="create and list property "
                                                 "to fav"),
    path("/actions", FavoriteAction.as_view(), name="delete a property from "
                                                    "favorite")
]