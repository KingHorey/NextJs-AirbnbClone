from datetime import datetime, date

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from properties.serializers import PropertiesListSerializer
from .models import Booking



class BookingSerializer(serializers.ModelSerializer):
    property = PropertiesListSerializer(read_only=True)
    class Meta:
        model = Booking
        fields = ["start_date", "end_date", "number_of_guests",
                  "property"]

    def create(self, validated_data):
        number_of_guests = validated_data.get("number_of_guests",
                                              None)
        property_instance = self.context.get('property_instance',
                                             None)
        if property_instance is None:
            raise ValidationError("Please provide the property to "
                                  "be booked")
        start_date = validated_data.get("start_date", None)
        end_date = validated_data.get("end_date", None)
        if not start_date or not end_date:
            raise ValidationError("No booking date provided")
        current_date = datetime.utcnow().date()
        # start_date = self._get_datetime_obj(start_date)
        # end_date = self._get_datetime_obj(end_date)
        if start_date >= end_date:
            raise ValidationError("End date must be after start date")
        if  start_date < current_date:
            raise ValidationError("Booking start date cannot be "
                                  "before current day")
        if number_of_guests > property_instance.max_guests:
            raise ValidationError("Number of guests exceeds the "
                                  "number of allowed guests for "
                                  "this property")
        instance = super().create(validated_data)
        return instance

    @staticmethod
    def _get_datetime_obj(date):
        """ method to get the current date as a datetime obj """
        if isinstance(date, date):
            return
        return datetime.combine(date, datetime.min.time())
