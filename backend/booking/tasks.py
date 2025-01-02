from celery import shared_task
from celery.signals import task_success
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string

from notifications.models import Notification

@shared_task(bind=True, max_retries=5)
def send_user_booking_mail(self, user_email, user_first_name, user_last_name,
    *args, **kwargs) -> None:
    """ function to send email to a user who made a booking
        args:
            - user_email - users email
            - user_first_name
            - user_last_name
    """
    number_of_guests = kwargs.get('number_of_guests')
    start_date = kwargs.get('start_date')
    end_date = kwargs.get('end_date')
    price_per_night = kwargs.get('price_per_night')
    sender = settings.DEFAULT_FROM_EMAIL
    subject = "Successful Booking Information"
    recipient = user_email
    property_name = kwargs.get('property_name')

    content = render_to_string('booking_mail_user.html', {
        'first_name': user_first_name,
        'last_name': user_last_name,
        'number_of_guests': number_of_guests,
        'start_date': start_date,
        'end_date': end_date,
        'price_per_night': price_per_night,
        'property_name': property_name
    })
    send_mail(subject, "Successful Booking Information",
              sender,
              auth_password=settings.EMAIL_HOST_PASSWORD,
              html_message=content, recipient_list=[recipient])

@shared_task(bind=True, max_retries=5)
def send_host_booking_mail(self, host_mail, host_name, *args,
                           **kwargs) -> None:
    """ function to send mail to the host who made a booking """
    number_of_guests = kwargs.get('number_of_guests')
    start_date = kwargs.get('start_date')
    end_date = kwargs.get('end_date')
    booked_user_first_name = kwargs.get('booked_user_first_name')
    booked_user_last_name = kwargs.get('booked_user_last_name')
    property_name = kwargs.get('property_name')

    subject = "Successful Booking Information"
    sender = settings.DEFAULT_FROM_EMAIL

    recipient = host_mail
    content = render_to_string('booking_mail_host.html', {
        'number_of_guests': number_of_guests,
        'start_date': start_date,
        'end_date': end_date,
        'booked_user_first_name': booked_user_first_name,
        'booked_user_last_name': booked_user_last_name,
        'property_name': property_name
    })
    send_mail(subject, 'Home Booked', sender,
              auth_password=settings.EMAIL_HOST_PASSWORD,
              html_message=content, recipient_list=[host_mail])


# send notification to user
@task_success.connect
def send_notification(sender, request, **kwargs):
    pass
