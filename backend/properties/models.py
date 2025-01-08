from uuid import uuid4


from django.db import models

from location.models import Address
from amenities.models import Amenity
from user.models import User

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
	price_per_night = models.DecimalField(decimal_places=2, max_digits=5,
										  null=False)
	max_guests = models.IntegerField(default=5, null=False)
	bathrooms = models.IntegerField(null=False)
	bedrooms = models.IntegerField(null=False)
	categories = models.CharField(max_length=25, null=False)
	beds = models.IntegerField(null=False)
	pets_allowed = models.BooleanField(default=False)
	parking_space = models.BooleanField(default=False)
	discount = models.DecimalField(decimal_places=2, max_digits=5,
								   null=True, blank=True,
								   help_text="Discount as a percentage (e.g., 20 for 20%).")
	host = models.ForeignKey(User, on_delete=models.CASCADE,
							 related_name='properties')
	cleaning_fee = models.DecimalField(null=True, blank=True, max_digits=5,
									   decimal_places=2)
	updated_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name

	@property
	def discounted_price(self):
		if self.discount:
			return self.price_per_night * (1 - self.discount / 100)
		return self.price_per_night

	# @property.setter
	# def image(self, value):
	# 	self._image = value

	# @image
	# def image(self):
	# 	return

	class Meta:
		verbose_name = "property"
		verbose_name_plural = "properties"
		ordering = ["name"]
