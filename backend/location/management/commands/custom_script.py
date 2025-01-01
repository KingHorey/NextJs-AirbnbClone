from django.core.management.base import BaseCommand
# import httpx

from location.models import Continent


continents = ["North America", "South America", "Africa", "Europe", "Asia",
              "Oceania", "Antarctica"]
class Command(BaseCommand):

    def handle(self, *args, **options):
        """ custom command to execute script """
        for continent in continents:
            print(continent)
            continent_instance, created = Continent.objects.get_or_create(
                    name=continent)
            if created:
                print(f"{continent} already exists")
            else:
                print("successfully added continent")