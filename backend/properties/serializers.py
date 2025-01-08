import math

from rest_framework import serializers

from amenities.serializers import AmenitySerializer
from location.serializers import AddressSerializer
from properties.models import Properties
from reviews.serializers import ReviewSerializer
from user.serializers import UserSerializer


class PropertiesListSerializer(serializers.ModelSerializer):
	rating = serializers.SerializerMethodField()

	class Meta:
		model = Properties
		fields = ["id", "location", "price_per_night", "rating"]

	def get_rating(self, obj: 'Properties') -> int:
		"""
			method field to get the average rating for a property

			Args:
				obj - property instance to be queried
		"""
		reviews = obj.reviews.all()
		number_of_reviews = reviews.count()
		if number_of_reviews == 0:
			return 0
		average_rating = sum((reviews.rating for reviews in reviews)) / number_of_reviews
		return round(average_rating, 2)


class PropertyDetailSerializer(serializers.ModelSerializer):
	rating = serializers.SerializerMethodField()
	amenities = AmenitySerializer(many=True)
	host = UserSerializer()
	reviews = ReviewSerializer(many=True, read_only=True)
	address = AddressSerializer()

	class Meta:
		model = Properties
		fields = "__all__"

	@staticmethod
	def get_rating(obj):
		"""
					method field to get the average rating for a property

					Args:
						obj - property instance to be queried
				"""
		reviews = obj.reviews.all()
		number_of_reviews = reviews.count()
		if number_of_reviews == 0:
			return 0
		average_rating = sum(
			(reviews.rating for reviews in reviews)) / number_of_reviews
		return round(average_rating, 2)

	def to_representation(self, instance):
		""" customize the output that is to be sent as a response """
		representation = super().to_representation(instance)
		discounted_price = instance.discounted_price()
		representation['discounted_price'] = discounted_price
		return representation