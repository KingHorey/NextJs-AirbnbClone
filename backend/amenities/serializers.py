from rest_framework import serializers

from .models import Amenity

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["__all__"]
        model = Amenity