from rest_framework import serializers

from .models import State, Address, Town, Country, Continent


class ContinentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Continent
        fields = "__all__"


class CountrySerializer(serializers.ModelSerializer):
    continent = ContinentSerializer()

    class Meta:
        model = Country
        fields = "__all__"


class StateSerializer(serializers.ModelSerializer):
    country = CountrySerializer()

    class Meta:
        model = State
        fields = "__all__"

class TownSerializer(serializers.ModelSerializer):
    state = StateSerializer()
    class Meta:
        model = Town
        fields = "__all__"

class AddressSerializer(serializers.ModelSerializer):
    town = TownSerializer()
    class Meta:
        model = Address
        fields = ["street", "town", "postal_code"]

