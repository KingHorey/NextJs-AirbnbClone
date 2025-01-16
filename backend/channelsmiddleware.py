from channels.db import database_sync_to_async
from urllib.parse import parse_qs
from jwt import decode as jwt_decode
from channels.middleware import BaseMiddleware
from channels.auth import AuthMiddlewareStack
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.exceptions import AuthenticationFailed
from django.db import close_old_connections
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework_simplejwt.tokens import UntypedToken
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()


class SimpleJWTMiddleware(BaseMiddleware):
    """ custom middleware for simple jwt and django channels """
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        close_old_connections()
        # query_string = parse_qs(scope['query_string'])
        token = scope['subprotocols'][1]
        # query_string = parse_qs(scope['subprotocols']['token'].decode('utf8'))
        # token = query_string.get('token', [None])[0]

        if token:
            try:
                UntypedToken(token)
                decoded_data = jwt_decode(token, settings.SECRET_KEY, algorithms=[
                    'HS256'])
                scope['user'] = await self.get_user(decoded_data[
                                                              'user_id'])
            except (InvalidToken, TokenError):
                scope['user'] = None
        else:
            scope['user'] = None
        return await super().__call__(scope, receive, send)

    @database_sync_to_async
    def get_user(self, user_id):
        """ search for user """
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None


def JwtAuthMiddlewareStack(inner):
    return SimpleJWTMiddleware(AuthMiddlewareStack(inner))