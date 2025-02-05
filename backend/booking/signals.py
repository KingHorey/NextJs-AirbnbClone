from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Booking

from .tasks import send_host_booking_mail, send_user_booking_mail
from notifications.tasks import send_notification

from celery import group

@receiver(post_save, sender=Booking)
def send_booking_mail(sender, instance, created, **kwargs):
    """ mail to send to a user once a booking has been made """
    if instance and created:
        user = instance.guest
        host = instance.property.host
        group(send_user_booking_mail.s(user.email,
                                                        user.first_name,
                                                        user.last_name,
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
                                                       }),
        send_host_booking_mail.s(host.email, host.first_name,
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
                               }), send_notification.s(user_email=instance.property.host.email, link=f"/my-bookings/{instance.id}", notification_type="info", notification_category="booking_received", content=f"You have a booking for {instance.property}")).apply_async()

