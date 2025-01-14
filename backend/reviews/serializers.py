from rest_framework import serializers
from .models import Review
from properties.models import Properties


class ReviewSerializer(serializers.ModelSerializer):
	user = serializers.HiddenField(default=serializers.CurrentUserDefault())
	property = serializers.PrimaryKeyRelatedField(
		queryset=Properties.objects.all(), allow_null=False)

	class Meta:
		fields = "__all__"
		model = Review

	# def create(self, validated_data):
	# 	""" create an instance of a review tied to a property """