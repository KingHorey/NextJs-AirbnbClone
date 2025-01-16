from rest_framework.generics import RetrieveAPIView, CreateAPIView

from user.serializers import UserSerializer, RegisterUserSerializer
from .models import User

class GetUserInfoView(RetrieveAPIView):
    queryset = User.objects.all()
    lookup_field = 'id'
    serializer_class = UserSerializer

class RegisterUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
