from rest_framework import serializers

from reviews.models import Review
from .models import User
from reviews.serializers import ReviewSerializer

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"


class UserInfoSerializer(serializers.ModelSerializer):
    properties = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = "__all__"

    def get_properties(self, obj):
        """ get all the listings of a user """
        return obj.properties.all()

    def to_representation(self, instance):
        user = super().to_representation(instance)
        # add all reviews for a user's listed property
        # get all user's property
        user_properties = self.get_properties(instance)
        property_reviews = Review.objects.filter(property__in=user_properties)
        user['reviews'] = ReviewSerializer(property_reviews,many=True).data
        return user
