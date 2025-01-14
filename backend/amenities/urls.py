from django.urls import path

from amenities.views import AmenityListView, AmenityActionsView, AmenityUpdateView

urlpatterns = [
    path('all-amenities/', AmenityListView.as_view(), name="list all "
                                                           "amenities"),
    path("edit/create/", AmenityActionsView.as_view(), name="Create an "
                                                            "amenity"),
    path("edit/action/", AmenityUpdateView.as_view(), name="edit, update, "
                                                           "retrieve amenity")
]