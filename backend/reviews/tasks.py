from celery import shared_task, chain
from airbnb import logger

from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string

from user.models import User
from notifications.models import Notification


@shared_task(bind=True, max_retries=5)
def send_review_mail(self, mail: str, **kwargs) -> None:
    """ send the host a mail on a user review
        args:
            - mail: users/host mail
    """

    recipient = mail
    property_name = kwargs.get('property')
    sender = settings.DEFAULT_FROM_EMAIL

    try:
        content = render_to_string('review_made.html', context={
            'property_name': property_name
        })
        send_mail('Review made', 'Review Made', sender,
                  auth_password=settings.EMAIL_HOST_PASSWORD,
                  html_message=content, recipient_list=[recipient])
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
        user = User.objects.get(email=user_email)
        Notification.objects.create(title="You have a new review",
                                    content=content, user=user)
    except User.DoesNotExist as e:
        logger.error(f"User does not exist - {e}")
    except Exception as exc:
        self.retry(exc=exc, countdown=5)