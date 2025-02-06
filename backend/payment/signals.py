from django.dispatch import receiver
from django.db.models.signals import post_save
from celery import group
from .models import Payment
from .tasks import send_mail

from notifications.tasks import send_notification

@receiver(post_save, sender=Payment)
def notify_user(sender, instance, **kwargs):
    """
    Notifies the guest and, if applicable, the host based on the Payment status.

    - If payment status is 'success', sends emails to both the guest and the host.
    - If payment status is 'failed', sends an email to the guest.
    - Otherwise, sends an email to the guest with a pending status.

    Args:
        sender (class): The model class that sent the signal.
        instance (Payment): The Payment instance that was saved.
        **kwargs: Additional keyword arguments.
    """

    payment = instance
    amount = payment.amount  # Define amount once for reuse

    # Get guest information
    guest = payment.user
    guest_full_name = guest.get_full_name if guest else ""
    guest_email = guest.email if guest else ""

    # Get host information from the related booking's property
    host = payment.booking.property.host if payment.booking and payment.booking.property else None
    host_full_name = host.get_full_name if host else ""
    host_email = host.email if host else ""

    if payment.status == 'success':
        # For successful payment, send emails to both the guest and the host using Celery's group functionality.
        group(
            send_mail.s(guest_full_name, guest_email, amount, 'guest', 'success'),
            send_mail.s(host_full_name, host_email, amount, 'host', 'success'),
            send_notification.s(guest_email, content=f"Payment for {payment.booking.property.name} successful", link=f"/payment/{instance.id}", notification_type="success", notification_category="payment_success" ,title="Payment Success"),
            send_notification.s(host_email, content=f"Payment for {payment.booking.property.name} received", link=f"/payment/{instance.id}", notification_type="info", notification_category="payment_received" ,title="Payment Received")
        ).apply_async()
    elif payment.status == 'failed':
        # For failed payments, notify the guest via email and create a notification
        group(send_mail.s(guest_full_name, guest_email, amount, 'guest', 'failed'), send_notification.s(guest_email, content=f"Payment for {payment.booking.property.name} failed", link=f"/payment/{instance.id}", notification_type="failed", notification_category="payment_failed" ,title="Payment Failed")).apply_async()

    else:
        # For any other status (e.g., pending), notify the guest
        group(send_mail.s(guest_full_name, guest_email, amount, 'guest', 'pending'), send_notification.s(guest_email, content=f"Payment for {payment.booking.property.name} pending", link=f"/payment/{instance.id}", notification_type="pending", notification_category="payment_pending" ,title="Payment Pending")).apply_async()
