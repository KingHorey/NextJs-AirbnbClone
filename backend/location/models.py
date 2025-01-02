from uuid import uuid4
from typing import List

from django.db import models
from django.utils.text import slugify

""" user defined modules/packages"""
from .location import LocationMapper
from .tasks import get_long_lat_task

class BaseClass(models.Model):
	""" absract class that other models in module will inherit from """
	id = models.UUIDField(default=uuid4, primary_key=True, null=False,
						  editable=False, unique=True)
	name = models.CharField(max_length=100, unique=True, blank=False, null=False)
	slug = models.SlugField(unique=True, blank=True, null=True)
	latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
	longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
	task_id = models.CharField(max_length=255, blank=True, null=True)
	address = models.CharField(max_length=518, blank=True, null=True)

	class Meta:
		abstract = True


# Create your models here.
class Country(BaseClass):
	""" django model class representing a country table in DB """
	continent = models.ForeignKey('Continent', related_name='countries', on_delete=models.CASCADE)
	dialing_code = models.CharField(max_length=7, unique=True, null=False)

	def __str__(self) -> str:
		"""
			string representation for class
			- returns: country name
		"""
		return self.name

	class Meta:
		""" metadata class for model

			data members:
				- verbose_name
				- verbose_name_plural
		"""
		verbose_name = "country"
		verbose_name_plural = "countries"
		ordering = ["name"]

	def save(self, *args, **kwargs) -> None:
		if not self.id:
			super().save(*args, **kwargs)
		location = LocationMapper()
		task_id = location.get_long_lat.apply_async((self.name), kwargs={
			"model": "Country", "object_id": self.id})
		self.task_id = task_id
		self.slug = slugify(self.name) if not self.slug else self.slug
		super().save(*args, **kwargs)



class Continent(BaseClass):
	'''
		Class model for a continent in the DB
	'''

	def all_countries(self) -> List['Country']:
		""" returns all the countries in a continent """
		return self.countries.all()

	def __str__(self) -> str:
		""" string representation of continent model """
		return self.name

	class Meta:
		""" metadata for continent model """
		verbose_name = "continent"
		verbose_name_plural = "continents"
		ordering = ["name"]

	def save(self, *args, **kwargs) -> None:
		if not self.slug:
			name_in_lower_case = str(self.name).lower().replace(" ", "-")
			self.slug = slugify(name_in_lower_case)
		super().save(*args, **kwargs)



class State(BaseClass):
	"""
		state model for representing a table in the DB

		data members:
			- id
			- name

		relationships:
			country - One to many relationship with Country

		member_functions:
			__str__
	"""
	country = models.ForeignKey(Country, related_name='states', on_delete=models.CASCADE, null=True)

	def __str__(self) -> str:
		""" string representation of state model """
		return f"{self.name} in {self.country.name}" if self.country.name else self.name

	class Meta:
		ordering = ["name"]
		verbose_name = "state"
		verbose_name_plural = "states"
		unique_together = ('name', 'country')

	def save(self, *args, **kwargs) -> None:
		if not self.id:
			super().save(*args, **kwargs)
		location = LocationMapper()
		country_name = f"{self.name}, {self.country.name}"
		task_id = location.get_long_lat.apply_async((country_name), kwargs={
			"model": "State", "object_id": self.id})
		self.task_id = task_id
		self.slug = slugify(self.name) if not self.slug else self.slug
		super().save(*args, **kwargs)



class Town(BaseClass):
	"""
			Town class for representing a table in the DB

			relationships:
				state - one to many relationship with state since every Towm must be under a state

	"""
	state = models.ForeignKey(State, related_name='towns', on_delete=models.CASCADE)

	class Meta:
		""" metadata class for town model """
		verbose_name = "town"
		verbose_name_plural = "towns"
		unique_together = ('name', 'state')

	def save(self, *args, **kwargs) -> None:
		if not self.id:
			super().save(*args, **kwargs)
		location = LocationMapper()
		town_name = f"{self.name}, {self.state.name}"
		task_id = location.get_long_lat.apply_async((town_name), kwargs={
			"model": "Town", "object_id": self.id})
		self.task_id = task_id
		self.slug = slugify(self.name) if not self.slug else self.slug
		super().save(*args, **kwargs)



class Address(models.Model):
	street = models.CharField(max_length=255, blank=True)
	town = models.ForeignKey(Town, on_delete=models.CASCADE, related_name='addresses')
	postal_code = models.CharField(max_length=20, blank=True)
	latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
	longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

	def __str__(self):
		return f"{self.street}, {self.town.name}" if self.street else self.town.name
