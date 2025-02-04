from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.


class Amenity(models.Model):
    """

    """
    name = models.CharField(max_length=30, null=False, unique=True, help_text=_("Enter a unique name for the amenity (e.g., 'Pool')."))
    description = models.TextField(null=True, help_text=_("Provide a brief "
                                                        "description of the amenity."))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('amenity')
        verbose_name_plural = _('amenities')
        ordering = [
            'name'
        ]
