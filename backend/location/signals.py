from django.db.models.signals import post_save
from django.dispatch import receiver

from location.models import Continent

from .tasks import get_long_lat_task

@receiver(post_save, sender=Continent)
def call_get_long_lat(sender, instance, created, **kwargs):
    if created and instance.name:
        # send the task to be processed
        task_id = get_long_lat_task.apply_async((instance.name,), kwargs={
            'model': 'Continent', 'object_id': instance.id})
        instance.task_id = task_id
        instance.save()
