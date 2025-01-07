from django.shortcuts import render

from rest_framework.generics import ListAPIView


from .models import Properties
from .serializers
# Create your views here.
class GetAllProperties(ListAPIView):
	queryset = Properties
	serializer_class = PropertiesSerializer
