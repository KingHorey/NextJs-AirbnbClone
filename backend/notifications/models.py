from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your models here.
class Notification(models.Model):
    NOTIFICATION_CATEGORY = [
        ("review", "Review"),
        ("booking_received", "Booking Received"),
        ("booking_accepted", "Booking Accepted"),
        ("booking_rejected", "Booking Rejected"),
        ("payment_received", "Payment Received"),
        ("payment_success", "Payment Success"),
        ("payment_failed", "Payment Failed"),
        ("payment_pending", "Payment Pending"),
        ("amenity_added", "Amenity Added"),
        ("general", "General")
    ]
    NOTIFICATION_TYPE = [
        ('info', 'INFO'),
        ('warning', 'WARNING'),
        ('success', 'SUCCESS'),
        ('failed', 'FAILED'),
    ]

    title = models.CharField(max_length=256, null=False, blank=False)
    content = models.TextField(null=False, blank=False)
    user = models.ForeignKey(User, related_name='notifications',
                             on_delete=models.CASCADE)
    notification_category = models.CharField(
        max_length=50, choices=NOTIFICATION_CATEGORY, default='general')
    notification_type=models.CharField(max_length=50, choices=NOTIFICATION_TYPE, default='info')
    link = models.CharField(max_length=1024, blank=True, null=True) # a relative link to be send to the frontend
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{str(self.content)[:10]}... for {self.user}"

    class Meta:
        verbose_name = "notification"
        verbose_name_plural = "notifications"
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['is_read']),
        ]
        ordering = ["-created_at"]
        # unique_together = ('user', 'title')=
