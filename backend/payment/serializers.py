from rest_framework import serializers
from .models import Payment


class CreatePaymentIntentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = "__all__"

    def create(self, validated_data):
        print(validated_data)
        return super().create(validated_data)
