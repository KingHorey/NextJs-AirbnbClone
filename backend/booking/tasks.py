from celery import shared_task
from celery.signals import task_success

from services.mail_send import mail_service

import logging

from notifications.models import Notification

logger = logging.getLogger(__name__)

@shared_task(bind=True, max_retries=5)
def send_user_booking_mail(self, user_email, user_first_name, user_last_name,
    *args, **kwargs) -> None:
    """ function to send email to a user who made a booking
        args:
            - user_email - users email
            - user_first_name
            - user_last_name
    """

    kwargs = kwargs.get('kwargs') if kwargs.get('kwargs') else kwargs
    number_of_guests = kwargs.get('number_of_guests')
    booking_status = kwargs.get('status')
    start_date = kwargs.get('start_date')
    end_date = kwargs.get('end_date')
    price_per_night = kwargs.get('price_per_night')
    subject = "Successful Booking Information"
    recipient = user_email
    property_name = kwargs.get('property_name')
    template_name = 'booking_mail_user.html'

    content = {
        'first_name': user_first_name,
        'last_name': user_last_name,
        'number_of_guests': number_of_guests,
        'start_date': start_date,
        'end_date': end_date,
        'price_per_night': price_per_night,
        'property_name': property_name,
        'status': booking_status
    }
    mail_service.mail_send(subject, content, recipient, template_name)

@shared_task(bind=True, max_retries=5)
def send_host_booking_mail(self, host_mail, host_name, *args,
                           **kwargs) -> None:
    """ function to send mail to the host who made a booking """

    kwargs = kwargs.get('kwargs') if kwargs.get('kwargs') else kwargs
    number_of_guests = kwargs.get('number_of_guests')
    start_date = kwargs.get('start_date')
    end_date = kwargs.get('end_date')
    booked_user_first_name = kwargs.get('booked_user_first_name')
    booked_user_last_name = kwargs.get('booked_user_last_name')
    property_name = kwargs.get('property_name')
    template_name = 'booking_mail_host.html'

    subject = "Successful Booking Information"
    recipient = host_mail
    content = {
        'number_of_guests': number_of_guests,
        'start_date': start_date,
        'end_date': end_date,
        'guest_first_name': booked_user_first_name,
        'guest_last_name': booked_user_last_name,
        'property_name': property_name,
        'first_name': host_name
    }

    logger.info(f"Content {content}")
    mail_service.mail_send(subject, content, recipient, template_name)

# send notification to user
