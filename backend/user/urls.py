from django.urls import path
from .views import RegisterUserView, GetUserInfoView

urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register users"),
    path("info/", GetUserInfoView.as_view(), name="get user info"),
]
