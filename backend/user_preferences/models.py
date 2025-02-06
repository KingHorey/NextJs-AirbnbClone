from django.db import models

from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.conf import settings


User = get_user_model()
# Create your models here.

class UserPreferences(models.Model):
    """_summary_
    Args:
        models (_type_): _description_

    Returns:
        _type_: _description_
    """
    LANGUAGES = settings.LANGUAGES
    CURRENCIES = settings.CURRENCIES

    BOOKING_TYPE = [('instant', _('INSTANT')), ('booking', _('BOOKING'))]
    booking_type = models.CharField(choices=BOOKING_TYPE, default='booking', max_length=7)
    language = models.CharField(choices=LANGUAGES, max_length=20, default='en')

    # mail notis
    email_notifications = models.BooleanField(default=True)

    # language settings
    timezone = models.CharField(max_length=50, default='UTC')
    currency = models.CharField(choices=CURRENCIES, max_length=10, default='USD')
    promotional_emails = models.BooleanField(default=False)
    user = models.OneToOneField(User, related_name='preferences', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.get_full_name}'s Preferences"
