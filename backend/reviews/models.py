from uuid import uuid4

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from properties.models import Properties

class Review(models.Model):
    """ review model """
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    content = models.TextField(null=False, blank=False)
    property = models.ForeignKey(Properties, related_name="reviews",
                                 on_delete=models.CASCADE)
    user = models.ForeignKey('user.User', related_name="my_reviews",
                             on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=False,
                                 blank=False, validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (f"{self.user.email} rated {self.property.name} {self.rating} "
                f"stars")

    class Meta:
        verbose_name = "review"
        verbose_name_plural = "reviews"
        unique_together = ['property', 'user']
        ordering = ["-created_at"]