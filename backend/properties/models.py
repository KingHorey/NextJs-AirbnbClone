from uuid import uuid4


from django.db import models

from location.models import Address
from amenities.models import Amenity

# Create your models here.
class Properties(models.Model):
	id = models.UUIDField(default=uuid4, editable=False, primary_key=True)
	name = models.CharField(null=False, blank=True, max_length=255, help_text="Enter the name of the property (e.g., 'Sunset Villa').")
	address = models.OneToOneField(Address, related_name='property',
								   on_delete=models.CASCADE,
								   help_text="Specify the address of the "
											 "property.")
	amenities = models.ManyToManyField(Amenity,
								  blank=True, related_name='properties',
									   help_text="Select the amenities available for this property.")

	def __str__(self):
		return self.name

	class Meta:
		verbose_name = "amenity"
		verbose_name_plural = "amenities"
		ordering = ["name"]
