from rest_framework import status
from rest_framework.generics import ListCreateAPIView, get_object_or_404, \
    DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from properties.models import Properties
from .models import Favorite
from .serializers import FavoriteSerializer


# Create your views here.
class FavoriteView(ListCreateAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        property_id = kwargs.get('id', None)
        if property_id is None:
            return Response({
                'data': 'Please provide a property to be added to favorite'
            }, status=status.HTTP_400_BAD_REQUEST)
        user = request.user
        property_instance = get_object_or_404(Properties, id=property_id)
        user_favorite, created = Favorite.objects.get_or_create(
            user=user, property=property_instance)
        if not created:
            return  Response({
                'data': 'Property already in user favorites'
            }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'data': 'Property addded to favorites'
        }, status=status.HTTP_201_CREATED)


class FavoriteAction(DestroyAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

