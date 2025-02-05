from django.contrib.auth import get_user_model

import logging

from celery import shared_task
from .models import Notification

User = get_user_model()

logger = logging.getLogger(__name__)


@shared_task(bind=True, max_retries=3)
def send_notification(self, user_email: str, **kwargs) -> None:
    """
        send a notification to the user when an action is made
        args:
            user_email - email of the host who has the property

    """
    try:
        content = kwargs.get('content')
        notification_type = kwargs.get('notification_type')
        link = kwargs.get('link')
        notification_category = kwargs.get('notification_category')
        user = User.objects.get(email=user_email) # email belongs to the
        # property host
        Notification.objects.create(title="You have a new review",
                                    content=content, user=user,
                                    notification_type=notification_type,
                                    notification_category=notification_category,
                                    link=link)
    except User.DoesNotExist as e:
        logger.error(f"User does not exist - {e}")
    except Exception as exc:
        self.retry(exc=exc, countdown=5)
