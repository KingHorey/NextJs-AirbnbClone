from enum import Enum

from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

import logging

from .models import Notification
from .serializers import NotificationSerializer

logger = logging.getLogger(__name__)


notification_content = {
    'review': 'You have received a new review for your property',
    'booking_accepted': 'Your booking has been accepted',
    'booking_rejected': "Your booking has been rejected",
    "payment_received": "Payment received.",
    "payment_success": "Payment successful.",
    "payment_failed": "Payment failed",
    "amenity_added": "A new amenity has been listed",
    "general": "Notification received"
}

@receiver(post_save, sender=Notification)
def send_notification_to_socket(sender, instance, **kwargs) -> None:
    channel = get_channel_layer()
    if instance:
        user_id = instance.user.id # get the id of the owner
        message = notification_content.get(str(instance.notification_category).lower())
        logger.info(message)
        serialized_data = NotificationSerializer(instance).data
        async_to_sync(channel.group_send)(f"user_{user_id}", {
            "type": "send_notification",
            "notification": {
                "message": message,
                "title": instance.title,
                "notification_type": instance.notification_type,
                "link": instance.link,
                "is_read": instance.is_read,
                "created_at": serialized_data.get("created_at")
            }
        })

