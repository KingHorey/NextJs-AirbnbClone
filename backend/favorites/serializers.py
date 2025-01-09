from rest_framework import serializers

from user.serializers import UserSerializer
from .models import Favorite
from properties.serializers import PropertiesListSerializer

class FavoriteSerializer(serializers.ModelSerializer):
    property = PropertiesListSerializer()
    user = UserSerializer()

    class Meta:
        fields = "__all__"
        model = Favorite
