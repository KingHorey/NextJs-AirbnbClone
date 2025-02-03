from rest_framework import serializers

from .models import UserPreferences


class UpdatePreferencesSerializer(serializers.ModelSerializer):
	"""_summary_

	Args:
		serializers (_type_): _description_
	"""
	class Meta:
		model = UserPreferences
		fields = ['booking_type', 'language', 'email_notifications', 'timezone', 'currency', 'promotional_emails']
		read_only_fields = ['user'] # means the user cannot be updated
