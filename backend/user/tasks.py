from typing import Optional
from uuid import UUID

from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings

from .models import User

import logging


logger = logging.getLogger(__name__)

default_sender = settings.DEFAULT_FROM_EMAIL
welcome_mail = "welcome_mail.html"
password_reset = "password_reset.html"


@shared_task(max_retries=3)
def send_welcome_mail(user_id: str) -> None:
    """ send mail when user successfully registers """
    if not user_id:
        return "NO user"
    try:
        user = User.objects.get(id=UUID(user_id))
        subject = "Welcome to AirBnb"
        content = render_to_string(welcome_mail, {
            'email': user.email,
            'first_name': user.first_name
        })
        send_mail(subject, "A home nearby", default_sender,
                  auth_password=settings.EMAIL_HOST_PASSWORD,
                  recipient_list=[user.email],
                  html_message=content)
    except User.DoesNotExist:
        return
    except Exception as e:
        logger.error(f"Unable to send email to {user.email} - {e}")

