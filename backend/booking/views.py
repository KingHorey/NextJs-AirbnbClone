from uuid import UUID
from typing import Any

from rest_framework.generics import ListCreateAPIView, \
    RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from rest_framework.generics import get_object_or_404

from rest_framework import status
from rest_framework.response import Response

from .models import Booking
from properties.models import Properties
from .serializers import BookingSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class BookingView(ListCreateAPIView):
    """ view for handling views """
    permission_classes = [IsAuthenticated]
    serializer_class = BookingSerializer

    def list(self, request, *args, **kwargs) -> Response:
        """ list view for getting all views """
        user = request.user
        bookings = Booking.objects.filter(guest=user)
        serializer = self.get_serializer(bookings, many=True)
        return Response({
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs) -> Response:
        """ method for creating a booking """
        property_id = kwargs.get('id', None)
        if property_id is None:
            return Response({
                'data': 'Please provide a property'
            }, status=status.HTTP_404_NOT_FOUND)
        property_instance = get_object_or_404(Properties, id=property_id)
        if self.request.user == property_instance.host:
            return Response({
                'data': 'Property owner cannot book his own property'
            }, status=status.HTTP_403_FORBIDDEN)
        if self.check_existing_user_booking(property_id):
            return Response({
                'data': 'Booking with same property by user already '
                        'exists'
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data,
                                         context={
                                             'property_instance':
                                                 property_instance})
        serializer.is_valid(raise_exception=True)
        serializer.save(property=property_instance,
                        guest=request.user)
        return Response({
            'data': "Property successfully booked"
        }, status=status.HTTP_201_CREATED)

    def check_existing_user_booking(self, property_id: UUID) -> bool:
        """ method to check if a user already has a booking as
        to prevent double booking """
        return Booking.objects.filter(property__id=property_id,
                                       guest=self.request.user).exists()



class UpdateBookingView(RetrieveUpdateDestroyAPIView):
    """ view for retrieving, updating and deleting booking """
    lookup_field = 'id'
    serializer_class = BookingSerializer

    def get_queryset(self) -> Response:
        """ get"""
        params = self.request.query_params
        property_id = params.get('property', None)
        if not property_id:
            return Response({
                'data': "Provide a property"
            }, status=status.HTTP_400_BAD_REQUEST)
        print(property_id)
        return Booking.objects.get(id=property_id)

    def update(self, request, *args, **kwargs) -> Any:
        """ update property """
        request = self.request.data
        booking_instance = self.get_queryset()
        if booking_instance is None:
            return Response({
                'data': 'No booking found'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(data=request)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
        }, status=status.HTTP_200_OK)

