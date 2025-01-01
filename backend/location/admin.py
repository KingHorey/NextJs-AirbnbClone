from django.contrib import admin

from .models import Town, Continent, Country, State, Address
# Register your models here.

admin.site.register(Town)
admin.site.register(Country)
admin.site.register(Continent)
admin.site.register(State)
admin.site.register(Address)
