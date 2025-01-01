from django.db import models

# Create your models here.


class Amenity(models.Model):
    """

    """
    name = models.CharField(max_length=30, null=False, unique=True, help_text="Enter a unique name for the amenity (e.g., 'Pool').")
    description = models.TextField(null=True, help_text="Provide a brief "
                                                        "description of the amenity.")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'amenity'
        verbose_name_plural = 'amenities'
        ordering = [
            'name'
        ]