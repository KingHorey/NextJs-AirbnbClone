from typing import Optional

from django.shortcuts import render

from rest_framework.generics import CreateAPIView, get_object_or_404, \
    RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

from .models import Review
from properties.models import Properties

from .serializers import ReviewSerializer


# Create your views here.

class CreateReview(CreateAPIView):
    queryset = Review.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ReviewSerializer

    def create(self, request, *args, **kwargs):
        """ create a reivew for a property """
        data = request.data.copy()
        data['user'] = request.user.id
        property_id = data.get('property', None)
        if property_id is None:
            return Response({
                'data': 'Property id needed'
            }, status=status.HTTP_400_BAD_REQUEST)
        property_instance = get_object_or_404(Properties, id=property_id)
        check_review_existence = Review.objects.filter(
            user=request.user, property__id=property_id).exists()
        if check_review_existence:
            return Response({
                'data': 'Property can only be reviewed once'
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                'data': "Successfully created review"
            }, status=status.HTTP_201_CREATED)


class ReviewActionsView(RetrieveUpdateDestroyAPIView):
    """ class to update, destroy and get a review """
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
    serializer_class = ReviewSerializer

    def get_queryset(self) -> Optional['Review']:
        """ fetch instance by id provided"""
        return Review.objects.filter(user=self.request.user)

    # def retrieve(self, request, *args, **kwargs) -> Response:
    #     """
    #         retrieve a particular review for a user
    #         Returns:
    #             Response Object
    #     """
    #     review_id = kwargs.get('id', None)
    #     if review_id is None:
    #         return Response({
    #             'data': 'Please provide an id'
    #         }, status=status.HTTP_400_BAD_REQUEST)
    #     # get_object_or_404(Review, id=review_id, user=request.user)
    #     review_instance = self.get_object()
    #     if review_instance is None:
    #         return Response({
    #             'data': 'No review found'
    #         }, status=status.HTTP_404_NOT_FOUND)
    #     serializer = self.get_serializer(review_instance)
    #     return Response({
    #         'data': serializer.data
    #     }, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        """ update a review for a user """
        review_id = kwargs.get('id', None)
        if review_id is None:
            return Response({
                'data': 'Please provide an id'
            }, status=status.HTTP_400_BAD_REQUEST)
        review_instance = self.get_object()
        if review_instance is None:
            return Response({
                'data': 'No review found'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(review_instance, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                'data': serializer.data
            }, status=status.HTTP_200_OK)


