from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

import logging

from .models import Notification
from .serializers import NotificationSerializer

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Notification)
def send_notification_to_socket(sender, created, instance, **kwargs) -> None:
    channel = get_channel_layer()
    if created and instance:
        user_id = instance.user.id # get the id of the owner
        serialized_data = NotificationSerializer(instance).data
        async_to_sync(channel.group_send)(f"user_{user_id}", {
            "type": "send_notification",
            "notification": {
                "message": "Someone left a review on your property",
                "title": "New review received",
                "created_at": serialized_data.get("created_at")
            }
        })