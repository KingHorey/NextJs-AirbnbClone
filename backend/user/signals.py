from django.db.models.signals import post_save
from django.dispatch import receiver

import logging

from .models import User
from .tasks import send_welcome_mail

logger = logging.getLogger(__name__)


@receiver(post_save, sender=User)
def send_welcome_verification_mail(sender, instance, created, **kwargs) -> \
        None:
    """ function for sending a welcome mail and a verification mail to a
    user on successful signup """
    if not created:
        logger.info("No instance created")
        return
    if created and instance:
        print("Instance id: ", instance.id)
        logger.info("Instance Info: ", instance.id)
        send_welcome_mail.apply_async(args=[str(instance.id)])
