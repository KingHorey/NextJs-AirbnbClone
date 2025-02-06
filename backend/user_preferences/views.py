from django.utils.translation import activate

from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView

from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.conf import settings
from django.contrib.auth import get_user_model

from .models import UserPreferences
from .serializers import UpdatePreferencesSerializer


# Create your views here.

User = get_user_model()


class GetLanguagesView(APIView):
	"""_summary_

	Args:
		APIView (_type_): get the list of languages available in the system.
	"""

	def get(self):
		"""
			Get the list of languages available in the system.
		"""

		languages = [{'code': code, 'name': name} for code, name in settings.LANGUAGES]
		return Response({
			'data': languages
		}, status=status.HTTP_200_OK)


class GetCurrenciesView(APIView):
	"""_summary_

	Args:
		APIView (_type_): get the list of currencies available in the system.
	"""

	def get(self):
		"""
			Get the list of currencies available in the system.
		"""

		currencies = [{'code': code, 'name': name} for code, name in settings.CURRENCIES]
		return Response({
			'data': currencies
		}, status=status.HTTP_200_OK)


class UpdateUserPreferencesView(RetrieveUpdateAPIView):
	"""_summary_

	Args:
		RetriveUpdateAPIView (_type_): _description_
	"""
	permission_classes = [IsAuthenticated]
	serializer_class = UpdatePreferencesSerializer

	def get_object(self):
		"""
			Get the user preferences object.
		"""
		# return self.request.user.preferences - let's not use this
		preferences, _ = UserPreferences.objects.get_or_create(user=self.request.user) # will always work because there are default preferences
		activate(preferences.language)
		self.request.LANGUAGE_CODE = preferences.language
		return preferences

	def put(self, request, *args, **kwargs):
		"""
			Update the user preferences.

			args -
			request - the request object
		"""
		object = self.get_object()
		serializer = self.get_serializer(object, data=request.data, partial=True)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		activate(serializer.instance.language)
		request.LANGUAGE_CODE = serializer.instance.language
		return Response({
			'data': serializer.data
		}, status=status.HTTP_200_OK)
