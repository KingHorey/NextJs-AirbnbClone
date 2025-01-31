from uuid import uuid4


from django.db import models
from django.contrib.auth import get_user_model

PENDING = 'pending'
FAILED = 'failed'
SUCCESS = 'success'

User = get_user_model()


# Create your models here.
class Payment(models.Model):

    PAYMENT_STATUS = [
        (PENDING, 'pending'),
        (FAILED, 'failed'),
        (SUCCESS, 'success')
    ]

    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    booking = models.ForeignKey('booking.Booking', related_name='payment',
                                on_delete=models.CASCADE, null=False, blank=True)
    payment_reference = models.CharField(
        max_length=15, null=False, blank=False, editable=False, unique=True)
    user = models.ForeignKey(
        User, related_name='payment', on_delete=models.CASCADE)
    status = models.CharField(
        choices=PAYMENT_STATUS, max_length=8, default='Pending', db_default='Pending')
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    paid_at = models.DateTimeField(auto_now=True)
    currency = models.CharField(max_length=3, default='NGN')
    channel = models.CharField(max_length=50, default='card')
    payment_provider = models.CharField(max_length=50, default='paystack')

    class Meta:
        verbose_name = 'payment'
        verbose_name_plural = 'payments'
        indexes = [models.Index(
            fields=['payment_reference', 'status']
        )]
        ordering = ['-created_at']
        # order_with_respect_to = 'user'
