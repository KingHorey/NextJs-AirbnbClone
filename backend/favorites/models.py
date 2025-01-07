from uuid import uuid4

from django.db import models

from properties.models import Properties


# Create your models here.
class Favorite(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE,
                             related_name="favorites")
    property = models.ForeignKey(Properties, related_name='favorited_by',
                                 on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'property')  # Prevent duplicate favorites.
        verbose_name = "Favorite"
        verbose_name_plural = "Favorites"

    def __str__(self):
        return f"{self.user} favorited {self.property}"