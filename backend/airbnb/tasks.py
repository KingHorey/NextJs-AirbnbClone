from celery import shared_task


@shared_task(bind=True, max_retries=3)
def send_notification(self, user_email: str, **kwargs) -> None:
    """ send a notification to the user when a review is made
        args:
        user_email - email of the host who has the property
    """
    try:
        content = kwargs.get('content')
        notification_type = kwargs.get('notification_type')
        link = kwargs.get('link')
        # title = str(content)[:15]
        user = User.objects.get(email=user_email) # email belongs to the
        # property host
        Notification.objects.create(title="You have a new review",
                                    content=content, user=user,
                                    notification_type=notification_type,
                                    link=link)
    except User.DoesNotExist as e:
        logger.error(f"User does not exist - {e}")
    except Exception as exc:
        self.retry(exc=exc, countdown=5)