from django.db.models.signals import post_save
from django.dispatch import receiver
from celery import group

from .models import Review
from .tasks import send_review_mail, send_notification

@receiver(post_save, sender=Review)
def notification_host_on_review(sender, created, instance, **kwargs) -> None:
    """
    Notify the host when a review is made:
        - Send an email to the host.
        - Create a notification in the database.
    """
    if created and instance:
        group(send_notification.s(instance.property.host.email,
                                  content=f"New review for "
                                          f"{instance.property.name}"), send_review_mail.s(instance.property.host.email,
                                 property=instance.property.name),
              ).apply_async()