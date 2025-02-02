from typing import Optional, Union
import logging
from uuid import UUID

from celery import shared_task
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth import get_user_model

from services.mail_send import mail_service


User = get_user_model()
logger = logging.getLogger(__name__)

welcome_mail = "welcome_mail.html"
password_reset = "password_reset.html"
login_mail = "login.html"


def get_user(user_id) -> Union[None, User]: # type: ignore
    try:
        return User.objects.get(id=UUID(user_id))
    except User.DoesNotExist:
        return None


@shared_task(bind=True, max_retries=3)
def send_welcome_mail(self, user_id: str) -> Optional[str]:
    """ send mail when user successfully registers """
    if not user_id:
        return "NO user"
    try:
        user = get_user(user_id)
        if user is None:
            return "No user ID provided"
        subject = "Welcome to AirBnb"
        content =  {
            'email': user.email,
            'first_name': user.first_name
        }
        logger.info(f"Sending welcome mail to {user.email}")
        mail_service.mail_send(subject, content, user.email, welcome_mail)
    except Exception as e:
        logger.error(f"Unable to send email to {user.email} - {e}")


@shared_task(max_retries=3)
def send_login_mail(user_id: str) -> None:
    """_summary_

    Args:
        user_id (str): User id
    """

    if not user_id:
        return "No user provided"
    try:
        user = get_user(user_id)
        if user is None:
            return "No user id provided"
        subject = "New Login"
        content =  {
            'email': user.email,
            'first_name': user.first_name
        }
        mail_service.mail_send(subject, content, user.email, welcome_mail, subject)
    except Exception as e:
        logger.error(f"Unable to send email to {user.email} - {e}")
