from django.contrib import admin
from .models import Booking
# Register your models here.

class BookingAdmin(admin.ModelAdmin):
    list_display = ["property", "full_name", "email", "start_date",
                    "end_date", "status"]

    def full_name(self, obj):
        return obj.guest.get_full_name

    def email(self, obj):
        return obj.guest.email

admin.site.register(Booking, BookingAdmin)
