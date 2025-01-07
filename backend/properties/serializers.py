from rest_framework import serializers


class PropertiesListSerializer(serializers.ModelSerializer):
	location =
	fields = ["id", "location", "price_per_night"]


