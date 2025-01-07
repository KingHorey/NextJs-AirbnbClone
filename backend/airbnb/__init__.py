from .celery import app as celery_app

import logging

logger = logging.getLogger(__name__)
__all__ = ('celery_app',)