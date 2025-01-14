from django.contrib import admin

from .models import Town, Continent, Country, State, Address
# Register your models here.


class CountryAdmin(admin.StackedInline):
    model = Country

class ContinentAdmin(admin.ModelAdmin):
    inlines = [CountryAdmin]

class CountryModAdmin(admin.ModelAdmin):
    list_display = ['name', 'dialing_code', 'continent']

admin.site.register(Continent, ContinentAdmin)
admin.site.register(Address)
admin.site.register(Country, CountryModAdmin)
admin.site.register(Town)
admin.site.register(State)