from django.db import models

# Create your models here.
class Notification(models.Model):
    NOTIFICATION_TYPE = [
        ("review", "Review"),
        ("booking", "Booking"),
        ("payment", "Payment"),
        ("amenity", "Amenity"),
        ("general", "General")
    ]
    title = models.CharField(max_length=256, null=False, blank=False)
    content = models.TextField(null=False, blank=False)
    user = models.ForeignKey('user.User', related_name='notifications',
                             on_delete=models.CASCADE)
    notification_type = models.CharField(
        max_length=50, choices=NOTIFICATION_TYPE)
    link = models.CharField(max_length=1024, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{str(self.content)[:10]} for {self.user}"

    class Meta:
        verbose_name = "notification"
        verbose_name_plural = "notifications"
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['is_read']),
        ]
        ordering = ["-created_at"]
        # unique_together = ('user', 'title')