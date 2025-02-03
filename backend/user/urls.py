from django.urls import path
from .views import RegisterUserView, GetUserInfoView, GetAllUsersView

urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register users"),
    path("info/<uuid:id>/", GetUserInfoView.as_view(), name="get user info"),
    path("info/all-users/", GetAllUsersView.as_view(), name="get all users"),
]
