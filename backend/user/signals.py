from django.db.models.signals import post_save
from django.dispatch import receiver

import logging

from .models import User
from .tasks import send_welcome_mail
from user_preferences.models import UserPreferences

logger = logging.getLogger(__name__)


@receiver(post_save, sender=User)
def send_welcome_verification_mail(sender, instance, created, **kwargs) -> \
        None:
    """ function for sending a welcome mail and a verification mail to a
    user on successful signup """
    if not instance:
        logger.info("No instance created")
        return
    if instance:
        UserPreferences.objects.get_or_create(user=instance)
        instance.preferences.save()
        if instance.preferences.email_notifications: # check if user has email notifications enabled
            send_welcome_mail.apply_async(args=[str(instance.id)])
