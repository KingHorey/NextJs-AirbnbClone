from django.db import models
from django.core.exceptions import ValidationError


#Create your models here.
class Booking(models.Model):
    property = models.ForeignKey('Property', on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    number_of_guests = models.IntegerField()
    user = models.ForeignKey('User', on_delete=models.CASCADE)

    def clean(self):
        booking_exists = Booking.objects.filter(property=self.property,
                                                start_date__lte=self.end_date,
                                                end_date__gte=self.start_date).exists()
        if booking_exists:
            raise ValidationError("Booking already exists in date range")

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['property', 'start_date', 'end_date'],
                name="booking_check"
            )
        ]
