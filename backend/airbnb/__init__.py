from .celery import app as celery_app
from fernet import Fernet
from django.conf import settings

import logging

cipher = Fernet(settings.ENCRYPT_KEY.encode())

logger = logging.getLogger(__name__)
__all__ = ('celery_app',)
