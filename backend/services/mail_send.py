from typing import Any, List

import logging
from django.core.mail import send_mail, send_mass_mail
from django.conf import settings
from django.template.loader import render_to_string

logger = logging.getLogger(__name__)


class MailService:
    """
        class to handle sending of mails
    """

    def __init__(self):
        self.sender = settings.DEFAULT_FROM_EMAIL
    #     self.auth_password = settings.EMAIL_HOST_PASSWORD

    def _create_message(self, template: str, content: dict[str, Any]) -> str:
        """_summary_

        Args:
            template (str):name of the template to be used
            content (dict[str, Any]): relevant params to be used in rendering content to template

        Returns:
            str: template rendered to string or error if no template is provided
        """
        if template:
            return render_to_string(template, content)
        return "Provide a template"

    def mail_send(self, title: str, content: dict[str, Any], recipient: str, template_name: str, message: str = "", sender="") -> None:
        """_summary_

        Args:
            title (str): title of the mail
            content (dict[str, Any]): dict that contains rlvant information to be passed to the template
            recipient (List[str]): recipient of mail
            template_name (str): name of the template to be used in sending mail
            message (str, optional): _description_. Defaults to "".

        Returns:
            None
        """
        try:
            content = self._create_message(template_name, content)
            if sender is None:
                sender = self.sender
            logger.info(f"Sending mail to {recipient} {content}")
            send_mail(title, message,
                      from_email=sender,
                      recipient_list=[recipient],
                      html_message=content)
        except Exception as e:
            logger.error(f"Error sending mail to {recipient} {e}")
            return e

    def send_bulk_mail(self, title: str, content: dict[str, Any], recipient: List[str], template_name: str, message="", sender=None):
        """
            method to send bulk mails
        """
        try:
            if sender is None:
                sender = self.sender
            content = self._create_message(template_name, content)
            logger.info(f"Sending mail to {recipient} {content}")
            send_mass_mail(title, message,from_email=sender, recipient_list=recipient, html_message=content, fail_silently=False)
        except Exception as e:
            pass



mail_service = MailService()
__all__ = ["mail_service"]
