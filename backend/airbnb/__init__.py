from .celery import app as celery_app
from fernet import Fernet
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured

import logging
if not hasattr(settings, 'ENCRYPT_KEY'):
    raise ImproperlyConfigured("Encrypt key must be in settings")

try:
	cipher = Fernet(settings.ENCRYPT_KEY.encode())
except Exception as e:
    raise(f"Invalid encryption format: {e}") from e

logger = logging.getLogger(__name__)
__all__ = ('celery_app',)
