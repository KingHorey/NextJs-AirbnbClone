from rest_framework.generics import RetrieveAPIView

from user.serializers import UserSerializer
from .models import User

class GetUserInfoView(RetrieveAPIView):
    queryset = User.objects.all()
    lookup_field = 'id'
    serializer_class = UserSerializer

