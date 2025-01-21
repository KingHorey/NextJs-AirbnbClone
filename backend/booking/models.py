from uuid import uuid4, UUID
from typing import Any

from django.db import models
from django.core.exceptions import ValidationError

from django.contrib.auth import get_user_model

from properties.models import Properties
from django.db.models import Q

User = get_user_model()

class Booking(models.Model):
    BOOKING_STATUS = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed')
    ]
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    property = models.ForeignKey('properties.Properties', on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=BOOKING_STATUS, default='pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    start_date = models.DateField()
    end_date = models.DateField()
    number_of_guests = models.IntegerField(null=False)
    guest = models.ForeignKey(User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs) -> Any:
        """ custom method to adjust booking save method """
        if self.property.booking_type == "INSTANT":
            self.status = 'completed'
        else:
            booking_exists = self.check_bookings(self.id)
            if booking_exists:
                raise ValidationError("Booking already exists in "
                                      "date range")
        self.total_price = self.calculate_total_price()
        super().save(*args, **kwargs)

    def check_bookings(self, id: UUID) -> bool:
        """ method to check if a confirmed booking exists
            returns:
                boolean
        """
        return Booking.objects.filter(
            Q(status="confirmed") | Q(status="completed"),
            property=self.property,
            start_date__lte=self.end_date,
            end_date__gte=self.start_date,
        ).exclude(id=id).exists()

    def clean(self):
        if self.start_date >= self.end_date:
            raise ValidationError("End date must be after start date")
        if self.property.booking_type == "INSTANT":
            booking_exists = self.is_available()
            if booking_exists:
                raise ValidationError("Booking already exists in "
                                      "date range")
        elif self.property.booking_type == "BOOKING":
            booking_exists = self.check_bookings(self.id)
            if not booking_exists:
                raise ValidationError("Booking within this range "
                                      "has already been accepted")

    def calculate_total_price(self) -> float:
        """ calculate the amount to charge for booking based on the range of days """
        number_of_nights = (self.end_date - self.start_date).days
        return number_of_nights * self.property.price_per_night

    def is_available(self) -> bool:
        """ method to check if a booking is available """
        return not Booking.objects.filter(
            property=self.property,
            status='completed',
            start_date__lt=self.end_date,
            end_date__gt=self.start_date
        ).exists()


    def __str__(self) -> str:
        return f"{self.property.name} booking for {self.guest}"

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['property', 'start_date', 'end_date'],
                name="booking_check",
                condition=models.Q(status="confirmed")
            )]
