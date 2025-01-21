from django.db.models.signals import post_save
from django.dispatch import receiver
from celery import group

from .models import Review
from .tasks import send_review_mail

from notifications.tasks import send_notification

from decouple import config

base_url = config("BASE_URL")
@receiver(post_save, sender=Review)
def notification_host_on_review(sender, created, instance, **kwargs) -> None:
    """
    Notify the host when a review is made:
        - Send email to the host.
        - Create a notification in the database.
    """
    if created and instance:
        group(send_notification.s(user_email=instance.property.host.email,
                                  content=f"{instance.content}",
                                  link=f"/reviews/{instance.id}",
                                  notification_type="info", notification_category="review",
                                  title="You have a new review"),
              send_review_mail.s(instance.property.host.email,
                                 property=instance.property.name),
              ).apply_async()
