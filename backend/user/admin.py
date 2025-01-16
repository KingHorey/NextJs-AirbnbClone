from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ["get_full_name", "email", "gender"]
    fieldsets = [(
        'basic_information', {"fields": ["first_name", "last_name", "email",
                                         "gender", "_image", "password"]}
    ), ("user_status", {
        "fields": ["is_active", "is_staff", "is_superuser", "is_admin"]
    })]

admin.site.register(User, UserAdmin)
