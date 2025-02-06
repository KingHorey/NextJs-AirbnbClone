from celery import shared_task
from services.mail_send import mail_service

@shared_task(bind=True)
def send_mail(self, full_name, email, amount, user_type, payment_status):
    """
                function to send mail to user
                args:
                        - full_name - users full name
                        - email - users email
                        - amount - amount paid
                        - user_type - Host or guest
    """

    payment_success = 'payment_success.html'
    payment_failed = 'payment_failed.html'
    payment_pending =  'payment_pending.html'
    content = {
        'full_name': full_name,
        'amount': amount,
        'role': user_type
    }
    match payment_status:
        case 'success':
            if user_type == 'guest':
                mail_service.mail_send('Payment Successfully Made', content, email, payment_success)
            else:
                mail_service.mail_send('Payment Successfully Received', content, email, payment_success)
        case 'failed':
            mail_service.mail_send('Payment Failed', content, email, payment_failed)
        case 'pending':
            mail_service.mail_send('Payment Pending', content, email, payment_pending)


# @shared_task(bind=True)
# def send_notification
