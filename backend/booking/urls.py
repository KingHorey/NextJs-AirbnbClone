from django.urls import path
from .views import BookingView, UpdateBookingView

urlpatterns = [
    path("create-booking/<uuid:id>/", BookingView.as_view(),
         name="Create a booking"),
    path("my-bookings/", BookingView.as_view(), name="Get all "
                                                     "bookings"),
    path("my-bookings/actions/", UpdateBookingView.as_view(),
         name="update, delete booking")
]