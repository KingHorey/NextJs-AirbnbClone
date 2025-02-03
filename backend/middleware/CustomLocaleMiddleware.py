from asgiref.sync import iscoroutinefunction, markcoroutinefunction
from django.utils.translation import activate
from user_preferences.models import UserPreferences

from django.contrib.auth import get_user_model
from django.utils.decorators import sync_and_async_middleware


User = get_user_model()

class CustomLocaleMiddleware:

    async_capable = True
    @sync_and_async_middleware
    def __init__(self, get_response):
        self.get_response = get_response
        if iscoroutinefunction(self.get_response):
            markcoroutinefunction(self)

    async def __call__(self, request):
        response = await self.get_response(request)
        if request.user.is_authenticated:
            user = UserPreferences.objects.filter(user=request.user).first()
            if user:
                activate(user.language)
                request.LANGUAGE_CODE = user.language
        return response

    # def __call__(self, request):
    #     if request.user.is_authenticated:
    #         user = UserPreferences.objects.filter(user=request.user).first()
    #         if user:
    #             activate(user.language)
    #     return self.get_response(request)
