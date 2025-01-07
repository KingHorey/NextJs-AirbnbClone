from django.db import models

# Create your models here.
class ViewedProperties(models.Model):
    property = models.ForeignKey('property.Properties',
                                 related_name="viewed_property",
                                 on_delete=models.CASCADE)
    user = models.ForeignKey('user.User',
                             related_name="my_viewed_properties",
                             on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        verbose_name = "viewed_property"
        verbose_name_plural = "viewed_properties"
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['property'])
        ]
        unique_together = ('user', 'property')

    def __str__(self):
        return f"Property: {self.property.name} viewed by {self.user.email}"
