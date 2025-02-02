from celery import shared_task
from airbnb import logger

from services.mail_send import mail_service

from django.contrib.auth import get_user_model

from notifications.models import Notification

User = get_user_model()


@shared_task(bind=True, max_retries=5)
def send_review_mail(self, mail: str, **kwargs) -> None:
    """ send the host a mail on a user review
        args:
            - mail: users/host mail
    """
    recipient = mail
    property_name = kwargs.get('property')

    try:
        content = {
            'property_name': property_name
        }
        mail_service.mail_send('Review Made', content, recipient=recipient, template_name='review_made.html')
    except Exception as exc:
        self.retry(exc=exc, countdown=5)

@shared_task(bind=True, max_retries=3)
def send_notification(self, user_email: str, **kwargs) -> None:
    """ send a notification to the user when a review is made
        args:
        user_email - email of the host who has the property
    """
    try:
        content = kwargs.get('content')
        notification_type = kwargs.get('notification_type')
        link = kwargs.get('link')
        # title = str(content)[:15]
        user = User.objects.get(email=user_email) # email belongs to the
        # property host
        Notification.objects.create(title="You have a new review",
                                    content=content, user=user,
                                    notification_type=notification_type,
                                    link=link)
    except User.DoesNotExist as e:
        logger.error(f"User does not exist - {e}")
    except Exception as exc:
        self.retry(exc=exc, countdown=5)
