import json
from typing import Any

from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from channels.generic.websocket import (JsonWebsocketConsumer)

from .serializers import NotificationSerializer

User = get_user_model()

class NotificationConsumer(JsonWebsocketConsumer):

    def connect(self) -> None:
        """
            method to accept websocket connections sent from client is user
            is authenticated.
        """
        user = self.scope['user']
        if user.is_authenticated:
            # create a group for the user for all instances from the same
            # user to get the
            user_group = f"user_{user.id}"
            async_to_sync(self.channel_layer.group_add)(
                user_group, self.channel_name
            )
            self.accept()
            self.send_json({"type": "connected to notification socket"})
        else:
            self.close()

    def disconnect(self, code: Any) -> None:
        user = self.scope['user']
        if self.user.is_authenticated:
            async_to_sync(self.channel_layer.group_discard)(
                f"user_{user.id}", self.channel_name
            )

    def receive_json(self, content, **kwargs) -> None:
        """ receive JSON """
        serialized_data = NotificationSerializer(data=content)
        if serialized_data.is_valid():
            serialized_data.save()
            self.send_json({"status": "Notification created successfully"})
        else:
            self.send_json({"errors": serialized_data.errors})

    def send_notification(self, content) -> None:
        message = content['notification']
        self.send_json(message)