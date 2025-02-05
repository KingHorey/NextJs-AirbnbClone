from django.contrib import admin

from .models import Payment

# Register your models here.


class PaymentAdmin(admin.ModelAdmin):
    list_display = ['user', 'payment_reference', 'created_at']

    def user(self):
        return self.user.email


admin.site.register(Payment, PaymentAdmin)
