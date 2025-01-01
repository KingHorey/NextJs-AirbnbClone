from typing import Tuple, Optional


""" third-party modules"""
from celery import shared_task
from celery.signals import task_success
import logging

""" user defined modules """
from .location import LocationMapper

location_service = LocationMapper()


logging = logging.getLogger(__name__)

@shared_task(bind=True, max_retries=5)
def get_long_lat_task(self, address: str, **kwargs) -> Tuple[Optional[float],
Optional[float]]:
    """
    Celery task to fetch longitude and latitude for an address.

    Args:
        address: The address to geolocate.

    Returns:
        A tuple containing longitude and latitude.
    """
    try:
        longitude, latitude = location_service.get_long_lat(address)
        return longitude, latitude
    except Exception as exc:
        raise self.retry(exc=exc, countdown=5)


@shared_task(bind=True, max_retries=5)
def get_address_task(self, address: str) -> Optional[str]:
    """
    Celery task to fetch a formatted address for a location.

    Args:
        address: The address to geolocate.

    Returns:
        A formatted address string.
    """
    try:
        longitude, latitude = location_service.get_address(address)
    except Exception as exc:
        raise self.retry(exc=exc, countdown=5)


@task_success.connect(sender=get_long_lat_task)
def on_task_success(sender, result, **kwargs):
    """ function to run when a task has been completed """
    from .models import State, Town, Country, Continent


    task_id = sender.request.id
    model = sender.request.kwargs.get('model', None)

    if not model:
        logging.error(f"No model specified")
        return

    models = {
        "State": State,
        "Country": Country,
        "Continent": Continent,
        "Town": Town
    }

    model_class = models.get(model, None)

    if not model_class:
        logging.error(f"Unrecognized model '{model}' for task_id: {task_id}")
        return

    try:
        obj = model_class.objects.filter(task_id=task_id).first()
        if not obj:
            logging.error(f"No instance with the provided task id")
            return
        obj.longitude, obj.latitude = result
        obj.save()
        logging.info(
            f"Successfully updated {model} instance with task_id: {task_id}")
    except Exception as e:
        logging.error(f"Error updating {model} instance for task_id: "
                      f"{task_id}: {e}")



