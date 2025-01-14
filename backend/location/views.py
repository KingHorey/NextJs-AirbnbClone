from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

from location.serializers import StateSerializer
from properties.models import Properties

from .models import State


class CreateStateView(CreateAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer
    permission_classes = [IsAuthenticated]


class ViewListingsInStateView(ListAPIView):
    serializer_class = StateSerializer

    def get_queryset(self, state, country):
        property_listings = Properties.objects.all()
        return State.objects.prefetch_related()

    def list(self, request, *args, **kwargs):
        """ list all the property listing in a state """
        state_name = kwargs.get("state", None)
        country_name = self.request.query_params.get('q', None)
        if country_name is None:
            return Response({
                'data': 'Please provide a country'
            }, status=status.HTTP_400_BAD_REQUEST)
        data = self.get_queryset()
