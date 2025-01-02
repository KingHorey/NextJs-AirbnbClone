from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Booking

from .tasks import send_host_booking_mail, send_user_booking_mail


@receiver(post_save, sender=Booking)
def send_booking_mail(sender, instance, created, **kwargs):
    """ mail to send to a user once a booking has been made """
    if instance and created:
        user = instance.user
        host = instance.property.host
        send_user_booking_mail.apply_async((user.email,
                                                        user.first_name,
                                                        user.last_name),
                                                       kwargs={
                                                           'number_of_guests':
                                                               instance.number_of_guests,
                                                           'start_date':
                                                               instance.start_date,
                                                           'end_date':
                                                               instance.end_date,
                                                           'price_per_night': instance.property.price_per_night,
                                                           'property_name':
                                                               instance.property.name
                                                       })
        send_host_booking_mail.apply_async((host.email, host.first_name),
                               kwargs={
                                   'number_of_guests':
                                       instance.number_of_guests,
                                   'start_date':
                                       instance.start_date,
                                   'end_date':
                                       instance.end_date,
                                   'property_name':
                                       instance.property.name,
                                   'booked_user_first_name': user.first_name,
                                   'booked_user_last_name': user.last_name
                               }
                               )
