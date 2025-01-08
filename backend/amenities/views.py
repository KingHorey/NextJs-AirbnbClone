from django.shortcuts import render
from rest_framework.generics import ListAPIView, UpdateAPIView, CreateAPIView, \
    RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser

from amenities.serializers import AmenitySerializer

from .models import Amenity


# Create your views here.
class AmenityListView(ListAPIView):
    serializer_class = AmenitySerializer
    queryset = Amenity.objects.all()


class AmenityActionsView(CreateAPIView):
    permission_classes = [IsAdminUser]
    lookup_field = 'id'
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer


class AmenityUpdateView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUser]
    lookup_field = 'id'
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer