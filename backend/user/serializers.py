from rest_framework import serializers

from reviews.models import Review
from .models import User
from reviews.serializers import ReviewSerializer

from user_preferences.serializers import UpdatePreferencesSerializer

class UserSerializer(serializers.ModelSerializer):
    preferences = UpdatePreferencesSerializer()
    class Meta:
        model = User
        fields = "__all__"
        # exclude = ["password"]


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "gender", "email", "password", "gender"
                  ]

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        email = validated_data.pop('email', None)
        user = User.objects.create_user(email=email, password=password,
                                        **validated_data)
        return user


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
